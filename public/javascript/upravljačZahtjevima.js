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

  const uputiZahtjevZaDodavanjeEnergetskihVrijednosti = (bmr, tdee, bmi, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/dodavanjeEnergetskihVrijednosti");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "bmr": bmr,
      "tdee": tdee,
      "bmi": bmi
    }));
  }

  const uputiZahtjevZaDobavljanjeEnergetskihVrijednosti = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", "/energetskeVrijednostiZaKorisnika");
    http.send();
  }

  const uputiZahtjevZaDobavljanjeDostupnihNamirnica = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", "/dostupneNamirnice");
    http.send();
  }

  const uputiZahtjevZaDobavljanjeIkoneNamirnice = (id, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", `/ikonaNamirnice?id=${encodeURIComponent(id)}`);
    http.send();
  }

  const uputiZahtjevZaDodavanjeNamirniceNaSpisak = (namirnica, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/dodajNamirnicuNaSpisak");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({ "namirnica": namirnica }));
  }

  const uputiZahtjevZaUklanjanjeNamirniceSaSpiska = (id, gramaža, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/ukloniNamirnicuSaSpiska");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({ "id": id, "gramaža": gramaža }));
  }

  const uputiZahtjevZaDobavljanjeSpiskaNamirnica = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", "/dajSpisakNamirnica");
    http.send();
  }

  const uputiZahtjevZaSumarneNutritivneVrijednosti = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("GET", "/dajSumarneNutritivneVrijednosti");
    http.send();
  }

  const uputiZahtjevZaGoogleOAuth2 = (obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http, obradiOdgovor);
    http.open("POST", "/googlePrijava");
    http.send();
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
    "uputiZahtjevZaDodavanjeEnergetskihVrijednosti": uputiZahtjevZaDodavanjeEnergetskihVrijednosti,
    "uputiZahtjevZaDobavljanjeEnergetskihVrijedosti": uputiZahtjevZaDobavljanjeEnergetskihVrijednosti,
    "uputiZahtjevZaDobavljanjeDostupnihNamirnica": uputiZahtjevZaDobavljanjeDostupnihNamirnica,
    "uputiZahtjevZaDobavljanjeIkoneNamirnice": uputiZahtjevZaDobavljanjeIkoneNamirnice,
    "uputiZahtjevZaDodavanjeNamirniceNaSpisak": uputiZahtjevZaDodavanjeNamirniceNaSpisak,
    "uputiZahtjevZaUklanjanjeNamirniceSaSpiska": uputiZahtjevZaUklanjanjeNamirniceSaSpiska,
    "uputiZahtjevZaDobavljanjeSpiskaNamirnica": uputiZahtjevZaDobavljanjeSpiskaNamirnica,
    "uputiZahtjevZaSumarneNutritivneVrijednosti": uputiZahtjevZaSumarneNutritivneVrijednosti,
    "uputiZahtjevZaGoogleOAuth2": uputiZahtjevZaGoogleOAuth2
  }

})();