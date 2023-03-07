// KONTROLE KORISNIČKOG INTERFEJSA

const potvrdaUnosa = document.getElementById("potvrdaUnosa");
const unosEmaila = document.getElementById("email");
const upravljačZahtjevima = UpravljačZahtjevima;


// FUNKCIJE ZA OBRADU KORISNIČKIH RADNJI

const dajEmail = () => {
  return unosEmaila.value;
}

const obradiValidacijuPolja = (poljeZaUnos, validanUnos) => {
  if (!validanUnos) {
    poljeZaUnos.classList.add("neispravanUnos");
    return false;
  }
  poljeZaUnos.classList.remove("neispravanUnos");
  return true;
}

// U ovom slučaju, "greška" se ne koristi jer se u odgovoru na konkretno ovaj zahtjev kriju svi potrebni podaci za njegovu obradu
// (tj. u ovom slučaju se na osnovu sadržaja odgovora može lako saznati da li je došlo do greške pa je ta prednost iskorištena).
const obradiValidacijuEmaila = (greška, sadržaj) => {
  sadržaj = JSON.parse(sadržaj);
  if (obradiValidacijuPolja(unosEmaila, sadržaj.email))
    console.log("Kod Vam je poslan na email adresu!");
  return;
}

potvrdaUnosa.addEventListener("click", () => {
  upravljačZahtjevima.uputiZahtjevZaValidacijuEmaila(dajEmail(), obradiValidacijuEmaila);
});

unosEmaila.addEventListener("focus", () => {
    poljeZaUnos.classList.remove("neispravanUnos");
});

