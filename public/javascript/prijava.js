// KONTROLE KORISNIČKOG INTERFEJSA

const potvrdaPrijave = document.getElementById("prijavaDugme");
const unosKorisničkogImena = document.getElementById("korisničkoIme");
const unosLozinke = document.querySelector("input[type=password]");
const registracija = document.getElementById("registracijaDugme");
const upravljačZahtjevima = UpravljačZahtjevima;


// FUNKCIJE ZA OBRADU KORISNIČKIH RADNJI

window.onload = () => {
  // Ovdje će postojati provjera da li je korisnik već prijavljen (tj. da li postoji aktivna sesija za istog).
  // U slučaju da je već prijavljen preusmjeravat će se na početnu stranicu. 
}

const dajKorisničkoIme = () => {
  return unosKorisničkogImena.value;
}

const dajLozinku = () => {
  return unosLozinke.value;
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
const obradiValidacijuPodataka = (greška, sadržaj) => {
  sadržaj = JSON.parse(sadržaj);
  if (obradiValidacijuPolja(unosKorisničkogImena, sadržaj.korisničkoIme)) {
    if (!obradiValidacijuPolja(unosLozinke, sadržaj.lozinka))
      return;
  } else
      return;
  location.href = "glavna.html";
}

potvrdaPrijave.addEventListener("click", () => {
  upravljačZahtjevima.uputiZahtjevZaPrijavu(dajKorisničkoIme(), dajLozinku(), obradiValidacijuPodataka);
});

registracija.addEventListener("click", () => {
  location.href = "registracija.html";
});

[unosKorisničkogImena, unosLozinke].forEach(poljeZaUnos => {
  poljeZaUnos.addEventListener("focus", () => {
    poljeZaUnos.classList.remove("neispravanUnos");
  });
});