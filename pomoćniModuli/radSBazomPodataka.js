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
            bazaPodataka.SigurnosniToken.findOrCreate({
              "where": { "idKorisnika": korisničkiRačun.id },
              "defaults": { "token": sigurnosniToken }
            })
            .then(([zapis, nijePostojao]) => {
              if (!nijePostojao) {
                zapis.token = sigurnosniToken;
                zapis.save()
                  .then(() => {
                    resolve({ "email": email, "token": sigurnosniToken });
                  })
                  .catch(() => {
                    reject("Greška u pristupu bazi podataka!");
                  });
                return;
              }
              resolve({ "email": email, "token": sigurnosniToken });
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

const provjeriSigurnosniToken = (email, sigurnosniToken) => {
  return new Promise((resolve, reject) => {
    bazaPodataka.KorisničkiRačun.findOne({ "where": { "email": email } })
      .then(korisničkiRačun => {
        if (!korisničkiRačun) {
          resolve({ "email": false, "token": false });
          return;
        }
        bazaPodataka.SigurnosniToken.findOne({ "where": { "idKorisnika": korisničkiRačun.id, "token": sigurnosniToken } })
          .then(tokenIzBaze => {
            resolve({ "email": true, "token": tokenIzBaze ? true : false});
          })
          .catch(() => {
            reject("Greška u pristupu bazi podataka!");
          });
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

const promijeniLozinkuZaKorisničkiRačun = (email, sigurnosniKod, novaLozinka) => {
  return new Promise((resolve, reject) => {
    postojiLiKorisničkiRačun("email", email)
      .then((korisničkiRačun) => {
        if (!korisničkiRačun) {
          resolve({ "email": false });
          return;
        }
        bazaPodataka.SigurnosniToken.findOne({ "where": { "idKorisnika": korisničkiRačun.id, "token": sigurnosniKod } })
          .then(tokenIzBaze => {
            if (!tokenIzBaze) {
              resolve({ "email": true, "token": false });
              return;
            }
            if (novaLozinka !== "") {
              sigurnost.enkriptujPodatak(novaLozinka)
                .then((kodLozinke) => {
                  korisničkiRačun.kodLozinke = kodLozinke;
                  korisničkiRačun.save()
                    .then(() => {
                      tokenIzBaze.destroy()
                        .then(() => {
                          resolve({ "email": true, "token": true, "novaLozinka": true });
                        })
                        .catch(() => {
                          reject("Greška u pristupu bazi podataka!");
                        });
                    })
                    .catch(() => {
                      reject("Greška u pristupu bazi podataka!");
                    });
                });
            } else 
              resolve({ "email": true, "token": true, "novaLozinka": false });
          })
          .catch(() => {
            reject("Greška u pristupu bazi podataka!");
          });
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

const dajSveTipoveAktivnosti = () => {
  return new Promise((resolve, reject) => {
    bazaPodataka.DnevnaAktivnost.findAll()
      .then((sviTipoviAktivnosti) => {
        resolve(sviTipoviAktivnosti);
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

const dodajEnergetskeVrijednostiZaKorisnika = (korisničkoIme, bmr, tdee, bmi) => {
  return new Promise((resolve, reject) => {
    bazaPodataka.KorisničkiRačun.findOne({ "where": { "korisničkoIme": korisničkoIme } })
      .then((rezultat) => {
        if (!rezultat) {
          resolve({ "korisničkoIme": false });
          return;
        }
        bazaPodataka.EnergetskaVrijednost.findOrCreate({
              "where": { "idKorisnika": rezultat.id },
              "defaults": { "bmr": bmr, "tdee": tdee, "bmi": bmi }
        })
        .then(([zapis, nijePostojao]) => {
          if (!nijePostojao) {
            zapis.bmr = bmr;
            zapis.tdee = tdee;
            zapis.bmi = bmi;
            zapis.save()
              .then(() => {
                resolve({ "korisničkoIme": true });
              })
              .catch(() => {
                reject("Greška u pristupu bazi podataka!");
              });
              return;
          }
          resolve({ "korisničkoIme": true });
        })
        .catch(() => {
          reject("Greška u pristupu bazi podataka!");
        });
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}

const dajEnergetskeVrijednostiZaKorisnika = (korisničkoIme) => {
  return new Promise((resolve, reject) => {
    postojiLiKorisničkiRačun("korisničkoIme", korisničkoIme)
      .then((rezultat) => {
        if (!rezultat) {
          resolve({ "korisničkoIme": false });
          return;
        }
        bazaPodataka.EnergetskaVrijednost.findOne({ "where": { "idKorisnika": rezultat.id } })
          .then((rezultat) => {
            if (!rezultat) {
              resolve({ "korisničkoIme": true, "bmr": null, "tdee": null, "bmi": null });
              return;
            }
            resolve({ "korisničkoIme": true, "bmr": rezultat.bmr, "tdee": rezultat.tdee, "bmi": rezultat.bmi });
          })
          .catch(() => {
            reject("Greška pri pristupu bazi podataka!");
          })
      })
      .catch(() => {
        reject("Greška pri pristupu bazi podataka!");
      });
  });
}

const dajDostupneNamirnice = () => {
  return new Promise((resolve, reject) => {
    bazaPodataka.Namirnica.findAll()
      .then(rezultat => {
        resolve(rezultat);
      })
      .catch(() => {
        reject("Greška pri pristupu bazi podataka!");
      });
  });  
}

const dajIkonuNamirnice = (id) => {
  return new Promise((resolve, reject) => {
    bazaPodataka.Namirnica.findOne({ "where": { "id": id }})
      .then((rezultat) => {
        resolve(rezultat.ikona);
      })
      .catch(() => {
        reject("Greška pri pristupu bazi podataka!");
      });
  });
}

const postojiLiNamirnica = (namirnica) => {
  return new Promise((resolve, reject) => {
    bazaPodataka.Namirnica.findOne({ "where": {
      "id": namirnica.id,
      "naziv": namirnica.naziv,
      "referentnaMasa": namirnica.referentnaMasa,
      "energija": namirnica.energija,
      "proteini": namirnica.proteini,
      "masti": namirnica.masti,
      "ugljikohidrati": namirnica.ugljikohidrati,
      "vitaminA": namirnica.vitaminA,
      "vitaminE": namirnica.vitaminE,
      "vitaminD": namirnica.vitaminD,
      "vitaminC": namirnica.vitaminC,
      "željezo": namirnica.željezo,
      "magnezij": namirnica.magnezij,
      "cink": namirnica.cink,
      "bakar": namirnica.bakar,
      "selen": namirnica.selen
    }})
      .then((rezultat) => {
        if (rezultat)
          resolve({ "namirnica": true });
        else
          resolve({ "namirnica": false })
      })
      .catch(() => {
        reject("Greška u pristupu bazi podataka!");
      });
  });
}


module.exports = {
  "postojiLiKorisničkiRačun": postojiLiKorisničkiRačun,
  "kreirajKorisničkiRačun": kreirajKorisničkiRačun,
  "izvršiPrijavuNaKorisničkiRačun": izvršiPrijavuNaKorisničkiRačun,
  "kreirajSigurnosniToken": kreirajSigurnosniToken,
  "provjeriSigurnosniToken": provjeriSigurnosniToken,
  "promijeniLozinkuZaKorisničkiRačun": promijeniLozinkuZaKorisničkiRačun,
  "dajSveTipoveAktivnosti": dajSveTipoveAktivnosti,
  "dodajEnergetskeVrijednostiZaKorisnika": dodajEnergetskeVrijednostiZaKorisnika,
  "dajEnergetskeVrijednostiZaKorisnika": dajEnergetskeVrijednostiZaKorisnika,
  "dajDostupneNamirnice": dajDostupneNamirnice,
  "dajIkonuNamirnice": dajIkonuNamirnice,
  "postojiLiNamirnica": postojiLiNamirnica
}