const bazaPodataka = require("./konekcijaNaBazuPodataka.js");

bazaPodataka.konekcijaNaBazuPodataka.sync({ "force": true })
  .then(() => {
    console.log("\nOstvarena konekcija na bazu podataka!");
    ubaciKorisnika();
  })
  .catch(() => {
    console.log("\nNeuspješan pokušaj konektovanja na bazu podataka!");
  });

const ubaciKorisnika = () => {
  bazaPodataka.KorisničkiRačun.create({
    "email": "matijakokorr@gmail.com",
    "korisničkoIme": "matijak",
    "kodLozinke": "123"
  })
    .then(() => {
      console.log("Korisnik uspješno kreiran!");
    })
    .catch(() => {
      console.log("Korisnik nije dodan!");
    });
}

module.exports = bazaPodataka;