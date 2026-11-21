/* =========================================================
   VOS PROJETS
   - L'ordre de la liste = l'ordre d'affichage (le plus récent en premier).
   - Les filtres se construisent tout seuls à partir de ces données :
     un nouveau moteur apparaîtra automatiquement dans le filtre "Moteur".

   Champs d'un projet :
     slug       identifiant unique, utilisé dans l'adresse (minuscules, tirets)
     title      titre { fr, en }
     year       'y1' | 'y2' | 'y3' | 'y4' | 'internship' | 'personal' | 'jam'
     engine     nom du moteur, ex. 'Unreal Engine', 'Unity', 'Godot'
     teamSize   nombre de personnes (1 = solo). Filtre : Solo / 2 à 4 / 5 et +
     thumbnail  image de la mosaïque (format 16:9 conseillé, GIF accepté)
     banner     image de fond de la bannière (large, ex. 1920×800)
     pitch      { fr, en } — séparez les paragraphes par une ligne vide (\n\n)
     role       { fr: [...], en: [...] } — une ligne par contribution
     media      liste d'images / GIF / vidéos .mp4, ou { youtube: 'ID' }
     links      liens vers la build : type 'play' | 'download' | 'video' | 'source'
     example    true = projet d'exemple (badge jaune) — à supprimer
     hidden     true = projet masqué sans le supprimer
   ========================================================= */
window.PROJECTS = [
  {
    slug: 'exemple-enigme',
    example: true,
    title: { fr: 'Projet exemple — Énigme', en: 'Sample project — Puzzle' },
    year: 'y3',
    engine: 'Unreal Engine',
    teamSize: 4,
    thumbnail: 'assets/projects/exemples/exemple-1.svg',
    banner: 'assets/projects/exemples/exemple-1.svg',
    pitch: {
      fr: 'Ceci est un projet d’exemple qui montre la mise en page. Il sera remplacé par vos vrais projets.\n\nUn pitch tient en deux ou trois phrases : le genre, la promesse de jeu et ce qui rend le projet unique.',
      en: 'This is a sample project showing the layout. It will be replaced by your real projects.\n\nA pitch fits in two or three sentences: the genre, the gameplay promise and what makes the project unique.'
    },
    role: {
      fr: ['Programmation du système d’interaction', 'Création de trois énigmes en Blueprint', 'Débogage et équilibrage'],
      en: ['Programmed the interaction system', 'Built three puzzles in Blueprint', 'Debugging and balancing']
    },
    media: [
      { src: 'assets/projects/exemples/exemple-2.svg', alt: { fr: 'Capture d’écran d’exemple', en: 'Sample screenshot' } },
      { src: 'assets/projects/exemples/exemple-3.svg', alt: { fr: 'Capture d’écran d’exemple', en: 'Sample screenshot' } }
    ],
    links: [
      { type: 'play', label: { fr: 'Jouer sur itch.io', en: 'Play on itch.io' }, url: 'https://itch.io/' }
    ]
  },
  {
    slug: 'exemple-game-jam',
    example: true,
    title: { fr: 'Projet exemple — Game Jam', en: 'Sample project — Game Jam' },
    year: 'jam',
    engine: 'Unity',
    teamSize: 1,
    thumbnail: 'assets/projects/exemples/exemple-2.svg',
    banner: 'assets/projects/exemples/exemple-2.svg',
    pitch: {
      fr: 'Projet d’exemple réalisé seul en 48 heures, pour montrer le tag « Solo » et le moteur Unity.',
      en: 'Sample project made solo in 48 hours, to show the “Solo” tag and the Unity engine.'
    },
    role: {
      fr: ['Game design et programmation en C#', 'Intégration des assets'],
      en: ['Game design and C# programming', 'Asset integration']
    },
    media: [
      { src: 'assets/projects/exemples/exemple-1.svg', alt: { fr: 'Capture d’écran d’exemple', en: 'Sample screenshot' } }
    ],
    links: [
      { type: 'download', label: { fr: 'Télécharger la build', en: 'Download the build' }, url: 'https://itch.io/' }
    ]
  },
  {
    slug: 'exemple-projet-equipe',
    example: true,
    title: { fr: 'Projet exemple — Équipe', en: 'Sample project — Team' },
    year: 'y2',
    engine: 'Unreal Engine',
    teamSize: 7,
    thumbnail: 'assets/projects/exemples/exemple-3.svg',
    banner: 'assets/projects/exemples/exemple-3.svg',
    pitch: {
      fr: 'Projet d’exemple en grande équipe, pour montrer le tag « 5 personnes et + ».',
      en: 'Sample project with a large team, to show the “5+ people” tag.'
    },
    role: {
      fr: ['Programmation des contrôles du joueur', 'Système de checkpoints'],
      en: ['Player controls programming', 'Checkpoint system']
    },
    media: [],
    links: []
  }
];
