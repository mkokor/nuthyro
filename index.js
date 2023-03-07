const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const application = express();


application.use(express.static("public"));
application.use(bodyParser.json());


// RUTE

// URL: http://localhost:3000/registracija
// TIJELO ZAHTJEVA: { email: *, korisničkoIme: *, lozinka: * }
// ODGOVOR: { email: true/false, korisničkoIme: true/false, lozinka: true/false }
application.post("/registracija", (request, response) => {
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