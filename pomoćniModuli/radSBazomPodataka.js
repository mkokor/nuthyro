// Ovaj modul implementira (i eksportuje) sve funkcije koje služe za rad sa bazom podataka.
// Razlog za njegovo postojanje je da se u datoteci "index.js" (tj. serverskoj datoteci) ne
// ne bi gomilalo mnogo programskih jedinica raznovrsne prirode.

const bazaPodataka = require("../bazaPodataka/inicijalizacijaBazePodataka.js");
const sigurnost = require("./sigurnostPodataka.js");


// POMOĆNE FUNKCIJE

const validirajEmail = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

const validirajRegistracijskePodatke = (registracijskiPodaci) => {
  return new Promise((resolve, reject) => {
    let validacija = [];
    validacija.push(postojiLiKorisničkiRačun("email", registracijskiPodaci.email));
    validacija.push(postojiLiKorisničkiRačun("korisničkoIme", registracijskiPodaci.korisničkoIme));
    Promise.all(validacija) // Prvi element niza je rezultat validacije email-a, a drugi korisničkog imena.
      .then((rezultat) => {
        resolve({
          "email": rezultat[0] === null && validirajEmail(registracijskiPodaci.email),
          "korisničkoIme": rezultat[1] === null && registracijskiPodaci.korisničkoIme != "",
          "lozinka": registracijskiPodaci.lozinka != ""
        });
      })
      .catch(() => {
        reject("Validacija nije uspjela!");
      });
  });
}


// GLAVNE FUNKCIJE

// Funkcija provjerava da li u bazi podataka postoji zapis koji u koloni pod nazivom 
// koji je sadržan u parametru "nazivAtributa", posjeduje vrijednost koja je sadržana 
// u parametru "vrijednostAtributa".
const postojiLiKorisničkiRačun = (nazivAtributa, vrijednostAtributa) => {
  return new Promise((resolve, reject) => {
    bazaPodataka.KorisničkiRačun.findOne({ "where": { [nazivAtributa]: vrijednostAtributa } })
      .then((korisničkiRačun) => {
        resolve(korisničkiRačun !== null ? korisničkiRačun : null);
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

// Funkcija u slučaju da su podaci korektni kreira korisnički račun, a u suprotnom ne.
// U oba slučaja kao rezultat uspješnog izvršavanja vraća Promise objekat koji nosi
// informaciju o validaciji svakog od podataka.
const kreirajKorisničkiRačun = (podaci) => {
  return new Promise((resolve, reject) => {
    validirajRegistracijskePodatke(podaci)
      .then((rezultatValidacije) => {
        if (rezultatValidacije.email && rezultatValidacije.korisničkoIme && rezultatValidacije.lozinka)
          sigurnost.enkriptujPodatak(podaci.lozinka)
            .then((kodLozinke) => {
              bazaPodataka.KorisničkiRačun.create({ 
                "email": podaci.email, 
                "korisničkoIme": podaci.korisničkoIme, 
                "kodLozinke": kodLozinke
              })
              .then(() => {
                resolve(rezultatValidacije);
              })
              .catch(() => {
                reject("Greška u pristupu bazi podataka!");
              });
            })
            .catch(() => { 
              reject("Greška pri enkripciji!"); 
            });
        else 
          resolve(rezultatValidacije);
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}


// Funkcija u bazi podataka traži korisnički račun čiji podaci odgovaraju proslijeđenim,
// te vraća Promise koji nosi informaciju o validnosti proslijeđenih podataka.
const izvršiPrijavuNaKorisničkiRačun = (podaci) => {
  return new Promise((resolve, reject) => {
    postojiLiKorisničkiRačun("korisničkoIme", podaci.korisničkoIme)
      .then((korisničkiRačun) => {
        if (korisničkiRačun) {
          sigurnost.dekriptujPodatak(podaci.lozinka, korisničkiRačun.kodLozinke)
            .then((validnaLozinka) => {
              resolve({
                "korisničkoIme": korisničkiRačun === null ? false : true,
                "lozinka": korisničkiRačun === null ? false : validnaLozinka  
              });
            })
            .catch(() => {
              reject("Greška pri dekripciji!");
            });
        }
        else
          resolve({
            "korisničkoIme": false,
            "lozinka": false  
          });
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

const kreirajSigurnosniToken = (email) => {
  return new Promise((resolve, reject) => {
    postojiLiKorisničkiRačun("email", email)
      .then((korisničkiRačun) => {
        if (!korisničkiRačun) {
          resolve({ "email": null });
          return;
        }
        sigurnost.enkriptujPodatak(sigurnost.generišiRandomString())
          .then((sigurnosniToken) => {
            bazaPodataka.SigurnosniToken.create({ "token": sigurnosniToken, "idKorisnika": korisničkiRačun.id})
              .then(() => {
                resolve({ "email": email });
              })
              .catch(() => {
                reject("Greška u pristupu bazi podataka!");
              });
          })
          .catch(() => {
            reject("Greška pri kodiranju!");
          });
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}


module.exports = {
  postojiLiKorisničkiRačun: postojiLiKorisničkiRačun,
  kreirajKorisničkiRačun: kreirajKorisničkiRačun,
  izvršiPrijavuNaKorisničkiRačun: izvršiPrijavuNaKorisničkiRačun,
  kreirajSigurnosniToken: kreirajSigurnosniToken
}