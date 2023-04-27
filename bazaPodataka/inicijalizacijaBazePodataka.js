const bazaPodataka = require("./konekcijaNaBazuPodataka.js");
const fs = require("fs");

const tipoviAktivnosti = JSON.parse(fs.readFileSync("../resurs/tipoviAktivnosti.json", "utf-8"));


bazaPodataka.konekcijaNaBazuPodataka.sync({ "force": true })
  .then(() => {
    console.log("\nOstvarena konekcija na bazu podataka!");
    dodajTipoveAktivnosti();
    dodajNamirnice();
  })
  .catch(() => {
    console.log("\nNeuspješan pokušaj konektovanja na bazu podataka!");
  });

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

const dodajNamirnice = () => {
  let kraj = []
  namirnice.forEach(namirnica => {
    kraj.push(bazaPodataka.Namirnica.create(namirnica));
  });
  Promise.all(kraj)
    .then(() => {
      console.log("Namirnice dodane u bazu podataka!");
    });
}

module.exports = bazaPodataka;