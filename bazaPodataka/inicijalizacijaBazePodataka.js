const bazaPodataka = require("./konekcijaNaBazuPodataka.js");

bazaPodataka.konekcijaNaBazuPodataka.sync({ "force": true })
  .then(() => {
    console.log("\nOstvarena konekcija na bazu podataka!");
  })
  .catch(() => {
    console.log("\nNeuspješan pokušaj konektovanja na bazu podataka!");
  });