const fs = require("fs");
const path = require("path");

const ikoneNamirnica = fs.readdirSync(path.join(__dirname, "../resursi/ikoneNamirnica")); // Obratiti pažnju na putanju jer se gleda u odnosu na skriptu koja je pozvala ovu skriptu.

const naziviNamirnica = ikoneNamirnica.map(nazivDatoteke => {
  let bezEkstenzije = nazivDatoteke.split(".")[0];
  let dijeloviRiječi = bezEkstenzije.split(/(?=[A-Z])/);
  let naziv = dijeloviRiječi.map(dio => dio.toLocaleLowerCase()).join(" ");
  return naziv.charAt(0).toUpperCase() + naziv.slice(1);
});

const slikeZaBazu = ikoneNamirnica.map(ikona => {
  const sadržajSlike = fs.readFileSync(path.join(__dirname, `../resursi/ikoneNamirnica/${ikona}`));
  return sadržajSlike;
});

module.exports = naziviNamirnica.map((naziv, indeks) => {
 return { "naziv": naziv, "ikona": slikeZaBazu[indeks] };
});