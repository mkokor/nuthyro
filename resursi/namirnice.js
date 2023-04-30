const fs = require("fs");
const path = require("path");

const ikoneNamirnica = fs.readdirSync(path.join(__dirname, "../resursi/ikoneNamirnica")); // Obratiti pažnju na putanju jer se gleda u odnosu na skriptu koja je pozvala ovu skriptu.

const informacijeONamirnicama = JSON.parse(fs.readFileSync(path.join(__dirname, "./namirnice.json")));

const slikeZaBazu = ikoneNamirnica.map(ikona => {
  const sadržajSlike = fs.readFileSync(path.join(__dirname, `../resursi/ikoneNamirnica/${ikona}`));
  return sadržajSlike;
});

module.exports = informacijeONamirnicama.map((namirnica, indeks) => {
 return { ...namirnica, "ikona": slikeZaBazu[indeks] };
});