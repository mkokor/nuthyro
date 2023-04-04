const bazaPodataka = require("./konekcijaNaBazuPodataka.js");

bazaPodataka.konekcijaNaBazuPodataka.sync({ "force": true })
  .then(() => {
    console.log("\nOstvarena konekcija na bazu podataka!");
    dodajTipoveAktivnosti();
  })
  .catch(() => {
    console.log("\nNeuspješan pokušaj konektovanja na bazu podataka!");
  });

const tipoviAktivnosti = [
  {
    "tip": "Neaktivan",
    "opis": "Sjedeći posao uz malo (ili ništa) fizičke aktivnosti",
    "palVrijednost": 1.2
  },
  {
    "tip": "Slabo aktivan",
    "opis": "Fizička aktivnost 1-3 dana sedmično",
    "palVrijednost": 1.375
  },
  {
    "tip": "Umjereno aktivan",
    "opis": "Fizička aktivnost 4-5 dana sedmično",
    "palVrijednost": 1.55
  },
  {
    "tip": "Veoma aktivan",
    "opis": "Veoma intenzivna fizička aktivnost 5-6 dana sedmično",
    "palVrijednost": 1.725
  },
  {
    "tip": "Ekstremno aktivan",
    "opis": "Veoma intenzivna fizička aktivnost 6-7 dana sedmično (nekada i 2 puta dnevno), uz težak fizički posao ili aktivno bavljenje sportom",
    "palVrijednost": 1.9
  }
]

const dodajTipoveAktivnosti = () => {
  let kraj = []
  tipoviAktivnosti.forEach(tipAktivnosti => {
    kraj.push(bazaPodataka.DnevnaAktivnost.create(tipAktivnosti));
  });
  Promise.all(kraj)
    .then(() => {
      console.log("Tipovi aktivnosti dodani u bazu podataka!");
    });
}

module.exports = bazaPodataka;