// Ovaj modul daje dvije funkcije, enkriptujPodatak i dekriptujPodatak. 
// Namjena funkcija je jasna, a koristit će se za zaštitu korisničkih
// lozinki.


const bcrypt = require("bcrypt");
const crypto = require("crypto");


// Parametar "podatak" je tekst (tj. string) koji se enkodira.
const enkriptujPodatak = (podatak) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(podatak, Math.round(Math.random() * 10))
      .then((enkriptovanPodatak) => {
        resolve(enkriptovanPodatak);
      })
      .catch(() => {
        reject("Greška prilikom heširanja!");
      });
  });
}

// Ova funkcija prima podatak ("plain text") i neki kod, te provjerava da li je taj kod zapravo
// enkriptovana verzija tog podatka,
const dekriptujPodatak = (podatak, enkriptovanPodatak) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(podatak, enkriptovanPodatak)
      .then((podudaranje) => {
        resolve(podudaranje);
      })
      .catch(() => {
        reject("Greška prilikom dekripcije!");
      });
  });
}

const generišiRandomString = () => {
  return crypto.randomBytes(20).toString("hex");
}


module.exports = {
  "enkriptujPodatak": enkriptujPodatak,
  "dekriptujPodatak": dekriptujPodatak,
  "generišiRandomString": generišiRandomString
}



