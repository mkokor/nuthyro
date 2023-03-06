// Za upravljanje zahtjevima koristi se AJAX tehnologija!
// Svaka metoda za slanje zahtjeva, pored neophodnih parametara, prima i
// (callback) funkciju koja se poziva nakon što je odgovor na upućeni zahtjev dobiven.
// Na ovaj način, napisani modul će se moći korisiti za razne svrhe, tj. isti podaci 
// (dobiveni u vidu HTTP odgovora od servera) moći će se obrađivati na različite načine
// zavisno od potrebe. 
// Podrazumijeva se da spomenuta funkcija prima dva parametra,
// "greška" koji pokazuje da li su dobiveni traženi podaci, i "sadržaj" koji sadrži 
// tražene podatke (ukoliko su uspješno vraćeni) ili poruku o grešci (ukoliko se ista dogodila).


const UpravljačZahtjevima = () => {

  const postaviObraduOdgovora = (http) => {
    http.onreadystatechange = () => {
      if (http.readyState == 4)
        obradiOdgovor(http.status == 200 ? false : true, http.responseText);
    }
  }

  const uputiZahtjevZaRegistraciju = (email, korisničkoIme, lozinka, obradiOdgovor) => {
    const http = new XMLHttpRequest();
    postaviObraduOdgovora(http);
    http.open("POST", "/registracija", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
      "email": email,
      "korisničkoIme": korisničkoIme,
      "lozinka": lozinka
    }));
  }

  return {
    uputiZahtjevZaRegistraciju: uputiZahtjevZaRegistraciju
  }

}