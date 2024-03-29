// KONTROLE KORISNIČKOG INTERFEJSA I VARIJABLE

const potvrdaUnosa = document.getElementById("potvrdaUnosa");
const unosEmaila = document.getElementById("email");
const infoTekst = document.getElementById("infoTekst");
const sadržaj = document.getElementById("sadržaj");

const upravljačZahtjevima = UpravljačZahtjevima;
let email = null; // Kada email bude validan pohranit će se u ovu varijablu.
let sigurnosniKod = null; // Kada sigurnosni kod bude valida pohranit će se u ovu varijablu.


// FUNKCIJE ZA OBRADU KORISNIČKIH RADNJI

window.onload = () => {
  upravljačZahtjevima.uputiZahtjevZaProvjeruPrijave((greška, sadržaj) => {
    if (!greška)
      location.href = "/html/glavna.html";
  });
}

const dajEmail = () => {
  return unosEmaila.value;
}

const dajSigurnosniKod = () => {
  const unosKoda = document.getElementById("unosKoda");
  return unosKoda ? unosKoda.value : null;
}

const dajNovuLozinku = () => {
  const unosLozinke = document.getElementById("unosLozinke");
  return unosLozinke ? unosLozinke.value : null;
}

const obradiValidacijuPolja = (poljeZaUnos, validanUnos) => {
  if (!validanUnos) {
    poljeZaUnos.classList.add("neispravanUnos");
    return false;
  }
  poljeZaUnos.classList.remove("neispravanUnos");
  return true;
}

const kreirajPoljeZaUnos = (id, placeholder) => {
  const poljeZaUnos = document.createElement("input");
  poljeZaUnos.id = id;
  poljeZaUnos.placeholder = placeholder;
  poljeZaUnos.addEventListener("focus", () => {
    poljeZaUnos.classList.remove("neispravanUnos");
  });
  return poljeZaUnos;
}

const kreirajFormuZaUnosKoda = () => {
  potvrdaUnosa.removeEventListener("click", potvrdiEmail);
  potvrdaUnosa.addEventListener("click", potvrdiKod);
  infoTekst.innerText = "Unesite kod koji je dostavljen na Vašu email adresu.";
  unosEmaila.remove();
  sadržaj.insertBefore(kreirajPoljeZaUnos("unosKoda", "Kod"), potvrdaUnosa);
}

const kreirajFormuZaUnosNoveLozinke = () => {
  potvrdaUnosa.removeEventListener("click", potvrdiKod);
  potvrdaUnosa.addEventListener("click", potvrdiLozinku);
  infoTekst.innerText = "Unesite novu lozinku.";
  document.getElementById("unosKoda").remove();
  const poljeZaUnosLozinke = kreirajPoljeZaUnos("unosLozinke", "Lozinka");
  poljeZaUnosLozinke.type = "password"
  sadržaj.insertBefore(poljeZaUnosLozinke, potvrdaUnosa);
}

// U ovom slučaju, "greška" se ne koristi jer se u odgovoru na konkretno ovaj zahtjev kriju svi potrebni podaci za njegovu obradu
// (tj. u ovom slučaju se na osnovu sadržaja odgovora može lako saznati da li je došlo do greške pa je ta prednost iskorištena).
const obradiValidacijuEmaila = (greška, sadržaj) => {
  sadržaj = JSON.parse(sadržaj);
  email = sadržaj.email;
  if (obradiValidacijuPolja(unosEmaila, sadržaj.email !== null))
    kreirajFormuZaUnosKoda();
}

const obradiValidacijuSigurnosnogKoda = (greška, sadržaj) => {
  sadržaj = JSON.parse(sadržaj);
  const unosKoda = document.getElementById("unosKoda");
  sigurnosniKod = sadržaj.sigurnosniKod;
  if (unosKoda && obradiValidacijuPolja(unosKoda, sadržaj.sigurnosniKod))
    kreirajFormuZaUnosNoveLozinke();
}

const potvrdiLozinku = () => {
  upravljačZahtjevima.uputiZahtjevZaPromjenuLozinke(email, sigurnosniKod, dajNovuLozinku(), (greška, sadržaj) => {
    if (obradiValidacijuPolja(document.getElementById("unosLozinke"), !greška))
      location.href = "/html/prijava.html";
  });
}

const potvrdiKod = () => {
  upravljačZahtjevima.uputiZahtjevZaPotvrduSigurnosnogKoda(email, dajSigurnosniKod(), obradiValidacijuSigurnosnogKoda);
}

const potvrdiEmail = () => {
  upravljačZahtjevima.uputiZahtjevZaKreiranjeSigurnosnogKoda(dajEmail(), obradiValidacijuEmaila);
}

potvrdaUnosa.addEventListener("click", potvrdiEmail);

unosEmaila.addEventListener("focus", () => {
    unosEmaila.classList.remove("neispravanUnos");
});

