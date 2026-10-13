// ---------- Chargement du contenu éditable (content/site.json) ----------
// Ce fichier lit content/site.json et remplit les zones de texte/images du
// site. C'est ce fichier que l'espace d'administration (/admin) modifie
// indirectement : le client édite via l'interface, qui enregistre dans
// content/site.json, et ce script affiche le résultat.

(function () {
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $all = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const esc = (str) =>
    String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  // Les champs texte du contenu peuvent contenir des balises simples
  // autorisées par le CMS (gras, saut de ligne &nbsp;, <br>) : on ne les
  // échappe pas, elles sont saisies via les champs "Markdown/HTML" du CMS.
  const setHtml = (el, val) => { if (el && val != null) el.innerHTML = val; };
  const setText = (el, val) => { if (el && val != null) el.textContent = val; };
  const setSrc = (el, val) => { if (el && val) el.setAttribute('src', val); };
  const setHref = (el, val) => { if (el && val) el.setAttribute('href', val); };

  function paragraphsHtml(list, cls) {
    return (list || [])
      .map((p) => `<p class="panel-text wide${cls ? ' ' + cls : ''}">${p}</p>`)
      .join('\n');
  }

  function renderActivityCard(card, fullWidthClass) {
    const idAttr = card.id ? ` id="${card.id}"` : '';
    const cls = 'activity' + (card.pleineLargeur ? ' activity-full' : '');
    let inner = `<span class="activity-icon">✦</span>\n<h3>${esc(card.titre)}</h3>`;
    if (card.frequence) inner += `\n<p class="activity-meta">${esc(card.frequence)}</p>`;
    if (card.accroche) inner += `\n<p class="activity-lead">${card.accroche}</p>`;
    if (card.texte) {
      card.texte.split('\n\n').forEach((para) => {
        if (para.trim()) inner += `\n<p>${para}</p>`;
      });
    }
    if (card.liste && card.liste.length) {
      inner += `\n<ul class="activity-list">${card.liste.map((li) => `<li>${li}</li>`).join('')}</ul>`;
    }
    if (card.texteApres) inner += `\n<p>${card.texteApres}</p>`;
    return `<article class="${cls}"${idAttr}>${inner}</article>`;
  }

  async function loadContent() {
    let data;
    try {
      const res = await fetch('content/site.json', { cache: 'no-store' });
      data = await res.json();
    } catch (err) {
      console.warn('Impossible de charger content/site.json, le contenu par défaut reste affiché.', err);
      return;
    }

    try {
      // ----- Header / footer logos -----
      if (data.header) setSrc($('#headerLogo'), data.header.logo);
      if (data.footer) {
        setSrc($('#footerLogo'), data.footer.logo);
        setText($('#footerCopy'), data.footer.copyright);
      }

      // ----- Hero -----
      if (data.hero) {
        setHtml($('#heroTitre'), data.hero.titre);
        setHtml($('#heroTexte'), data.hero.texte);
        const btn = $('#heroBouton');
        if (btn) { setHtml(btn, data.hero.boutonTexte); setHref(btn, data.hero.boutonLien); }
        setSrc($('#heroVideo'), null); // noop placeholder
        const heroVideo = $('#heroVideo');
        if (heroVideo) {
          heroVideo.setAttribute('poster', data.hero.videoPoster || '');
          const srcWebm = $('source[data-type="webm"]', heroVideo);
          const srcMp4 = $('source[data-type="mp4"]', heroVideo);
          if (srcWebm) srcWebm.setAttribute('src', data.hero.videoWebm || '');
          if (srcMp4) srcMp4.setAttribute('src', data.hero.videoMp4 || '');
          heroVideo.load();
        }
      }

      // ----- Nouveau ? -----
      if (data.nouveau) {
        setHtml($('#nouveauTitre'), data.nouveau.titre);
        setText($('#nouveauEyebrow'), data.nouveau.eyebrow);
        setSrc($('#introVideoPoster'), data.nouveau.videoPoster);
        const introVideo = $('#introVideo');
        if (introVideo) {
          introVideo.setAttribute('poster', data.nouveau.videoPoster || '');
          const src = $('source', introVideo);
          if (src) src.setAttribute('src', data.nouveau.videoMp4 || '');
          introVideo.load();
        }
        const inner = $('#nouveauTexte');
        if (inner) {
          let html = '';
          html += paragraphsHtml(data.nouveau.paragraphes);
          if (data.nouveau.citation1) html += `\n<blockquote class="pull-quote">${data.nouveau.citation1}</blockquote>`;
          html += paragraphsHtml(data.nouveau.paragraphes2);
          if (data.nouveau.citation2) html += `\n<blockquote class="pull-quote">${data.nouveau.citation2}</blockquote>`;
          if (data.nouveau.paragrapheFinal) html += `\n<p class="panel-text wide">${data.nouveau.paragrapheFinal}</p>`;
          inner.innerHTML = html;
        }
        const btn = $('#nouveauBouton');
        if (btn) { setHtml(btn, data.nouveau.boutonTexte); setHref(btn, data.nouveau.boutonLien); }
      }

      // ----- Mission / Valeurs / Vie d'église (cartes génériques) -----
      function renderSection(key, titreSel, photoSel, gridSel) {
        const section = data[key];
        if (!section) return;
        setHtml($(titreSel), section.titre);
        setSrc($(photoSel), section.photo);
        const grid = $(gridSel);
        if (grid && section.cartes) {
          grid.innerHTML = section.cartes.map((c) => renderActivityCard(c)).join('\n');
        }
      }
      renderSection('mission', '#missionTitre', '#missionPhoto', '#missionGrid');
      renderSection('valeurs', '#valeursTitre', '#valeursPhoto', '#valeursGrid');
      renderSection('vieEglise', '#vieEgliseTitre', '#vieEglisePhoto', '#vieEgliseGrid');

      // ----- Histoire -----
      if (data.histoire) {
        setSrc($('#histoirePhoto'), data.histoire.photo);
        setText($('#histoireEyebrow'), data.histoire.eyebrow);
        setHtml($('#histoireTitre'), data.histoire.titre);
        const texteEl = $('#histoireTexte');
        if (texteEl) texteEl.innerHTML = paragraphsHtml(data.histoire.paragraphes);
        if (data.histoire.visionCitation) setHtml($('#histoireVisionCitation'), data.histoire.visionCitation);
        setText($('#histoireVisionLabel'), data.histoire.visionLabel);
      }

      // ----- Médias -----
      if (data.medias) {
        setText($('#mediasEyebrow'), data.medias.eyebrow);
        setHtml($('#mediasTitre'), data.medias.titre);
        setText($('#mediasTexte'), data.medias.texte);
        $all('.medias-lien').forEach((a) => setHref(a, data.medias.lienUrl));
        setHtml($('#mediasLienTexte'), data.medias.lienTexte);
        setSrc($('#mediasVignette'), data.medias.vignette);
      }

      // ----- Soutenir -----
      if (data.soutenir) {
        setText($('#soutenirEyebrow'), data.soutenir.eyebrow);
        setHtml($('#soutenirTitre'), data.soutenir.titre);
        const grid = $('#soutenirGrid');
        if (grid && data.soutenir.cartes) {
          grid.innerHTML = data.soutenir.cartes
            .map(
              (c) => `<article class="support-card">
                <h3>${esc(c.titre)}</h3>
                <p>${c.texte}</p>
                ${c.note ? `<span class="support-note">${esc(c.note)}</span>` : ''}
              </article>`
            )
            .join('\n');
        }
      }

      // ----- Bandeau photos -----
      if (data.bandeauPhotos && data.bandeauPhotos.length) {
        const strip = $('#photoStrip');
        if (strip) {
          strip.innerHTML = data.bandeauPhotos
            .map((src) => `<div class="photo-strip-item"><img src="${src}" alt="" loading="lazy"></div>`)
            .join('\n');
        }
      }

      // ----- Contact / Infos pratiques -----
      if (data.contact) {
        setHtml($('#contactTitre'), data.contact.titre);
        setText($('#contactEyebrow'), data.contact.eyebrow);
        setHtml($('#adresse'), data.contact.adresseTexte);
        setText($('#contactHoraire'), data.contact.horaire);
        setHref($('#contactAgendaLien'), data.contact.agendaLien);
        const map = $('.map-embed');
        if (map) map.setAttribute('src', data.contact.mapEmbedUrl || '');
        setText($('#mapCardName'), data.contact.mapNom);
        setHtml($('#mapCardAdresse'), data.contact.mapAdresse);
      }
    } catch (err) {
      console.error('Erreur lors de l\'affichage du contenu éditable :', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }
})();
