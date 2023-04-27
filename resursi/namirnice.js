const fs = require("fs");

const ikoneNamirnica = fs.readdirSync("./ikoneNamirnica");

const naziviNamirnica = ikoneNamirnica.map(nazivDatoteke => {
  let bezEkstenzije = nazivDatoteke.split(".")[0];
  let dijeloviRiječi = bezEkstenzije.split(/(?=[A-Z])/);
  let naziv = dijeloviRiječi.map(dio => dio.toLocaleLowerCase()).join(" ");
  return naziv.charAt(0).toUpperCase() + naziv.slice(1);
});

const slikeZaBazu = ikoneNamirnica.map(ikona => {
  const sadržajSlike = fs.readFileSync(`./ikoneNamirnica/${ikona}`);
  return new Blob([sadržajSlike], { "type": 'image/png' });
});

// Imaš nazive namirnica i slike kao blob varijable, sada ih trebaš pohraniti u bazu!