const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const bazaPodataka = require("./pomoćniModuli/radSBazomPodataka.js");
const komunikacija = require("./pomoćniModuli/elektronskaKomunikacija.js");


const application = express();


application.use(express.static("public"));
application.use(bodyParser.json());
application.use(session({
  "secret": "tajniKodKojimSePotpisujeKolačić",
  "saveUninitialized": false,
  "resave": false
}));


// POMOĆNE FUNKCIJE

const obradiPostojanjeSesije = (request, response) => {
  if (request.session.korisničkoIme) {
    response.setHeader("Content-Type", "application/json");
    response.status(403);
    response.send(JSON.stringify({ "poruka": "Postoji aktivna sesija za korisnički račun!" }));
    return true;
  }
  return false;
}

const kreirajSadržajEmaila = (sigurnosniKod) => {
  return ` Poštovani,
  
  Pokrenuli ste akciju promjene lozinke na Vašem NuThyro korisničkom računu. Ispod se nalazi sugurnosni kod koji Vam je za istu neophodan.
  Sigurnosni kod: ${sigurnosniKod}
  
  NuThyro`;
}


// RUTE

// URL: http://localhost:3000/registracija
// TIJELO ZAHTJEVA: { email: *, korisničkoIme: *, lozinka: * }
// ODGOVOR: { email: true/false, korisničkoIme: true/false, lozinka: true/false }
//
// Nije dozvoljeno vršiti registraciju korisniku koji je već prijavljen na neki korisnički račun.
application.post("/registracija", (request, response) => {
  if (obradiPostojanjeSesije(request, response))
    return;
  bazaPodataka.kreirajKorisničkiRačun(request.body)
    .then((validacijaPodataka) => {
      response.setHeader("Content-Type", "application/json");
      response.status(validacijaPodataka.email && validacijaPodataka.korisničkoIme && validacijaPodataka.lozinka ? 200 : 400);
      response.send(JSON.stringify(validacijaPodataka));
    });
});

// URL: http://localhost:3000/prijava
// TIJELO ZAHTJEVA: { korisničkoIme: *, lozinka: * }
// ODGOVOR: { korisničkoIme: true/false, lozinka: true/false }
//
// Ako za korisnika postoji aktivna sesija, onda će prijava (na isti ili neki drugi korisnički račun) biti onemogućena!  
application.post("/prijava", (request, response) => {
  if (obradiPostojanjeSesije(request, response))
    return;
  bazaPodataka.izvršiPrijavuNaKorisničkiRačun(request.body)
    .then((validacijaPodataka) => {
      const validno = validacijaPodataka.korisničkoIme && validacijaPodataka.lozinka;
      if (validno)
        request.session.korisničkoIme = request.body.korisničkoIme
      response.setHeader("Content-Type", "application/json");
      response.status(validno ? 200 : 401);
      response.send(JSON.stringify(validacijaPodataka));
    });
});

// URL: http://localhost:3000/provjeraPrijave
// TIJELO ZAHTJEVA: /
// ODGOVOR: { poruka: "Korisnik je prijavljen na svoj korisnički račun!"/"Korisnik nije prijavljen na korisnički račun!" }
application.get("/provjeraPrijave", (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.status(request.session.korisničkoIme ? 200 : 401);
  response.send(JSON.stringify({ 
    "poruka": request.session.korisničkoIme ? 
              "Korisnik je prijavljen na svoj korisnički račun!" : 
              "Korisnik nije prijavljen na korisnički račun!" 
  }));
});

// URL: http://localhost:3000/odjava
// TIJELO ZAHTJEVA: /
// ODGOVOR: { poruka: "Uspješna odjava!"/"Korisnik nije bio ni prijavljen!" }  
application.post("/odjava", (request, response) => {
  if (request.session.korisničkoIme) {
    request.session.destroy();
    response.setHeader("Content-Type", "application/json");
    response.status(200);
    response.send(JSON.stringify({ "poruka": "Uspješna odjava!" }));
    return;
  }
  response.setHeader("Content-Type", "application/json");
  response.status(400);
  response.send(JSON.stringify({ "poruka": "Korisnik nije bio ni prijavljen!" }));
});

// URL: http://localhost:3000/promjenaLozinke?
// TIJELO ZAHTJEVA: { email: * }
// ODGOVOR: { email: null/email }
application.post("/promjenaLozinke", (request, response) => {
  if (obradiPostojanjeSesije(request, response))
    return;
  response.setHeader("Content-Type", "application/json");
  bazaPodataka.kreirajSigurnosniToken(request.body.email)
    .then((rezultat) => {
        if (rezultat.email) {
          komunikacija.pošaljiEmail(rezultat.email, "NuThyro | Promjena Lozinka", kreirajSadržajEmaila(rezultat.token))
            .then(() => {
              response.status(rezultat.email !== null ? 200 : 401);
              response.send(JSON.stringify(rezultat));
            });
        }
    });
});


application.listen(3000, (greška) => {
  if (greška)
    console.log("Greška prilikom pokretanja servera!");
  else 
    console.log("Server osluškuje na portu 3000...");
});