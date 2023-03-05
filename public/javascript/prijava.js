// KONTROLE KORISNIČKOG INTERFEJSA

const potvrdaPrijave = document.getElementById("prijavaDugme");
const unosKorisničkogImena = document.getElementById("korisničkoIme");
const unosLozinke = document.querySelector("input[type=password]");
const registracija = document.getElementById("registracijaDugme");


// FUNKCIJE ZA OBRADU JEDNOSTAVNIH KORISNIČKIH RADNJI

const dajKorisničkoIme = () => {
  return unosKorisničkogImena.value;
}

const dajLozinku = () => {
  return unosLozinke.value;
} 

const validirajPrijavu = () => {
  // Prava validacija će se vršiti slanjem HTTP zahtjeva!
  return {
    "korisničkoIme": dajKorisničkoIme() != "",
    "lozinka": dajLozinku() != ""
  };
}

const obradiValidaciju = (poljeZaUnos, validanUnos) => {
  if (!validanUnos) {
    poljeZaUnos.classList.add("neispravanUnos");
    return false;
  }
  poljeZaUnos.classList.remove("neispravanUnos");
  return true;
}

registracija.addEventListener("click", () => {
  location.href = "registracija.html";
});

potvrdaPrijave.addEventListener("click", () => {
  const validacijaUnosa = validirajPrijavu();
  if (obradiValidaciju(unosKorisničkogImena, validacijaUnosa.korisničkoIme)) {
    if (!obradiValidaciju(unosLozinke, validacijaUnosa.lozinka))
      return;
  } else
      return;
  location.href = "glavna.html";
});

[unosKorisničkogImena, unosLozinke].forEach(poljeZaUnos => {
  poljeZaUnos.addEventListener("focus", () => {
    poljeZaUnos.classList.remove("neispravanUnos");
  });
});