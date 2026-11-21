/* =========================================================
   VOTRE PROFIL ET VOTRE CV
   Chaque texte existe en français (fr) et en anglais (en).
   Vous pouvez modifier librement les textes entre guillemets.
   ========================================================= */
window.SITE = {
  profile: {
    name: 'Maxime ARNAU',
    title: 'Gameplay Programmer',
    photo: 'assets/img/photo.jpg',
    email: 'maxime.arnau@outlook.fr',
    linkedin: '', // ← collez ici l'adresse complète de votre profil LinkedIn

    status: {
      fr: 'À la recherche d’un stage ou d’un poste',
      en: 'Looking for an internship or a full-time role'
    },
    tagline: {
      fr: 'Je conçois et débogue les mécaniques qui rendent un jeu agréable à prendre en main.',
      en: 'I build and debug the mechanics that make a game feel great in the player’s hands.'
    },
    intro: {
      fr: 'Étudiant en 4e année de développement de jeu vidéo au Studio Mercier (Béziers), je suis spécialisé dans la programmation gameplay sur Unreal Engine, en C++ et en Blueprint. Passionné par les jeux d’aventure et d’énigme, je recherche un stage ou un poste sur la durée.',
      en: 'Fourth-year game development student at Studio Mercier (Béziers, France), I specialise in gameplay programming with Unreal Engine, in C++ and Blueprint. I love adventure and puzzle games, and I am looking for an internship or a long-term position.'
    },
    highlights: ['Unreal Engine', 'C++', 'Blueprint', 'Unity', 'VR']
  },

  cv: {
    pdf: 'assets/cv/CV-Maxime-ARNAU.pdf',

    summary: {
      fr: 'Gameplay programmer spécialisé dans le débogage et les mécaniques liées au joueur sur Unreal Engine, passionné par les jeux d’aventure et d’énigme. Je recherche un stage ou un emploi de longue durée.',
      en: 'Gameplay programmer specialised in debugging and player-centred mechanics in Unreal Engine, passionate about adventure and puzzle games. Looking for an internship or a long-term position.'
    },

    // level : 1 = Débutant, 2 = Intermédiaire, 3 = Avancé, 4 = Expert
    skills: [
      {
        name: { fr: 'Moteurs', en: 'Engines' },
        items: [
          { name: 'Unreal Engine', level: 4 },
          { name: 'Unity', level: 2 }
        ]
      },
      {
        name: { fr: 'Langages jeu vidéo', en: 'Game programming' },
        items: [
          { name: 'Blueprint', level: 4 },
          { name: 'C++', level: 3 },
          { name: 'C#', level: 2 },
          { name: 'Python', level: 2 },
          { name: 'JavaScript', level: 1 }
        ]
      },
      {
        name: { fr: 'Logiciels', en: 'Software' },
        items: [
          { name: 'Maya', level: 1 },
          { name: 'Photoshop', level: 1 },
          { name: 'Illustrator', level: 1 }
        ]
      },
      {
        name: { fr: 'Autres langages', en: 'Other languages' },
        items: [
          { name: 'HTML', level: 1 },
          { name: 'CSS', level: 1 }
        ]
      }
    ],

    softSkills: {
      fr: ['Communication', 'Débogage', 'Résolution de problèmes'],
      en: ['Communication', 'Debugging', 'Problem solving']
    },

    experience: [
      {
        period: { fr: 'Mars – Avril 2026', en: 'March – April 2026' },
        role: { fr: 'Développeur Gameplay — Stagiaire', en: 'Gameplay Developer — Intern' },
        org: 'Build the Light Studio · Project Louisiana – The BOUNDS VR',
        bullets: {
          fr: [
            'Création et débogage d’énigmes en VR',
            'Création d’ennemis et de boss',
            'Création de tutoriels',
            'Création de systèmes liés à la sauvegarde'
          ],
          en: [
            'Designed and debugged VR puzzles',
            'Implemented enemies and bosses',
            'Built in-game tutorials',
            'Developed save-related systems'
          ]
        }
      },
      {
        period: { fr: 'Étés 2025 et 2026', en: 'Summers 2025 & 2026' },
        role: { fr: 'Manutentionnaire — Intérimaire', en: 'Warehouse operative — Temp' },
        org: 'Oppidum Conditionnement / BVF Colombiers Episens',
        bullets: {
          fr: [
            'Reconditionnement de palettes',
            'Pose de collerettes et d’intercalaires sur bouteilles',
            'Mise en carton de pain cru ou précuit, mise en bac de pâte à pain',
            'Découpage de pâte à pain'
          ],
          en: [
            'Pallet repackaging',
            'Fitting bottle collars and separators',
            'Boxing raw and par-baked bread, filling dough trays',
            'Cutting bread dough'
          ]
        }
      },
      {
        period: { fr: 'Étés 2023 et 2024', en: 'Summers 2023 & 2024' },
        role: { fr: 'Manutentionnaire — Service de voirie', en: 'Municipal works operative' },
        org: 'Mairies de Nissan-lez-Enserune et de Lespignan',
        bullets: {
          fr: [
            'Coulage de béton',
            'Montage de scènes',
            'Installation de panneaux d’entrée de ville et de signalisation piétonne'
          ],
          en: [
            'Concrete pouring',
            'Stage assembly',
            'Installing town-entrance and pedestrian signs'
          ]
        }
      }
    ],

    education: [
      {
        period: { fr: '2023 – 2027', en: '2023 – 2027' },
        role: { fr: 'Développement de jeu vidéo — 4e année', en: 'Game Development — 4th year' },
        org: 'École privée Studio Mercier, Béziers'
      },
      {
        period: { fr: '2023', en: '2023' },
        role: { fr: 'Baccalauréat général', en: 'French general baccalaureate' },
        org: 'Lycée Marc Bloch, Sérignan'
      }
    ],

    awards: [
      {
        fr: 'Major de promotion développeur en 2e et 3e année (2024 – 2026)',
        en: 'Top of the programming class in 2nd and 3rd year (2024 – 2026)'
      },
      {
        fr: 'PSC1 — Prévention et secours civiques de niveau 1',
        en: 'PSC1 — French first-aid certificate (level 1)'
      }
    ]
  }
};
