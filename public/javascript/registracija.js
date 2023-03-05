// KONTROLE KORISNIČKOG INTERFEJSA

const unosEmaila = document.getElementById("email");
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

const dajEmail = () => {
  return unosEmaila.value;
}

const validirajRegistraciju = () => {
  // Validacija će se vršiti slanjem HTTP zahtjeva prema serveru!
  return {
    "email": true,//dajEmail().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    "korisničkoIme": dajKorisničkoIme() != "",
    "lozinka": dajLozinku() != ""
  }
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
  const validacijaUnosa = validirajRegistraciju();
  obradiValidaciju(unosEmaila, validacijaUnosa.email);
  obradiValidaciju(unosKorisničkogImena, validacijaUnosa.korisničkoIme);
  obradiValidaciju(unosLozinke, validacijaUnosa.lozinka);
  if (validacijaUnosa.email && validacijaUnosa.korisničkoIme && validacijaUnosa.lozinka) {
    location.href = "prijava.html";
    return;
  }
  return;
});