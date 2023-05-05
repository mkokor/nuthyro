const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const bazaPodataka = require("./pomoćniModuli/radSBazomPodataka.js");
const komunikacija = require("./pomoćniModuli/elektronskaKomunikacija.js");


const application = express();


application.use(express.static("public"));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ "extended": true }));
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
    response.send(JSON.stringify({ 
      "poruka": "Postoji aktivna sesija",
      "prijavljeniKorisnik": request.session.korisničkoIme 
    }));
    return true;
  }
  return false;
}

const obradiNepostojanjeSesije = (request, response) => {
  if (!request.session.korisničkoIme) {
    response.setHeader("Content-Type", "application/json");
    response.status(401);
    response.send(JSON.stringify({ "poruka": "Korisnik nije prijavljen na korisnički račun!" }));
    return true;
  } 
  return false;
}

const kreirajSadržajEmaila = (sigurnosniKod) => {
  return `Poštovani,
  
Pokrenuli ste akciju promjene lozinke na Vašem NuThyro korisničkom računu. Ispod se nalazi sigurnosni kod koji Vam je za istu neophodan.
Sigurnosni kod: ${sigurnosniKod}
  
NuThyro`;
}

const sumirajNutritivnuVrijednost = (namirnice, nazivNutritivneVrijednosti) => {
  return namirnice.map(element => element[nazivNutritivneVrijednosti]).reduce((vrijednost, suma) => suma = suma + vrijednost, 0);
} 

const sumirajNutritivneVrijednosti = (namirnice) => {
  return {
    "naziv": "TOTAL",
    "energija": sumirajNutritivnuVrijednost(namirnice, "energija"),
    "proteini": sumirajNutritivnuVrijednost(namirnice, "proteini"),
    "masti": sumirajNutritivnuVrijednost(namirnice, "masti"),
    "ugljikohidrati": sumirajNutritivnuVrijednost(namirnice, "ugljikohidrati"),
    "vitaminA": sumirajNutritivnuVrijednost(namirnice, "vitaminA"),
    "vitaminE": sumirajNutritivnuVrijednost(namirnice, "vitaminE"),
    "vitaminD": sumirajNutritivnuVrijednost(namirnice, "vitaminD"),
    "vitaminC": sumirajNutritivnuVrijednost(namirnice, "vitaminC"),
    "željezo": sumirajNutritivnuVrijednost(namirnice, "željezo"),
    "magnezij": sumirajNutritivnuVrijednost(namirnice, "magnezij"),
    "cink": sumirajNutritivnuVrijednost(namirnice, "cink"),
    "bakar": sumirajNutritivnuVrijednost(namirnice, "bakar"),
    "selen": sumirajNutritivnuVrijednost(namirnice, "selen"),
    "gramaža": sumirajNutritivnuVrijednost(namirnice, "gramaža")
  }
}

const sumirajDuplikate = (namirnice) => {
  const jedinstveniElementi = [];
  for (let i = 0; i < namirnice.length; i++)
    if (jedinstveniElementi.filter(element => element.id == namirnice[i].id).length == 0)
      jedinstveniElementi.push({...namirnice[i]});
  jedinstveniElementi.forEach(jedinstveniElement => {
    duplikatiJedinstvenogElementa = namirnice.filter(element => element.id == jedinstveniElement.id);
    const sumiraneVrijednostiJedinstvenogElementa = sumirajNutritivneVrijednosti(duplikatiJedinstvenogElementa);
    jedinstveniElement.energija = sumiraneVrijednostiJedinstvenogElementa.energija;
    jedinstveniElement.proteini = sumiraneVrijednostiJedinstvenogElementa.proteini;
    jedinstveniElement.masti = sumiraneVrijednostiJedinstvenogElementa.masti;
    jedinstveniElement.ugljikohidrati = sumiraneVrijednostiJedinstvenogElementa.ugljikohidrati;
    jedinstveniElement.vitaminA = sumiraneVrijednostiJedinstvenogElementa.vitaminA;
    jedinstveniElement.vitaminE = sumiraneVrijednostiJedinstvenogElementa.vitaminE;
    jedinstveniElement.vitaminD = sumiraneVrijednostiJedinstvenogElementa.vitaminD;
    jedinstveniElement.vitaminC = sumiraneVrijednostiJedinstvenogElementa.vitaminC;
    jedinstveniElement.željezo = sumiraneVrijednostiJedinstvenogElementa.željezo;
    jedinstveniElement.magnezij = sumiraneVrijednostiJedinstvenogElementa.magnezij;
    jedinstveniElement.cink = sumiraneVrijednostiJedinstvenogElementa.cink;
    jedinstveniElement.bakar = sumiraneVrijednostiJedinstvenogElementa.bakar;
    jedinstveniElement.selen = sumiraneVrijednostiJedinstvenogElementa.selen;
    jedinstveniElement.gramaža = duplikatiJedinstvenogElementa.map(element => element.gramaža).reduce((vrijednost, suma) => suma = suma + vrijednost, 0);
    delete jedinstveniElement.referentnaMasa;
  });
  return jedinstveniElementi;
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

// URL: http://localhost:3000/kreiranjeSigurnosnogTokena
// TIJELO ZAHTJEVA: { email: * }
// ODGOVOR: { email: null/email }
application.post("/kreiranjeSigurnosnogTokena", (request, response) => {
  if (obradiPostojanjeSesije(request, response))
    return;
  response.setHeader("Content-Type", "application/json");
  bazaPodataka.kreirajSigurnosniToken(request.body.email)
    .then((rezultat) => {
        if (rezultat.email)
          komunikacija.pošaljiEmail(rezultat.email, "NuThyro | Promjena Lozinka", kreirajSadržajEmaila(rezultat.token))
            .then(() => {
              response.status(200);
              response.send(JSON.stringify({ "email": rezultat.email }));
            });
        else {
          response.status(401);
          response.send(JSON.stringify({ "email": null }));
        }
    });
});

// URL: http://localhost:3000/provjeraSigurnosnogKoda
// TIJELO ZAHTJEVA: { email: *, sigurnosniKod: * }
// ODGOVOR: { sigurnosnKod: null/sigurnosniKod }
application.post("/potvrdaSigurnosnogKoda", (request, response) => {
  if (obradiPostojanjeSesije(request, response))
    return;
  bazaPodataka.provjeriSigurnosniToken(request.body.email, request.body.sigurnosniKod)
    .then((rezultat) => {
      response.setHeader("Content-Type", "application/json");
      response.status(rezultat.email ? 200 : 400);
      response.send(JSON.stringify({ "sigurnosniKod": rezultat.token ? request.body.sigurnosniKod : null }));
    });
});

// URL: http://localhost:3000/promjenaLozinke
// TIJELO ZAHTJEVA: { email: *, sigurnosniKod: *, novaLozinka: * }
// ODGOVOR: { poruka: "Lozinka uspješno promijenjena!"/"Nevalidni podaci!" }
application.post("/promjenaLozinke", (request, response) => {
  if (obradiPostojanjeSesije(request, response))
    return;
  bazaPodataka.promijeniLozinkuZaKorisničkiRačun(request.body.email, request.body.sigurnosniKod, request.body.novaLozinka)
    .then((rezultat) => {
      const validacija = rezultat.email && rezultat.token && rezultat.novaLozinka;
      response.setHeader("Content-Type", "application/json");
      response.status(validacija ? 200 : 401);
      response.send(JSON.stringify({ "poruka": validacija ? "Lozinka uspješno promijenjena!" : "Nevalidni podaci!" }));
    });
});

// URL: http://localhost:3000/tipoviDnevneAktivnosti
// TIJELO ZAHTJEVA: /
// ODGOVOR: { tipoviAktivnosti: * }
application.get("/tipoviDnevneAktivnosti", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  bazaPodataka.dajSveTipoveAktivnosti()
    .then((tipoviAktivnosti) => {
      response.setHeader("Content-Type", "application/json");
      response.status(200);
      response.send(JSON.stringify({ "tipoviAktivnosti": tipoviAktivnosti  }));
    });
});

// URL: http://localhost:3000/dodavanjeEnergetskihVrijednosti
// TIJELO ZAHTJEVA: { bmr: *, tdee: *, bmi }
// ODGOVOR: { poruka: "Korisnik nije prijavljen na korisnički račun!"/"Uspješno dodane energetske vrijednosti za korisnika!" }
application.post("/dodavanjeEnergetskihVrijednosti", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  bazaPodataka.dodajEnergetskeVrijednostiZaKorisnika(request.session.korisničkoIme, request.body.bmr, request.body.tdee, request.body.bmi)
    .then(() => {
      response.setHeader("Content-Type", "application/json");
      response.status(200);
      response.send(JSON.stringify({ "poruka": "Uspješno dodane energetske vrijednosti za korisnika!" }));
    });
});

// URL: http://localhost:3000/energertskeVrijednostiZaKorisnika
// TIJELO ZAHTJEVA: /
// ODGOVOR: { bmr: *, tdee: * } / { poruka: "Korisnik nije prijavljen na korisnički račun!" } / { poruka: "Korisnik još uvijek nije popunio formu!" }
application.get("/energetskeVrijednostiZaKorisnika", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  response.setHeader("Content-Type", "application/json");
  bazaPodataka.dajEnergetskeVrijednostiZaKorisnika(request.session.korisničkoIme)
    .then((rezultat) => {
      if (!rezultat.bmr) {
        response.status(404);
        response.send(JSON.stringify({ "poruka": "Korisnik još uvijek nije popunio formu!" }));
        return;
      }
      response.status(200);
      response.send(JSON.stringify({ "bmr": rezultat.bmr, "tdee": rezultat.tdee, "bmi": rezultat.bmi }));
    });
});

// URL: http://localhost:3000/dostupneNamirnice
// TIJELO ZAHTJEVA: /
// ODGOVOR: [ {...namirnica...}, {...namirnica...},... ] / { poruka: "Korisnik nije prijavljen na korisnički račun!" }
application.get("/dostupneNamirnice", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  response.setHeader("Content-Type", "application/json");
  bazaPodataka.dajDostupneNamirnice()
    .then(rezultat => {
      rezultat.forEach(namirnica => { delete namirnica.dataValues.ikona; }); // Ne vraća se zapis ikone (to radi odvojena ruta)!
      response.status(200);
      response.send(JSON.stringify(rezultat));
    }); 
});

// URL: http://localhost:3000/ikonaNamirnice/{ID}
// TIJELO ZAHTJEVA: /
// ODGOVOR: { poruka: "Nevalidan format ID-a namirnice!" / "Namirnica sa datom ID vrijednosti ne postoji!" / "Korisnik nije prijavljen na korisnički račun!" } / slika.png
application.get(/\/ikonaNamirnice\/[1-9]\d*/, (request, response) => {
  if(obradiNepostojanjeSesije(request, response))
    return;
  const id = parseInt(request.url.toString().split("/").reverse()[0]);
  if (isNaN(id)) {
    response.setHeader("Content-Type", "application/json");
    response.status(400);
    response.send(JSON.stringify({ "poruka": "Nevalidan format ID-a namirnice!" }));
  }
  bazaPodataka.dajIkonuNamirnice(id)
    .then((rezultat) => {
      if (rezultat === null) {
        response.setHeader("Content-Type", "application/json");
        response.status(404);
        response.send(JSON.stringify({ "poruka": "Namirnica sa datom ID vrijednosti ne postoji!" }));
        return;
      }
      response.setHeader("Content-Type", "image/png");
      const bufferSlike = Buffer.from(rezultat, "binary");
      response.setHeader("Content-Length", bufferSlike.length);
      response.send(Buffer.from(rezultat, "binary"));
    });
});

// URL: http://localhost:3000/dodajNamirnicuNaSpisak
// TIJELO ZAHTJEVA: { namirnica }
// ODGOVOR: { poruka: "Namirnica uspješno dodana!" / "Korisnik nije prijavljen na korisnički računa!" }
application.post("/dodajNamirnicuNaSpisak", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
    response.setHeader("Content-Type", "application/json");
  bazaPodataka.postojiLiNamirnica(request.body.namirnica)
    .then((rezultat) => {
      if (!rezultat.namirnica) {
        response.status(400);
        response.send(JSON.stringify({ "poruka": "Nepostojeća namirnica!" }));
        return;
      }
      if (request.session.spisakNamirnica === undefined)
        request.session.spisakNamirnica = [request.body.namirnica];
      else
        request.session.spisakNamirnica.push(request.body.namirnica);
      response.status(200);
      response.send(JSON.stringify({ "poruka": "Namirnica uspješno dodana!" }));
    });
});

// URL: http://localhost:3000/ukloniNamirnicuSaSpiska/{id}
// TIJELO ZAHTJEVA: /
// ODGOVOR: { poruka: "Korisnik nije prijavljen na korisnički računa!" / "Namirnica nije ni bila na spisku!" } / [namirnice]
application.post("/ukloniNamirnicuSaSpiska", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  response.setHeader("Content-Type", "application/json");
  if (request.session.spisakNamirnica === undefined || request.session.spisakNamirnica.filter(element => element.id == request.body.id && element.gramaža == request.body.gramaža).length == 0) {
    response.status(404);
    response.send(JSON.stringify({ "poruka": "Namirnica nije ni bila na spisku!" }));
    return;
  }
  const spisak = request.session.spisakNamirnica;
  request.session.spisakNamirnica = [...spisak.slice(0, spisak.findIndex(element => element.id == request.body.id && element.gramaža == request.body.gramaža)), ...spisak.slice(spisak.findIndex(element => element.id == request.body.id && element.gramaža == request.body.gramaža) + 1, spisak.length)];
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify(request.session.spisakNamirnica));
});

// URL: http://localhost:3000/dajSpisakNamirnica
// TIJELO ZAHTJEVA: /
// ODGOVOR: { poruka: "Korisnik nije prijavljen na korisnički račun!" } / [namirnice]
application.get("/dajSpisakNamirnica", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  const spisakNamirnica = request.session.spisakNamirnica === undefined ? [] : request.session.spisakNamirnica;
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify(spisakNamirnica));
});

application.get("/dajSumarneNutritivneVrijednosti", (request, response) => {
  if (obradiNepostojanjeSesije(request, response))
    return;
  response.setHeader("Content-Type", "application/json");
  const namirnice = request.session.spisakNamirnica;
  response.status(200);
  response.send(JSON.stringify({
    "pojedinačneVrijednosti": namirnice === undefined ? [] : sumirajDuplikate(namirnice),
    "sumarneVrijednosti": sumirajNutritivneVrijednosti(namirnice === undefined ? [] : namirnice) 
  }));
});

application.listen(3000, (greška) => {
  if (greška)
    console.log("Greška prilikom pokretanja servera!");
  else 
    console.log("Server osluškuje na portu 3000...");
});