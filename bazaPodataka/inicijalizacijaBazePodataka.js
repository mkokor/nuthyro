const bazaPodataka = require("./konekcijaNaBazuPodataka.js");
const fs = require("fs");
const path = require("path");

const tipoviAktivnosti = JSON.parse(fs.readFileSync(path.join(__dirname, "../resursi/tipoviAktivnosti.json")));
const namirnice = require("../resursi/namirnice.js");


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