const express = require("express");
const bodyParser = require("body-parser");


const application = express();


application.use(express.static("public"));
application.use(bodyParser.json());


// RUTE

application.post("/registracija", (request, response) => {
  console.log(request.body);
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify({
    "email": true,
    "korisničkoIme": true,
    "lozinka": true
  }));
});


application.listen(3000, (greška) => {
  if (greška)
    console.log("Greška prilikom pokretanja servera!");
  else 
    console.log("Server osluškuje na portu 3000...");
});