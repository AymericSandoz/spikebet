const rankBet = [
  {
    teams: [
      {
        name: "Shaka Waka",
        joueur1: "Louis Durand",
        joueur2: "Théo Vanh Hemelryck",
        aymeric_cote: 6,
      },
      {
        name: "M&M's",
        joueur1: "Mehdi EL HILALI",
        joueur2: "Maxime Dumargne",
        aymeric_cote: 3,
      },
      {
        name: "Contre-Perf",
        joueur1: "Lafond Etienne",
        joueur2: "Marius Snoeck",
        aymeric_cote: 7.6,
      },
      {
        name: " ca spike",
        joueur1: "Pierre Vaure",
        joueur2: "Quentin COUYRAS",
      },
      {
        name: "Zougoula",
        joueur1: "nan nan",
        joueur2: "Boulay Tom",
      },
      {
        name: "Like&Subscribe",
        joueur1: "Ulysse Roundnet",
        joueur2: "Coach CLément",
        aymeric_cote: 10,
      },
      {
        name: "La cuisinière",
        joueur1: "karim lahoud",
        joueur2: "Benjamin Bernard",
      },
      {
        name: "Les directs cuteurs",
        joueur1: "Louis JOUVE",
        joueur2: "Tauziede Alexandre",
        aymeric_cote: 5,
      },
      {
        name: "Apa'spike",
        joueur1: "Adrien Tallec",
        joueur2: "Tom Soirat",
      },
      {
        name: "Bleus d'Auvergne",
        joueur1: "Corentin Chambost",
        joueur2: "Jean Kervella",
      },
      {
        name: "La communauté de la No Hit Zone",
        joueur1: "Alec Gautier",
        joueur2: "Yanis Bouchemoua",
        aymeric_cote: 4,
      },
      {
        name: "Par Téléphone",
        joueur1: "Antoine Burgaud",
        joueur2: "Antonin Folliet",
      },
      {
        name: "BN & LU",
        joueur1: "Lucien VIORNERY",
        joueur2: "Benjamin LIVET",
      },
      {
        name: "RAPHALE",
        joueur1: "Raphaël Chauvet",
        joueur2: "Alexandre Thiollière",
      },
      {
        name: "TBD1",
        joueur1: "Olivier Saunier",
        joueur2: "Tristan Prouteau",
        aymeric_cote: 4,
      },
      {
        name: "Spiketaculaire",
        joueur1: "Patrick Kaul",
        joueur2: "Romain Morel",
      },
      {
        name: "RC Chervinho",
        joueur1: "Simon Chervin",
        joueur2: "Emeric Lemoine",
      },
      {
        name: "Panique pas",
        joueur1: "Paul victor Macron",
        joueur2: "Thomas Hostin",
      },
      {
        name: "Camille,  Poses ce pet !",
        joueur1: "Rémi Salles",
        joueur2: "Titouan Alliod",
      },
      {
        name: "Les bébés",
        joueur1: "CLARK Auxence",
        joueur2: "Matthieu PROU",
      },
      {
        name: "Ï€R Paul Zach",
        joueur1: "nan nan",
        joueur2: "Zacharie seity",
      },
      {
        name: "Chouette Tomate",
        joueur1: "Tom Hullot",
        joueur2: "Lucas Cornut",
        aymeric_cote: 6.5,
      },
      {
        name: "TBD2",
        joueur1: "Olivier Hui Bon Hoa",
        joueur2: "Paul Halphen",
        aymeric_cote: 6,
      },
      {
        name: "La Nanterre du Milieu\t",
        joueur1: "Oussama Tchita",
        joueur2: "Clément Chassant",
      },
      {
        name: "TAPER BALLE",
        joueur1: "Bryan Rodon",
        joueur2: "Jules Baudry",
      },
      {
        name: "Blockbuster",
        joueur1: "Mathis Gigli",
        joueur2: "Antoine Grosse",
      },
      {
        name: "Douceur et résistance",
        joueur1: "Baptiste Marc",
        joueur2: "Victor Augelet",
      },
      {
        name: "RC Bondy",
        joueur1: "rudy toussaint",
        joueur2: "Kyliann Lestrat",
      },
      {
        name: "Sauron",
        joueur1: "Cyril -",
        joueur2: "Bourrelier Valentin",
      },
      {
        name: "Les grandes Gigues",
        joueur1: "Robin Lourtis",
        joueur2: "Guillaume Wetsch",
      },
      {
        name: "Machines de Nantes 1",
        joueur1: "Matthieu DEUX",
        joueur2: "Lemercier Antoine ",
      },
      {
        name: "Maréziane",
        joueur1: "Dorian Améziane",
        joueur2: "Louis Mareschal",
        aymeric_cote: 10,
      },
      {
        name: "Good Flick Bad Cut",
        joueur1: "Antoine Pecquet",
        joueur2: "Matthieu Fleuriault",
      },
      {
        name: "Pas Toucheyyyy",
        joueur1: "Jérôme RENIMEL",
        joueur2: "Aymeric Sandoz",
        aymeric_cote: 6,
      },
      {
        name: "Hors Services",
        joueur1: "Samy Caux-Ramon",
        joueur2: "Lacombe Hugo",
        aymeric_cote: 9,
      },
      {
        name: "Et le Rouen répondra",
        joueur1: "Camille BRUMENT",
        joueur2: "Antoine .R",
      },
      {
        name: "BULBICHIASSE",
        joueur1: "Alexandre ROLLOIS",
        joueur2: "Bixente Challet",
        aymeric_cote: 4.5,
      },
      {
        name: "Sushis Ã  volonté",
        joueur1: "Thomas Jouve",
        joueur2: "Robin Florinda",
        aymeric_cote: 7.7,
      },
      {
        name: "Baguettes Viennoises",
        joueur1: "Robin Laclare",
        joueur2: "Paul Duverny",
      },
      {
        name: "sPEC/TACle",
        joueur1: "Pierre Hachard",
        joueur2: "Ryan Danekas",
        aymeric_cote: 6,
      },
      {
        name: "Les TIBOUSEC",
        joueur1: "Alexis Sécher",
        joueur2: "Dorian Boulay",
      },
      {
        name: "Le Gondor appelle Ã  l'aide",
        joueur1: "Julie Dussart",
        joueur2: "Jason DUSSART",
      },
      {
        name: "Pierre Feuille Victor",
        joueur1: "Victor Cambois",
        joueur2: "Pierre Lecrosnier",
        aymeric_cote: 8,
      },
      {
        name: "Crétins de Touque",
        joueur1: "Clément Boquillon",
        joueur2: "Julien Boquillon",
      },
      {
        name: "Sandspikers",
        joueur1: "Grégoire Adnet",
        joueur2: "Paul Gheeraert",
      },
      {
        name: "Goffa Lolita",
        joueur1: "Lancelot Touzé",
        joueur2: "Benoit Nguyen",
        aymeric_cote: 6.1,
      },
      {
        name: "Underdogs",
        joueur1: "Evans Yeung",
        joueur2: "Nicolas Martin",
      },
      {
        name: "KDO",
        joueur1: "Kevin Manitch",
        joueur2: "GREGNANIN Dorian",
      },
    ],
    competition: "Clermont la terre du milieu - Open",
    competition_date: "2024-02-21T09:00:00.000Z",
    competition_name: "Clermont_2024",
    competition_global_name: "CLERMONT - Terre du milieu ",
    competition_type: "Open",

    prize: 1,
    live: "open",
  },
  {
    teams: [
      {
        name: "Les Deci'belles",
        joueur1: "Marine Thomasson",
        joueur2: "Anne Anne gerard",
        aymeric_cote: 6,
      },
      {
        name: "Lord of the rim",
        joueur1: "Elodie Holstein",
        joueur2: "Emeline Lauzier",
      },
      {
        name: "Wolfies",
        joueur1: "Louisiane Lemaire",
        joueur2: "Marina Gonclaves",
        aymeric_cote: 7,
      },
      {
        name: "Angers Démons",
        joueur1: "Chloé Sperduto",
        joueur2: "Marion Deffrasnes",
      },
      {
        name: "C'est ok!",
        joueur1: "Inès Paysan",
        joueur2: "Jade Lacombe",
        aymeric_cote: 9,
      },
      {
        name: "3h en train",
        joueur1: "Zwolinski  Lauriane ",
        joueur2: "Luz Hédier Gadea",
      },
      {
        name: "Chloé et Panpan",
        joueur1: "Pantxika LAURENT",
        joueur2: "Chloé avice",
      },
      {
        name: "Silvester StaLina",
        joueur1: "Lina Adel",
        joueur2: "Jeanne Silvestre",
      },
      {
        name: "Les Deux As",
        joueur1: "Amélie Calvier",
        joueur2: "Anita Richard",
      },
      {
        name: "Brainstorming",
        joueur1: "Hélène Bertrand",
        joueur2: "Sarah Martinez",
      },
      {
        name: "Aurélène",
        joueur1: "Aurelia Russinger",
        joueur2: "Helene Choyet",
      },
      {
        name: "Spikehausaur",
        joueur1: "Maude Journet",
        joueur2: "Lottie Friederici",
      },
      {
        name: "Funkiesss",
        joueur1: "Hélène Brochier",
        joueur2: "Ophélie Rey-ricord",
      },
      {
        name: "Ca passe crèèème",
        joueur1: "Enora Le Cadre",
        joueur2: "Elise Martin",
        aymeric_cote: 7,
      },
      {
        name: "Joly et Doux",
        joueur1: "Louise Eydoux",
        joueur2: "Amely Joly",
        aymeric_cote: 8,
      },
      {
        name: "Les Zoulettes de Jojo",
        joueur1: "Juliette Bonnin",
        joueur2: "Amélie Pinard",
      },
      {
        name: "Sur un malentendu",
        joueur1: "Perrine Lestrade",
        joueur2: "Marine Hauchère",
      },
      {
        name: "Les Pauluches Malines",
        joueur1: "Céline Uch",
        joueur2: "Margot Paulin",
      },
      {
        name: "JULILUCYJUCYLULI",
        joueur1: "Lucy Mignot",
        joueur2: "Julie Espeche-Bernard",
      },
      {
        name: "Les Cavalières Noires",
        joueur1: "Raphaëlle\t nan",
        joueur2: "Arij Aissa",
      },
      {
        name: "Poules au Port",
        joueur1: "Anaïs Duport",
        joueur2: "Valentine Pottez",
        aymeric_cote: 8,
      },
      {
        name: "Les spike surfeuse",
        joueur1: "Lucile Rouault",
        joueur2: "Ondine Novarese",
        aymeric_cote: 8.5,
      },
      {
        name: "Ni-rim ni-cozy",
        joueur1: "Nicole Rupf Figueroa\t",
        joueur2: "Rozi Ouali",
      },
    ],
    competition: "Clermont la terre du milieu - Féminin",
    competition_date: "2024-02-21T09:00:00.000Z",
    competition_name: "Clermont_2024",
    competition_global_name: "CLERMONT - Terre du milieu ",
    competition_type: "Féminin",
    prize: 1,
    live: "open",
  },
  {
    teams: [
      {
        name: "Penses au gratin",
        joueur1: "BROCHIER Hélène",
        joueur2: "Remi Salles",
      },
      {
        name: "Final Tac",
        joueur1: "ondine novarese",
        joueur2: "Ryan Danekas",
        aymeric_cote: 6,
      },
      {
        name: "Free Run",
        joueur1: "Evans Yeung",
        joueur2: "Sarah Miri",
      },
      {
        name: "Les skins red",
        joueur1: "Paul-Victor Macron",
        joueur2: "Raphaëlle Charansol",
      },
      {
        name: "Pas dâ€™inspi",
        joueur1: "Amélie Calvier",
        joueur2: "Kyliann Lestrat",
      },
      {
        name: "CocAurécau",
        joueur1: "Aurélia Russinger",
        joueur2: "Corentin Chambost",
      },
      {
        name: "Niambye",
        joueur1: "Zacharie seity",
        joueur2: "Uch Céline",
      },
      {
        name: "Maroille choucroute",
        joueur1: "Lauriane Zwolinski",
        joueur2: "Zwolinski  Lauriane ",
      },
      {
        name: "Les Chimpkun's",
        joueur1: "Anita Richard",
        joueur2: "rudy toussaint",
      },
      {
        name: "Les ronds rire",
        joueur1: "Romain Chaulet",
        joueur2: "Lucile Rouault",
      },
      {
        name: "Gigladel",
        joueur1: "Lina Adel",
        joueur2: "Mathis Gigli",
      },
      {
        name: "DoubleJ ",
        joueur1: "Joris Melgar",
        joueur2: "Juliette Bonnin",
      },
      {
        name: "Spikewalker",
        joueur1: "Chloé avice",
        joueur2: "Grégoire Adnet",
      },
      {
        name: "Les Plots",
        joueur1: "Kevin Manitch",
        joueur2: "Elise Martin",
      },
      {
        name: "Grosses pralines",
        joueur1: "Jules Baudry",
        joueur2: "Luz Hédier Gadea",
      },
      {
        name: "Reverse du dimanche",
        joueur1: "Auxence Clark",
        joueur2: "Jade LACOMBE",
        aymeric_cote: 5,
      },
      {
        name: "Beau temps,  Belle neige",
        joueur1: "Ophelie Rey-Ricord",
        joueur2: "Titouan Alliod",
      },
      {
        name: "La belle et le clochard",
        joueur1: "Hélène Choyez",
        joueur2: "Sandoz Aymeric",
      },
      {
        name: "Yanis MaudeMaude MAUDE!",
        joueur1: "Pantxica Laurent",
        joueur2: "Yanis Bouchemoua",
      },
      {
        name: "Flip Flop",
        joueur1: "Louisiane Lemaire",
        joueur2: "Tom Hullot",
        aymeric_cote: 6,
      },
      {
        name: "Tutafé",
        joueur1: "Marius Snoeck",
        joueur2: "Hélène Bertrand",
        aymeric_cote: 5,
      },
      {
        name: "En roule libre",
        joueur1: "Lucas Cornut",
        joueur2: "Marine Thomasson",
        aymeric_cote: 5,
      },
      {
        name: "Chouchou et Loulou",
        joueur1: "Antoine Grosse",
        joueur2: "Marine Hauchère",
      },
      {
        name: "Gin Tonic",
        joueur1: "Nodet  Quentin ",
        joueur2: "Loelia Renaud",
      },
      {
        name: "No-Mads",
        joueur1: "Emeline Lauzier",
        joueur2: "Victor Augelet",
      },
      {
        name: "Les luges",
        joueur1: "Margot Paulin",
        joueur2: "Simon Chervin",
      },
      {
        name: "Bad Salmons",
        joueur1: "Anaïs Duport",
        joueur2: "Pierre Lecrosnier",
        aymeric_cote: 8,
      },
      {
        name: "Chloé et panpan",
        joueur1: "Chloé Avice",
        joueur2: "Pantxika LAURENT",
      },
      {
        name: "Stratoloo",
        joueur1: "Lotttie FRIEDERICI",
        joueur2: "EL HILALI Mehdi",
        aymeric_cote: 4,
      },
      {
        name: "Feur",
        joueur1: "Julie Espeche bernard",
        joueur2: "Thomas Hostin",
      },
      {
        name: "Check moi Ã§a Poulette",
        joueur1: "Lucy Mignot",
        joueur2: "Antonin Folliet",
      },
      {
        name: "Les Inconnus",
        joueur1: "Arij -",
        joueur2: "Bourrelier Valentin",
      },
      {
        name: "Les Loulou",
        joueur1: "Louise Eydoux",
        joueur2: "Louis JOUVE",
        aymeric_cote: 7,
      },
      {
        name: "Les bar-oudeurs",
        joueur1: "Paul Heintzé",
        joueur2: "Jeanne Silvestre",
      },
      {
        name: "ClémentInes confites",
        joueur1: "Clément Martin-Gougenheim",
        joueur2: "Inès Paysan",
        aymeric_cote: 7.5,
      },
      {
        name: "Jacky Bear",
        joueur1: "Thibaud Brun",
        joueur2: "Louise Jacquier",
      },
      {
        name: "Les bras cassés",
        joueur1: "Journet Maude ",
        joueur2: "Romain Morel",
      },
      {
        name: "Mococo",
        joueur1: "Sarah Martinez",
        joueur2: "Louis Mareschal",
        aymeric_cote: 7.5,
      },
      {
        name: "Ne sais pas encore",
        joueur1: "Ne sais pas encore Ne sais pas encore",
        joueur2: "Enora Le Cadre",
      },
      {
        name: "Hello, dis Robin",
        joueur1: "Robin Florinda",
        joueur2: "Elodie Holstein",
        aymeric_cote: 7,
      },
      {
        name: "Muchachos",
        joueur1: "Mariana Vivad",
        joueur2: "karim lahoud",
      },
      {
        name: "Bon vieux Pinard",
        joueur1: "Benoit Nguyen",
        joueur2: "Amélie Pinard",
      },
      {
        name: "Cut flick repeat",
        joueur1: "Perrine Lestrade",
        joueur2: "Jean Kervella",
      },
      {
        name: "Tapenade",
        joueur1: "Anne GERARD",
        joueur2: "Olivier Saunier",
        aymeric_cote: 4,
      },
      {
        name: "Rééducation maximale",
        joueur1: "Lafond Etienne",
        joueur2: "Amely Joly",
        aymeric_cote: 6,
      },
      {
        name: "Autoroute du soleil",
        joueur1: "Marina Goncalves",
        joueur2: "Jérôme RENIMEL",
        aymeric_cote: 5.5,
      },
    ],
    competition: "Clermont la terre du milieu - Mixte",
    competition_date: "2024-02-21T09:00:00.000Z",
    competition_name: "Clermont_2024",
    competition_global_name: "CLERMONT - Terre du milieu ",
    competition_type: "Mixte",
    prize: 1,
    live: "open",
  },

  {
    teams: [],
    competition: "TS Montpellier - Open",
    competition_date: "2024-04-21T09:00:00.000Z",
    competition_name: "TS_Montpellier_2024",
    competition_global_name: "TS Montpellier",
    competition_type: "Open",

    prize: 2,
    live: "open",
  },
  {
    teams: [],
    competition: "TS Montpellier - Féminin",
    competition_date: "2024-04-21T09:00:00.000Z",
    competition_name: "TS_Montpellier_2024",
    competition_global_name: "TS Montpellier",
    competition_type: "Féminin",

    prize: 2,
    live: "open",
  },
  {
    teams: [],
    competition: "TS Montpellier - Mixte",
    competition_date: "2024-04-21T09:00:00.000Z",
    competition_name: "TS_Montpellier_2024",
    competition_global_name: "TS Montpellier",
    competition_type: "Mixte",
    prize: 2,
    live: "open",
  },
];

const data = [
  {
    competition: "Clermont la terre du milieu - Féminin",
    competition_date: "2024-02-21T09:00:00.000Z",
    competition_name: "Clermont_2024",
    competition_global_name: "CLERMONT - Terre du milieu ",
    competition_type: "Féminin",
    prize: 1,
    live: "open",
    division: "Dimanche - Equipe Mixte",
    teams: [
      {
        name: "Penses au gratin",
        joueur1: "BROCHIER Hélène",
        joueur2: "Remi Salles",
      },
      {
        name: "Final Tac",
        joueur1: "ondine novarese",
        joueur2: "Ryan Danekas",
      },
      {
        name: "Free Run",
        joueur1: "Evans Yeung",
        joueur2: "Sarah Miri",
      },
      {
        name: "Les skins red",
        joueur1: "Paul-Victor Macron",
        joueur2: "Raphaëlle Charansol",
      },
      {
        name: "Pas dâ€™inspi",
        joueur1: "Amélie Calvier",
        joueur2: "Kyliann Lestrat",
      },
      {
        name: "CocAurécau",
        joueur1: "Aurélia Russinger",
        joueur2: "Corentin Chambost",
      },
      {
        name: "Niambye",
        joueur1: "Zacharie seity",
        joueur2: "Uch Céline",
      },
      {
        name: "Maroille choucroute",
        joueur1: "Lauriane Zwolinski",
        joueur2: "Zwolinski  Lauriane ",
      },
      {
        name: "Les Chimpkun's",
        joueur1: "Anita Richard",
        joueur2: "rudy toussaint",
      },
      {
        name: "Les ronds rire",
        joueur1: "Romain Chaulet",
        joueur2: "Lucile Rouault",
      },
      {
        name: "Gigladel",
        joueur1: "Lina Adel",
        joueur2: "Mathis Gigli",
      },
      {
        name: "DoubleJ ",
        joueur1: "Joris Melgar",
        joueur2: "Juliette Bonnin",
      },
      {
        name: "Spikewalker",
        joueur1: "Chloé avice",
        joueur2: "Grégoire Adnet",
      },
      {
        name: "Les Plots",
        joueur1: "Kevin Manitch",
        joueur2: "Elise Martin",
      },
      {
        name: "Grosses pralines",
        joueur1: "Jules Baudry",
        joueur2: "Luz Hédier Gadea",
      },
      {
        name: "Reverse du dimanche",
        joueur1: "Auxence Clark",
        joueur2: "Jade LACOMBE",
      },
      {
        name: "Beau temps,  Belle neige",
        joueur1: "Ophelie Rey-Ricord",
        joueur2: "Titouan Alliod",
      },
      {
        name: "La belle et le clochard",
        joueur1: "nan nan",
        joueur2: "Sandoz Aymeric",
      },
      {
        name: "Yanis MaudeMaude MAUDE!",
        joueur1: "Pantxica Laurent",
        joueur2: "Yanis Bouchemoua",
      },
      {
        name: "Flip Flop",
        joueur1: "Louisiane Lemaire",
        joueur2: "Tom Hullot",
      },
      {
        name: "Tutafé",
        joueur1: "Marius Snoeck",
        joueur2: "Hélène Bertrand",
      },
      {
        name: "En roule libre",
        joueur1: "Lucas Cornut",
        joueur2: "Marine Thomasson",
      },
      {
        name: "Chouchou et Loulou",
        joueur1: "Antoine Grosse",
        joueur2: "Marine Hauchère",
      },
      {
        name: "Gin Tonic",
        joueur1: "Nodet  Quentin ",
        joueur2: "Loelia Renaud",
      },
      {
        name: "No-Mads",
        joueur1: "Emeline Lauzier",
        joueur2: "Victor Augelet",
      },
      {
        name: "Les luges",
        joueur1: "Margot Paulin",
        joueur2: "Simon Chervin",
      },
      {
        name: "Bad Salmons",
        joueur1: "Anaïs Duport",
        joueur2: "Pierre Lecrosnier",
      },
      {
        name: "Chloé et panpan",
        joueur1: "Chloé Avice",
        joueur2: "Pantxika LAURENT",
      },
      {
        name: "Stratoloo",
        joueur1: "Lotttie FRIEDERICI",
        joueur2: "EL HILALI Mehdi",
      },
      {
        name: "Feur",
        joueur1: "Julie Espeche bernard",
        joueur2: "Thomas Hostin",
      },
      {
        name: "Check moi Ã§a Poulette",
        joueur1: "Lucy Mignot",
        joueur2: "Antonin Folliet",
      },
      {
        name: "Les Inconnus",
        joueur1: "Arij -",
        joueur2: "Bourrelier Valentin",
      },
      {
        name: "Les Loulou",
        joueur1: "Louise Eydoux",
        joueur2: "Louis JOUVE",
      },
      {
        name: "Les bar-oudeurs",
        joueur1: "Paul Heintzé",
        joueur2: "Jeanne Silvestre",
      },
      {
        name: "ClémentInes confites",
        joueur1: "Clément Martin-Gougenheim",
        joueur2: "Inès Paysan",
      },
      {
        name: "Jacky Bear",
        joueur1: "Thibaud Brun",
        joueur2: "Louise Jacquier",
      },
      {
        name: "Les bras cassés",
        joueur1: "Journet Maude ",
        joueur2: "Romain Morel",
      },
      {
        name: "Mococo",
        joueur1: "Sarah Martinez",
        joueur2: "Louis Mareschal",
      },
      {
        name: "Ne sais pas encore",
        joueur1: "Ne sais pas encore Ne sais pas encore",
        joueur2: "Enora Le Cadre",
      },
      {
        name: "Hello, dis Robin",
        joueur1: "Robin Florinda",
        joueur2: "Elodie Holstein",
      },
      {
        name: "Muchachos",
        joueur1: "Mariana Vivad",
        joueur2: "karim lahoud",
      },
      {
        name: "Bon vieux Pinard",
        joueur1: "Benoit Nguyen",
        joueur2: "Amélie Pinard",
      },
      {
        name: "Cut flick repeat",
        joueur1: "Perrine Lestrade",
        joueur2: "Jean Kervella",
      },
      {
        name: "Tapenade",
        joueur1: "Anne GERARD",
        joueur2: "Olivier Saunier",
      },
      {
        name: "Rééducation maximale",
        joueur1: "Lafond Etienne",
        joueur2: "Amely Joly",
      },
      {
        name: "Autoroute du soleil",
        joueur1: "Marina Goncalves",
        joueur2: "Jérôme RENIMEL",
      },
    ],
  },
  {
    division: "Samedi - Equipe Féminine",
    teams: [
      {
        name: "Les Deci'belles",
        joueur1: "Marine Thomasson",
        joueur2: "Anne Anne gerard",
      },
      {
        name: "Lord of the rim",
        joueur1: "Elodie Holstein",
        joueur2: "Emeline Lauzier",
      },
      {
        name: "Wolfies",
        joueur1: "Louisiane Lemaire",
        joueur2: "Marina Gonclaves",
      },
      {
        name: "Angers Démons",
        joueur1: "Chloé Sperduto",
        joueur2: "Marion Deffrasnes",
      },
      {
        name: "C'est ok!",
        joueur1: "Inès Paysan",
        joueur2: "Jade Lacombe",
      },
      {
        name: "3h en train",
        joueur1: "Zwolinski  Lauriane ",
        joueur2: "Luz Hédier Gadea",
      },
      {
        name: "Chloé et Panpan",
        joueur1: "Pantxika LAURENT",
        joueur2: "Chloé avice",
      },
      {
        name: "Silvester StaLina",
        joueur1: "Lina Adel",
        joueur2: "Jeanne Silvestre",
      },
      {
        name: "Les Deux As",
        joueur1: "Amélie Calvier",
        joueur2: "Anita Richard",
      },
      {
        name: "Brainstorming",
        joueur1: "Hélène Bertrand",
        joueur2: "Sarah Martinez",
      },
      {
        name: "Aurélène",
        joueur1: "Aurelia Russinger",
        joueur2: "Helene Choyet",
      },
      {
        name: "Spikehausaur",
        joueur1: "Maude Journet",
        joueur2: "Lottie Friederici",
      },
      {
        name: "Funkiesss",
        joueur1: "Hélène Brochier",
        joueur2: "Ophélie Rey-ricord",
      },
      {
        name: "Ca passe crèèème",
        joueur1: "Enora Le Cadre",
        joueur2: "Elise Martin",
      },
      {
        name: "Joly et Doux",
        joueur1: "Louise Eydoux",
        joueur2: "Amely Joly",
      },
      {
        name: "Les Zoulettes de Jojo",
        joueur1: "Juliette Bonnin",
        joueur2: "Amélie Pinard",
      },
      {
        name: "Sur un malentendu",
        joueur1: "Perrine Lestrade",
        joueur2: "Marine Hauchère",
      },
      {
        name: "Les Pauluches Malines",
        joueur1: "Céline Uch",
        joueur2: "Margot Paulin",
      },
      {
        name: "JULILUCYJUCYLULI",
        joueur1: "Lucy Mignot",
        joueur2: "Julie Espeche-Bernard",
      },
      {
        name: "Les Cavalières Noires",
        joueur1: "Raphaëlle\t nan",
        joueur2: "Arij Aissa",
      },
      {
        name: "Poules au Port",
        joueur1: "Anaïs Duport",
        joueur2: "Valentine Pottez",
      },
      {
        name: "Les spike surfeuse",
        joueur1: "Lucile Rouault",
        joueur2: "Ondine Novarese",
      },
      {
        name: "Ni-rim ni-cozy",
        joueur1: "Nicole Rupf Figueroa\t",
        joueur2: "Rozi Ouali",
      },
    ],
  },
  {
    division: "Samedi - Equipe Open",
    teams: [
      {
        name: "Shaka Waka",
        joueur1: "Louis Durand",
        joueur2: "Théo Vanh Hemelryck",
      },
      {
        name: "M&M's",
        joueur1: "Mehdi EL HILALI",
        joueur2: "Maxime Dumargne",
      },
      {
        name: "Contre-Perf",
        joueur1: "Lafond Etienne",
        joueur2: "Marius Snoeck",
      },
      {
        name: " ca spike",
        joueur1: "Pierre Vaure",
        joueur2: "Quentin COUYRAS",
      },
      {
        name: "Zougoula",
        joueur1: "nan nan",
        joueur2: "Boulay Tom",
      },
      {
        name: "Like&Subscribe",
        joueur1: "Ulysse Couturier",
        joueur2: "Clément Martin-Gougenheim",
      },
      {
        name: "La cuisinière",
        joueur1: "karim lahoud",
        joueur2: "Benjamin Bernard",
      },
      {
        name: "Les directs cuteurs",
        joueur1: "Louis JOUVE",
        joueur2: "Tauziede Alexandre",
      },
      {
        name: "Apa'spike",
        joueur1: "Adrien Tallec",
        joueur2: "Tom Soirat",
      },
      {
        name: "Bleus d'Auvergne",
        joueur1: "Corentin Chambost",
        joueur2: "Jean Kervella",
      },
      {
        name: "La communauté de la No Hit Zone",
        joueur1: "Alec Gautier",
        joueur2: "Yanis Bouchemoua",
      },
      {
        name: "Par Téléphone",
        joueur1: "Antoine Burgaud",
        joueur2: "Antonin Folliet",
      },
      {
        name: "BN & LU",
        joueur1: "Lucien VIORNERY",
        joueur2: "Benjamin LIVET",
      },
      {
        name: "RAPHALE",
        joueur1: "Raphaël Chauvet",
        joueur2: "Alexandre Thiollière",
      },
      {
        name: "TBD1",
        joueur1: "Olivier Saunier",
        joueur2: "Tristan Prouteau",
      },
      {
        name: "Spiketaculaire",
        joueur1: "Patrick Kaul",
        joueur2: "Romain Morel",
      },
      {
        name: "RC Chervinho",
        joueur1: "Simon Chervin",
        joueur2: "Emeric Lemoine",
      },
      {
        name: "Panique pas",
        joueur1: "Paul victor Macron",
        joueur2: "Thomas Hostin",
      },
      {
        name: "Camille,  Poses ce pet !",
        joueur1: "Rémi Salles",
        joueur2: "Titouan Alliod",
      },
      {
        name: "Les bébés",
        joueur1: "CLARK Auxence",
        joueur2: "Matthieur PROU",
      },
      {
        name: "Ï€R Paul Zach",
        joueur1: "nan nan",
        joueur2: "Zacharie seity",
      },
      {
        name: "Chouette Tomate",
        joueur1: "Tom Hullot",
        joueur2: "Lucas Cornut",
      },
      {
        name: "TBD2",
        joueur1: "Olivier Hui Bon Hoa",
        joueur2: "Paul Halphen",
      },
      {
        name: "La Nanterre du Milieu\t",
        joueur1: "Oussama Tchita",
        joueur2: "Clément Chassant",
      },
      {
        name: "TAPER BALLE",
        joueur1: "Bryan Rodon",
        joueur2: "Jules Baudry",
      },
      {
        name: "Blockbuster",
        joueur1: "Mathis Gigli",
        joueur2: "Antoine Grosse",
      },
      {
        name: "Douceur et résistance",
        joueur1: "Baptiste Marc",
        joueur2: "Victor Augelet",
      },
      {
        name: "RC Bondy",
        joueur1: "rudy toussaint",
        joueur2: "Kyliann Lestrat",
      },
      {
        name: "Sauron",
        joueur1: "Cyril -",
        joueur2: "Bourrelier Valentin",
      },
      {
        name: "Les grandes Gigues",
        joueur1: "Robin Lourtis",
        joueur2: "Guillaume Wetsch",
      },
      {
        name: "Machines de Nantes 1",
        joueur1: "Matthieu DEUX",
        joueur2: "Lemercier Antoine ",
      },
      {
        name: "Maréziane",
        joueur1: "Dorian Améziane",
        joueur2: "Louis Mareschal",
      },
      {
        name: "Good Flick Bad Cut",
        joueur1: "Antoine Pecquet",
        joueur2: "Matthieu Fleuriault",
      },
      {
        name: "Pas Toucheyyyy",
        joueur1: "Jérôme RENIMEL",
        joueur2: "Aymeric Sandoz",
      },
      {
        name: "Hors Services",
        joueur1: "Samy Caux-Ramon",
        joueur2: "Lacombe Hugo",
      },
      {
        name: "Et le Rouen répondra",
        joueur1: "Camille BRUMENT",
        joueur2: "Antoine .R",
      },
      {
        name: "BULBICHIASSE",
        joueur1: "Alexandre ROLLOIS",
        joueur2: "Bixente Challet",
      },
      {
        name: "Sushis Ã  volonté",
        joueur1: "Thomas Jouve",
        joueur2: "Robin Florinda",
      },
      {
        name: "Baguettes Viennoises",
        joueur1: "Robin Laclare",
        joueur2: "Paul Duverny",
      },
      {
        name: "sPEC/TACle",
        joueur1: "Pierre Hachard",
        joueur2: "Ryan Danekas",
      },
      {
        name: "Les TIBOUSEC",
        joueur1: "Alexis Sécher",
        joueur2: "Dorian Boulay",
      },
      {
        name: "Le Gondor appelle Ã  l'aide",
        joueur1: "Julie Dussart",
        joueur2: "Jason DUSSART",
      },
      {
        name: "Pierre Feuille Victor",
        joueur1: "Victor Cambois",
        joueur2: "Pierre Lecrosnier",
      },
      {
        name: "Crétins de Touque",
        joueur1: "Clément Boquillon",
        joueur2: "Julien Boquillon",
      },
      {
        name: "Sandspikers",
        joueur1: "Grégoire Adnet",
        joueur2: "Paul Gheeraert",
      },
      {
        name: "Goffa Lolita",
        joueur1: "Lancelot Touzé",
        joueur2: "Benoit Nguyen",
      },
      {
        name: "Underdogs",
        joueur1: "Evans Yeung",
        joueur2: "Nicolas Martin",
      },
      {
        name: "KDO",
        joueur1: "Kevin Manitch",
        joueur2: "GREGNANIN Dorian",
      },
    ],
  },
];

//
