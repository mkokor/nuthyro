// U ovom modulu se kreira konekcija na bazu podataka (instanciranjem Sequelize klase) i kreiraju
// se potrebni modeli (kao i veze između njih). Dakle, ovaj modul ne sinhronizuje kreirane modele
// sa bazom podataka na koju se povezuje (tj. ne pozivu metodu "sync"), nego isključivo stvara vezu 
// na bazu podataka i definiše modele koji će se kasnije sinhronizovati sa bazom podataka.


const Sequelize = require("sequelize");


const bazaPodataka = {}; // Ovaj objekat služi za pohranu svih podataka vezanih za bazu (i on se eksportuje iz ovog modula).


// KREIRANJE KONEKCIJE NA BAZU PODATAKA (tj. instanciranje Sequelize klase)

const konekcijaNaBazuPodataka = new Sequelize("NuThyro", null, null, {
  "dialect": "sqlite",
  "storage": "./bazaPodataka/bazaPodataka.sqlite",
  "logging": false // Izvršeni upiti se neće ispisivati u konzoli.
  // Pool postavke će ostati default-e. 
});

bazaPodataka.konekcijaNaBazuPodataka = konekcijaNaBazuPodataka;


// KREIRANJE MODELA (koji će se mapirati u odgovarajuće tabele)
bazaPodataka.KorisničkiRačun = require("./modeli/korisničkiRačun.js")(bazaPodataka.konekcijaNaBazuPodataka);
bazaPodataka.SigurnosniToken = require("./modeli/sigurnosniToken.js")(bazaPodataka.konekcijaNaBazuPodataka);
bazaPodataka.DnevnaAktivnost = require("./modeli/dnevnaAktivnost.js")(bazaPodataka.konekcijaNaBazuPodataka);
bazaPodataka.EnergetskaVrijednost = require("./modeli/energetskaVrijednost.js")(bazaPodataka.konekcijaNaBazuPodataka);


// POSTAVLJANJE RELACIJA IZMEĐU MODELA
bazaPodataka.KorisničkiRačun.hasOne(bazaPodataka.SigurnosniToken, {
  "foreignKey": "idKorisnika"
});
bazaPodataka.SigurnosniToken.belongsTo(bazaPodataka.KorisničkiRačun, {
  "foreignKey": "idKorisnika"
});
bazaPodataka.KorisničkiRačun.hasOne(bazaPodataka.EnergetskaVrijednost, {
  "foreignKey": "idKorisnika"
});
bazaPodataka.EnergetskaVrijednost.belongsTo(bazaPodataka.KorisničkiRačun, {
  "foreignKey": "idKorisnika"
});


module.exports = bazaPodataka;
