const ligueParisienne = [
  {
    ligue: "ligue_Parisienne",
    type: "match",
    round: "GroupStage",
    group: "Poulle Mouillée",
    nomEquipeA: "Les mystiques",
    nomEquipeB: "Badger Hunter",
    joueursEquipeA: ["Tristan Prouteau", "Jerome renimel"],
    joueursEquipeB: ["Aymeric Sandoz", "Erwan Chapelière"],
    scoreEquipeA: {},
    scoreEquipeB: {},
    coteEquipeA: 5,
    coteEquipeB: 2,
  },
  {
    ligue: "ligue_Parisienne",
    type: "match",
    round: "group",
    group: "A",
    nomEquipeA: "A",
    nomEquipeB: "B",
    joueursEquipeA: ["lucas", "enzo"],
    joueursEquipeB: ["batiste", "mathias"],
    scoreEquipeA: {},
    scoreEquipeB: {},
    coteEquipeA: 5,
    coteEquipeB: 2,
  },
  {
    ligue: "ligue_Parisienne",
    type: "match",
    round: "group",
    group: "A",
    nomEquipeA: "A",
    nomEquipeB: "B",
    joueursEquipeA: ["lucas", "enzo"],
    joueursEquipeB: ["batiste", "mathias"],
    scoreEquipeA: {},
    scoreEquipeB: {},
    coteEquipeA: 9,
    coteEquipeB: 1,
  },
  {
    ligue: "ligue_Parisienne",
    type: "match",
    round: "group",
    group: "A",
    nomEquipeA: "C",
    nomEquipeB: "D",
    joueursEquipeA: ["lucas", "uuuuuuuuu"],
    joueursEquipeB: ["batiste", "vvvv"],
    scoreEquipeA: {},
    scoreEquipeB: {},
    coteEquipeA: 1.2,
    coteEquipeB: 1.4,
  },
  {
    ligue: "ligue_Parisienne",
    type: "match",
    round: "group",
    group: "A",
    nomEquipeA: "D",
    nomEquipeB: "Z",
    joueursEquipeA: ["ddd", "enzo"],
    joueursEquipeB: ["batiste", "maccthias"],
    scoreEquipeA: {},
    scoreEquipeB: {},
    coteEquipeA: 1.3,
    coteEquipeB: 1.6,
  },
];

exports.find = () => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(ligueParisienne)))
  );
};

exports.findByGroup = (group) => {
  return new Promise((resolve, reject) =>
    resolve(
      JSON.parse(JSON.stringify(ligueParisienne)).find(
        (ligueParisienne) => ligueParisienne.group == group
      )
    )
  );
};
