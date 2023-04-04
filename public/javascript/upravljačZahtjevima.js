// Za upravljanje zahtjevima koristi se AJAX tehnologija!
// Svaka metoda za slanje zahtjeva, pored neophodnih parametara, prima i
// (callback) funkciju koja se poziva nakon što je odgovor na upućeni zahtjev dobiven.
// Na ovaj način, napisani modul će se moći koristiti za razne svrhe, tj. isti podaci 
// (dobiveni u vidu HTTP odgovora od servera) moći će se obrađivati na različite načine
// zavisno od potrebe. 
// Podrazumijeva se da spomenuta funkcija prima dva parametra,
// "greška" koji pokazuje da li su dobiveni traženi podaci, i "sadržaj" koji sadrži 
// tražene podatke (ukoliko su uspješno vraćeni) ili poruku o grešci (ukoliko se ista dogodila).


const UpravljačZahtjevima = (() => {

  const postaviObraduOdgovora = (http, obradiOdgovor) => {
    http.onreadystatechange = () => {
      if (http.readyState == 4)
        obradiOdgovor(http.status == 200 ? false : true, http.responseText);
    }
  }

  const uputiZahtjevZaRegistraciju = (email, korisničkoIme, lozinka, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/registracija");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "email": email,
      "korisničkoIme": korisničkoIme,
      "lozinka": lozinka
    }));
  }

  const uputiZahtjevZaPrijavu = (korisničkoIme, lozinka, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/prijava");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "korisničkoIme": korisničkoIme,
      "lozinka": lozinka
    }));
  }

  const uputiZahtjevZaKreiranjeSigurnosnogKoda = (email, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", `/kreiranjeSigurnosnogTokena`);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "email": email,
    }));
  }

  const uputiZahtjevZaProvjeruPrijave = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", "/provjeraPrijave");
    http.send();
  }

  const uputiZahtjevZaOdjavu = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/odjava");
    http.send();
  }

  const uputiZahtjevZaPotvrduSigurnosnogKoda = (email, sigurnosniKod, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/potvrdaSigurnosnogKoda");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({ 
      "email": email,
      "sigurnosniKod": sigurnosniKod 
    }));
  }

  const uputiZahtjevZaPromjenuLozinke = (email, sigurnosniKod, novaLozinka, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/promjenaLozinke");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "email": email,
      "sigurnosniKod": sigurnosniKod,
      "novaLozinka": novaLozinka
    }));
  }

  const uputiZahtjevZaTipoveAktivnosti = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", "/tipoviDnevneAktivnosti");
    http.send();
  }

  const uputiZahtjevZaDodavanjeEnergetskihVrijednosti = (bmr, tdee, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/dodavanjeEnergetskihVrijednosti");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "bmr": bmr,
      "tdee": tdee
    }));
  }

  return {
    "uputiZahtjevZaRegistraciju": uputiZahtjevZaRegistraciju,
    "uputiZahtjevZaPrijavu": uputiZahtjevZaPrijavu,
    "uputiZahtjevZaKreiranjeSigurnosnogKoda": uputiZahtjevZaKreiranjeSigurnosnogKoda,
    "uputiZahtjevZaProvjeruPrijave": uputiZahtjevZaProvjeruPrijave,
    "uputiZahtjevZaOdjavu": uputiZahtjevZaOdjavu,
    "uputiZahtjevZaPotvrduSigurnosnogKoda": uputiZahtjevZaPotvrduSigurnosnogKoda,
    "uputiZahtjevZaPromjenuLozinke": uputiZahtjevZaPromjenuLozinke,
    "uputiZahtjevZaTipoveAktivnosti": uputiZahtjevZaTipoveAktivnosti,
    "uputiZahtjevZaDodavanjeEnergetskihVrijednosti": uputiZahtjevZaDodavanjeEnergetskihVrijednosti
  }

})();