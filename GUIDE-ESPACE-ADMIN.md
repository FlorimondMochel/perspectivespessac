# Guide : activer et utiliser l'espace d'administration du client

Ce guide suppose que tu as déjà fait les étapes 1 à 4 du premier guide (GitHub créé, dépôt créé, Netlify connecté et le site en ligne sur une adresse `....netlify.app`). Si ce n'est pas encore fait, commence par là.

## 1. Importer les fichiers dans GitHub

Deux zips t'ont été envoyés :
- **perspectives-pessac-site.zip** — tout le code du site (pages, styles, l'espace `/admin`, les photos, le logo).
- **perspectives-pessac-videos.zip** — les 3 vidéos (trop volumineuses pour tenir dans le même fichier).

Sur la page de ton dépôt GitHub (`perspectives-pessac`) :
1. Dézippe les deux fichiers sur ton ordinateur, dans un seul et même dossier (les vidéos doivent atterrir dans le sous-dossier `images/`, à côté des photos).
2. Sur GitHub, clique "Add file" → "Upload files", puis glisse-dépose tout le contenu du dossier (en conservant la structure : `index.html`, `css/`, `js/`, `images/`, `admin/`, `content/`, `netlify.toml`...).
3. Valide ("Commit changes"). Netlify republie automatiquement le site en 10-30 secondes.

## 2. Activer Identity + Git Gateway (ce qui permet au client de se connecter)

Dans le tableau de bord Netlify, sur ton site :

1. Va dans **"Site configuration"** → **"Identity"** → clique **"Enable Identity"**.
2. Dans la section **"Registration"**, choisis **"Invite only"** (important : sinon n'importe qui pourrait créer un compte sur l'espace admin).
3. Toujours dans Identity, va dans **"Services"** → **"Git Gateway"** → clique **"Enable Git Gateway"**. C'est ce qui permet à l'espace `/admin` d'enregistrer les modifications dans GitHub sans que le client ait besoin d'un compte GitHub.

## 3. Inviter ton client

1. Toujours dans "Identity", onglet **"Users"**, clique **"Invite users"**.
2. Saisis l'adresse e-mail de ton client.
3. Il reçoit un e-mail "You've been invited" avec un lien. En cliquant dessus, il arrive sur le site et une fenêtre lui demande de choisir un mot de passe.
4. Une fois son mot de passe choisi, il est automatiquement redirigé vers `/admin` — l'espace d'administration.

## 4. Ce que ton client peut faire dans `/admin`

Il verra une interface avec une liste de rubriques (Accueil, Nouveau ?, Mission, Valeurs, Vie d'Église, Histoire, Médias, Nous soutenir, Bandeau de photos, Infos pratiques, Pied de page). Pour chacune, il peut modifier :

- Tous les textes (titres, paragraphes, citations).
- Toutes les photos (clic sur l'image actuelle → "Choisir une image" → envoyer une nouvelle photo depuis son ordinateur).
- Les vidéos (même principe, via "Choisir un fichier").
- Les liens (agenda, YouTube, etc.).
- Ajouter/retirer des cartes dans les listes (ex. ajouter une nouvelle "activité" dans Vie d'Église).

Quand il clique sur **"Publier"** (ou "Enregistrer" selon la carte), la modification part directement sur GitHub, et Netlify republie le site automatiquement — le changement est visible en ligne en moins d'une minute.

## 5. Accéder à l'espace admin au quotidien

L'adresse est simplement `[adresse-du-site]/admin` — par exemple `https://egliseperspectivespessac.com/admin` une fois le domaine branché, ou `https://perspectives-pessac.netlify.app/admin` en attendant.

## 6. Et toi ?

Tu gardes toujours la main sur tout : tu peux soit passer par ce même espace `/admin` (avec ton propre compte, que tu peux t'inviter toi-même de la même façon), soit continuer à me demander des modifications plus poussées (mise en page, nouvelles sections, etc.) comme on l'a fait jusqu'ici — dans ce cas je modifierai le code directement et je te donnerai les fichiers à déposer sur GitHub.

## Remarques

- Les 3 vidéos originales (celles que tu m'as envoyées) ont été utilisées telles quelles : `hero-video.mp4` / `hero-video.webm` pour la bannière d'accueil, `nouveau-video.mp4` pour la rubrique "Nouveau ?".
- Quelques photos envoyées n'ont pas encore de place précise sur le site (un portrait en situation, une photo de rue, une vue aérienne de parc, une photo de salon) — elles sont dans `images/spares/` et ton client peut parfaitement les utiliser pour remplacer une des photos actuelles via l'espace admin, si elles conviennent mieux.
- Le logo du réseau "Perspectives" (national) a aussi été inclus dans `images/spares/` au cas où vous voudriez l'ajouter quelque part (il n'est utilisé nulle part sur le site actuellement).
