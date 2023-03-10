// KONTROLE KORISNIČKOG INTERFEJSA I VARIJABLE

const potvrdaPrijave = document.getElementById("prijavaDugme");
const unosKorisničkogImena = document.getElementById("korisničkoIme");
const unosLozinke = document.querySelector("input[type=password]");
const registracija = document.getElementById("registracijaDugme");
const promjenaLozinke = document.getElementById("promjenaLozinke");

const upravljačZahtjevima = UpravljačZahtjevima;


// FUNKCIJE ZA OBRADU KORISNIČKIH RADNJI

window.onload = () => {
  upravljačZahtjevima.uputiZahtjevZaProvjeruPrijave((greška, sadržaj) => {
    if (!greška)
      location.href = "/html/glavna.html";
  });
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
  location.href = "/html/glavna.html";
}

potvrdaPrijave.addEventListener("click", () => {
  upravljačZahtjevima.uputiZahtjevZaPrijavu(dajKorisničkoIme(), dajLozinku(), obradiValidacijuPodataka);
});

registracija.addEventListener("click", () => {
  location.href = "/html/registracija.html";
});

promjenaLozinke.addEventListener("click", () => {
  location.href = "/html/promjenaLozinke.html";
})

unosKorisničkogImena.addEventListener("focus", () => {
  unosKorisničkogImena.classList.remove("neispravanUnos");
});

unosLozinke.addEventListener("focus", () => {
  unosLozinke.classList.remove("neispravanUnos");
});