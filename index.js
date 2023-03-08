const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bazaPodataka = require("./bazaPodataka/inicijalizacijaBazePodataka.js");
const sigurnost = require("./pomoćniModuli/sigurnostPodataka.js");


const application = express();


application.use(express.static("public"));
application.use(bodyParser.json());


// POMOĆNE FUNKCIJE

// Funkcija provjerava da li u bazi podataka postoji zapis koji u koloni pod nazivom 
// koji je sadržan u parametru "nazivAtributa", posjeduje vrijednost koja je sadržana 
// u parametru "vrijednostAtributa".
const postojiLiKorisničkiRačun = (nazivAtributa, vrijednostAtributa) => {
  return new Promise((resolve, reject) => {
    bazaPodataka.KorisničkiRačun.findOne({ "where": { [nazivAtributa]: vrijednostAtributa } })
      .then((korisničkiRačun) => {
        resolve(korisničkiRačun ? true : false);
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

const validirajEmail = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}


// RUTE

// URL: http://localhost:3000/registracija
// TIJELO ZAHTJEVA: { email: *, korisničkoIme: *, lozinka: * }
// ODGOVOR: { email: true/false, korisničkoIme: true/false, lozinka: true/false }
application.post("/registracija", (request, response) => {
  let validacija = [];
  validacija.push(postojiLiKorisničkiRačun("email", request.body.email));
  validacija.push(postojiLiKorisničkiRačun("korisničkoIme", request.body.korisničkoIme));
  Promise.all(validacija)
    .then((rezultat) => {
      console.log(rezultat);
    });
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify({
    "email": true,
    "korisničkoIme": true,
    "lozinka": true
  }));
});

// URL: http://localhost:3000/prijava
// TIJELO ZAHTJEVA: { korisničkoIme: *, lozinka: * }
// ODGOVOR: { korisničkoIme: true/false, lozinka: true/false }
application.post("/prijava", (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify({
    "korisničkoIme": true,
    "lozinka": true
  }));  
});

// URL: http://localhost:3000/provjeraEmaila?email=*
// TIJELO ZAHTJEVA: /
// ODGOVOR: { email: true/false }
application.get("/provjeraEmaila", (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify({
    "email": true
  }));
});


application.listen(3000, (greška) => {
  if (greška)
    console.log("Greška prilikom pokretanja servera!");
  else 
    console.log("Server osluškuje na portu 3000...");
});