// KONTROLE KORISNIČKOG INTERFEJSA I VARIJABLE

const potvrdaUnosa = document.getElementById("potvrdaUnosa");
const unosEmaila = document.getElementById("email");
const infoTekst = document.getElementById("infoTekst");
const sadržaj = document.getElementById("sadržaj");

const upravljačZahtjevima = UpravljačZahtjevima;
let email = null; // Kada email bude validan pohranit će se u ovu varijablu.


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

// U ovom slučaju, "greška" se ne koristi jer se u odgovoru na konkretno ovaj zahtjev kriju svi potrebni podaci za njegovu obradu
// (tj. u ovom slučaju se na osnovu sadržaja odgovora može lako saznati da li je došlo do greške pa je ta prednost iskorištena).
const obradiValidacijuEmaila = (greška, sadržaj) => {
  sadržaj = JSON.parse(sadržaj);
  email = sadržaj.email;
  if (obradiValidacijuPolja(unosEmaila, sadržaj.email !== null))
    kreirajFormuZaUnosKoda();
  return;
}

const kreirajFormuZaUnosNoveLozinke = () => {
  potvrdaUnosa.removeEventListener("click", potvrdiKod);
  potvrdaUnosa.addEventListener("click", potvrdiLozinku);
  infoTekst.innerText = "Unesite novu lozinku.";
  document.getElementById("unosKoda").remove();
  sadržaj.insertBefore(kreirajPoljeZaUnos("unosLozinke", "Lozinka"), potvrdaUnosa);
}

const potvrdiLozinku = () => {
  location.href = "/html/prijava.html"
}

const potvrdiKod = () => {
  // Na ovom mjestu će se vršiti provjera koda (tj. da li je jednak onome koji je poslan na unesenu email adresu).
  // Zamišljeno je da nakon potvrde email-a (što se dešava prethodno na serveru) server odmah uputi email sa spomenutim kodom.
  // Treba još utvrditi da li će na zahtjev za potvrdu email-a server kao odgovor (u slučaju uspjeha) odgovoriti sa kodom
  // (što bi omogućilo provjeru validnosti unesenog koda na klijentovoj strani), ili će se kod sačuvati na serveru te će se novim zahtjevom
  // vršiti njegova validacija. 
  // Nakon uspješne potvrde koda, korisniku će se omogućiti promjena postojeće lozinke.
  kreirajFormuZaUnosNoveLozinke();
}

const potvrdiEmail = () => {
  upravljačZahtjevima.uputiZahtjevZaPromjenuLozinke(dajEmail(), obradiValidacijuEmaila);
}

potvrdaUnosa.addEventListener("click", potvrdiEmail);

unosEmaila.addEventListener("focus", () => {
    unosEmaila.classList.remove("neispravanUnos");
});

