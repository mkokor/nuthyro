// Ovaj modul služi za kreiranje izgleda stranice za unos dnevne aktivnosti.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const DnevnaAktivnost = (korijen, tipoviAktivnosti) => {

  const potrebniPodaci = [
    { 
      "id": "dob",
      "placeholder": "Dob [godine]"
    },
    { 
      "id": "visina",
      "placeholder": "Visina [cm]"
    },
    { 
      "id": "težina",
      "placeholder": "Težina [kg]"
    }
  ];
  
  // Ova funkcija pretvara format stringa u "Title Case".
  const formatirajRiječ = (riječ) => {
    return riječ.charAt(0).toUpperCase() + riječ.substr(1).toLowerCase();
  }

  const očistiKorijen = () => {
    korijen.innerText = "";
  }

  const kreirajLabelu = (tekst) => {
    const labela = document.createElement("label");
    labela.innerText = tekst;
    return labela;
  }

  const kreirajSliku = (putanjaDoSlike, alternativniTekst) => {
    const slika = document.createElement("img");
    slika.src = putanjaDoSlike;
    slika.alt = alternativniTekst;
    return slika;
  }

  // Vrijednost parametra spol može biti "muško" ili "žensko".
  const kreirajKarticuSpola = (spol) => {
    const spolKartica = document.createElement("div");
    spolKartica.classList.add("spol");
    spolKartica.id = spol.toLowerCase();
    spolKartica.appendChild(kreirajLabelu(formatirajRiječ(spol)));
    spolKartica.appendChild(kreirajSliku(`../slike/ikone/${spol.toLowerCase()}.png`, spol.toLowerCase()));
    return spolKartica;
  }

  const kreirajSekcijaZaOdabirSpola = () => {
    const odabirSpola = document.createElement("div");
    odabirSpola.id = "odabirSpola";
    ["muško", "žensko"].forEach(spol => {
      odabirSpola.appendChild(kreirajKarticuSpola(spol));
    });
    return odabirSpola;
  }

  const kreirajPoljeZaUnos = (id, placeholder) => {
    const poljeZaUnos = document.createElement("input");
    poljeZaUnos.type = "text",
    poljeZaUnos.id = id,
    poljeZaUnos.placeholder = placeholder;
    return poljeZaUnos;
  }

  const kreirajPoljaZaUnos = (forma, podaciOPoljima) => {
    podaciOPoljima.forEach(polje => {
      forma.appendChild(kreirajPoljeZaUnos(polje.id, polje.placeholder));
    });
  }

  const kreirajPoljaZaOdabir = (opcije) => {
    const poljeZaOdabir = document.createElement("select");
    opcije.forEach(opcija => {
      const opcijaPolje = document.createElement("option");
      opcijaPolje.innerText = opcija;
      poljeZaOdabir.appendChild(opcijaPolje);
    });
    return poljeZaOdabir;
  }

  const kreirajSekcijuZaOdabirTipaAktivnosti = (opcijeAktivnosti) => {
    const faktorAktivnosti = document.createElement("div");
    faktorAktivnosti.id = "faktorAktivnosti";
    faktorAktivnosti.appendChild(kreirajLabelu("Aktivnost:"));
    faktorAktivnosti.appendChild(kreirajPoljaZaOdabir(opcijeAktivnosti));
    return faktorAktivnosti;
  }

  const kreirajDugme = (id, tekst) => {
    const dugme = document.createElement("button");
    dugme.id = id;
    dugme.innerText = tekst;
    return dugme;
  }

  const kreirajFormu = () => {
    const forma = document.createElement("div");
    forma.id = "forma";
    forma.appendChild(kreirajSekcijaZaOdabirSpola());
    kreirajPoljaZaUnos(forma, potrebniPodaci);
    forma.appendChild(kreirajSekcijuZaOdabirTipaAktivnosti(tipoviAktivnosti));
    forma.appendChild(kreirajDugme("potvrdaDugme", "Potvrdi"));
    return forma;
  }

  const kreirajObjašnjenje = () => {
    const objašnjenje = document.createElement("div");
    objašnjenje.id = "objašnjenje";
    return objašnjenje;
  }

  const generišiSadržaj = () => {
    const dnevnaAktivnost = document.createElement("div");
    dnevnaAktivnost.id = "dnevnaAktivnost";
    dnevnaAktivnost.appendChild(kreirajFormu());
    dnevnaAktivnost.appendChild(kreirajObjašnjenje());
    return dnevnaAktivnost;
  }

  const odaberiSpol = () => {
    // Početna verzija ove funkcije će muški spol
    // postavljati default-nim.
    document.getElementById("muško").classList.add("odabraniSpol");
    document.getElementById("žensko").classList.add("neodabraniSpol");
  }

  const kreirajIzgled = () => {
    očistiKorijen();
    korijen.appendChild(generišiSadržaj());
    odaberiSpol();
  }

  kreirajIzgled();

}