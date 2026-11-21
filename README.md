# Portfolio — Maxime ARNAU

Site statique (HTML / CSS / JavaScript, sans outil de compilation) hébergé sur **GitHub Pages**.

## Organisation des fichiers

| Dossier / fichier        | Contenu                                                        |
|--------------------------|----------------------------------------------------------------|
| `index.html`             | Structure de la page (menu latéral, barre du haut)             |
| `css/style.css`          | Tout le style : couleurs clair/sombre, arrondis, mise en page   |
| `js/app.js`              | Navigation, filtres, langue, thème                             |
| `js/i18n.js`             | Textes de l'interface en français et en anglais                |
| `data/site.js`           | **Votre profil et votre CV** (textes FR/EN)                    |
| `data/projects.js`       | **Vos projets**                                                |
| `assets/img/`            | Photo, favicon                                                 |
| `assets/cv/`             | CV en PDF (téléchargeable depuis la page CV)                   |
| `assets/projects/<slug>/`| Images, GIF et vidéos de chaque projet                         |

## Ajouter un projet

1. Créez un dossier `assets/projects/mon-projet/` et mettez-y :
   - `thumb.jpg` : la vignette de la mosaïque (format 16:9, environ 800×450) ;
   - `banner.jpg` : l'image de fond de la bannière (large, environ 1920×800) ;
   - vos captures, GIF ou vidéos `.mp4`.
2. Dans `data/projects.js`, copiez un bloc `{ ... },` et adaptez-le :

```js
{
  slug: 'mon-projet',                      // identifiant dans l'adresse
  title: { fr: 'Mon projet', en: 'My project' },
  year: 'y3',                              // y1 y2 y3 y4 internship personal jam
  engine: 'Unreal Engine',                 // un nouveau moteur crée un nouveau filtre
  teamSize: 4,                             // 1 = Solo, 2-4, 5 et +
  thumbnail: 'assets/projects/mon-projet/thumb.jpg',
  banner: 'assets/projects/mon-projet/banner.jpg',
  pitch: { fr: 'Paragraphe 1.\n\nParagraphe 2.', en: '...' },
  role: { fr: ['Contribution 1', 'Contribution 2'], en: ['...', '...'] },
  media: [
    { src: 'assets/projects/mon-projet/gameplay.gif', alt: { fr: 'Gameplay', en: 'Gameplay' } },
    { youtube: 'ID_DE_LA_VIDEO' }
  ],
  links: [
    { type: 'play', label: { fr: 'Jouer sur itch.io', en: 'Play on itch.io' }, url: 'https://...' }
  ]
},
```

3. Le projet le plus haut dans la liste s'affiche en premier.
4. Supprimez les trois projets `example: true` quand vos vrais projets sont en place,
   ainsi que le dossier `assets/projects/exemples/`.

> Astuce : pour les animations, une vidéo `.mp4` courte est bien plus légère qu'un GIF.

## Prévisualiser en local

Le site doit être servi par un petit serveur (ouvrir `index.html` directement
ne charge pas tout correctement dans certains navigateurs). Avec PowerShell :

```powershell
powershell -ExecutionPolicy Bypass -File .claude/serve.ps1
```

Puis ouvrez <http://localhost:8080>.

## Publier une modification

```powershell
git add -A
git commit -m "Ajout du projet X"
git push
```

Le site en ligne se met à jour en une minute environ.
