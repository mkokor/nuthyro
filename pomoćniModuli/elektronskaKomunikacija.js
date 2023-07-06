// Ovaj modul trenutno radi sa samo jednom pošiljateljskom email adresom.
// To je i dovoljno s obzirom da samo organizacija šalje email poruke
// prilikom promjene lozinke.


const nodemailer = require("nodemailer");

require("dotenv").config();


const kreirajTransportera = () => {
  return nodemailer.createTransport({
    "host": "smtp.gmail.com",
    "auth": {
      "user": process.env.APPLICATION_EMAIL,
      "pass": process.env.APPLICATION_EMAIL_APP_PASSWORD
    }
  });
}

const pošaljiEmail = (primatelj, naslov, sadržaj) => {
  return new Promise((resolve, reject) => {
    kreirajTransportera().sendMail({
      "from": "matijakokorr@gmail.com",
      "to": primatelj,
      "subject": naslov,
      "text": sadržaj
    })
      .then(() => {
        resolve("Email poruka uspješno poslana!");
      })
      .catch((poruka) => {
        console.log(poruka);
        reject("Greška prilikom slanja email poruke!");
      });
  });
}


module.exports = {
  "pošaljiEmail": pošaljiEmail 
}