// KONTROLE KORISNIČKOG INTERFEJSA I VARIJABLE

const unosEmaila = document.getElementById("email");
const unosKorisničkogImena = document.getElementById("korisničkoIme");
const unosLozinke = document.querySelector("input[type=password]");
const registracija = document.getElementById("registracijaDugme");

const upravljačZahtjevima = UpravljačZahtjevima;

// FUNKCIJE ZA OBRADU JEDNOSTAVNIH KORISNIČKIH RADNJI

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
const obradiValidacijuPodataka = (greška, sadržaj) => {
  sadržaj = JSON.parse(sadržaj);
  obradiValidacijuPolja(unosEmaila, sadržaj.email);
  obradiValidacijuPolja(unosKorisničkogImena, sadržaj.korisničkoIme);
  obradiValidacijuPolja(unosLozinke, sadržaj.lozinka);
  if (sadržaj.email && sadržaj.korisničkoIme && sadržaj.lozinka) {
    location.href = "/html/prijava.html"; // Ukoliko je registracija uspješna, korisnika preusmjeravamo na prijavu (na svoj novokreirani korisnički račun).
    return;
  }  
}

// Nakon unosa podataka za registraciju, podaci se validiraju na serveru, a rezultat validacije se obrađuje u funkciji "obradiValidacijuPodataka"!
registracija.addEventListener("click", () => {
  upravljačZahtjevima.uputiZahtjevZaRegistraciju(dajEmail(), dajKorisničkoIme(), dajLozinku(), obradiValidacijuPodataka);
});

// Uklanjanje oznake pogrešnog unosa, ukoliko korisnik ponovno krene unositi tekst u polje!
[unosKorisničkogImena, unosLozinke, unosEmaila].forEach(poljeZaUnos => {
  poljeZaUnos.addEventListener("focus", () => {
    poljeZaUnos.classList.remove("neispravanUnos");
  });
});