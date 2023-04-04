// Ovaj modul služi za kreiranje izgleda stranice za unos dnevne aktivnosti.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.
// Pored toga, modul je odgovoran i za obradu nekih korisničkih radnji
// koje se vezuju za sadržaj koji on generiše.

const upravljač = UpravljačZahtjevima;
let bmrVrijednost = null;
let tdeeVrijednost = null;


const DnevnaAktivnost = (korijen, podaci) => {

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

  const kreirajInfoPolje = () => {
    const infoPolje = document.createElement("div");
    infoPolje.id = "tipAktivnostiInfo";
    const tekst = document.createElement("p");
    tekst.id = "infoTekst";
    tekst.innerText = "Veoma intenzivna fizička aktivnost 6-7 dana sedmično (nekada i 2 puta dnevno), uz težak fizički posao ili aktivno bavljenje sportom";
    infoPolje.appendChild(tekst);
    return infoPolje;
  }

  const kreirajInfoDugme = () => {
    const infoDugme = document.createElement("button");
    infoDugme.id = "infoDugme";
    const ikona = document.createElement("img");
    ikona.src = "../../slike/ikone/info.png";
    ikona.alt = "info";
    infoDugme.appendChild(ikona);
    return infoDugme;
  }

  // Na ovom mjestu, jedna opcija aktivnosti predstavljena je kao JSON objekat sa atributima: tip (tj. naziv),
  // opis i palVrijednosti (i još neki koji su manje bitni, a pokupljeni su iz baze podataka).
  const kreirajSekcijuZaOdabirTipaAktivnosti = (opcijeAktivnosti) => {
    const faktorAktivnosti = document.createElement("div");
    faktorAktivnosti.id = "faktorAktivnosti";
    faktorAktivnosti.appendChild(kreirajInfoPolje());
    faktorAktivnosti.appendChild(kreirajLabelu("Aktivnost:"));
    faktorAktivnosti.appendChild(kreirajPoljaZaOdabir(opcijeAktivnosti.map(opcija => opcija.tip)));
    faktorAktivnosti.appendChild(kreirajInfoDugme());
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
    forma.appendChild(kreirajSekcijuZaOdabirTipaAktivnosti(podaci.tipoviAktivnosti));
    forma.appendChild(kreirajDugme("potvrdaDugme", "Potvrdi"));
    return forma;
  }

  const kreirajPodatkovniNaziv = (skraćenicaTekst, puniNazivTekst) => {
    const sekcija = document.createElement("div");
    sekcija.classList.add("nazivPodatka");
    const skraćenicaElement = document.createElement("h2");
    skraćenicaElement.classList.add("skraćenica");
    skraćenicaElement.innerText = skraćenicaTekst;
    const puniNazivElement = document.createElement("h3");
    puniNazivElement.innerText = puniNazivTekst;
    [skraćenicaElement, puniNazivElement].forEach(naziv => {
      sekcija.appendChild(naziv);
    });
    return sekcija;
  }

  const kreirajPrvuPodatkovnuKolonu = (skraćenica, puniNaziv) => {
    const prvaKolona = document.createElement("td");
    prvaKolona.classList.add("prvaKolona");
    prvaKolona.appendChild(kreirajPodatkovniNaziv(skraćenica, puniNaziv));
    return prvaKolona;
  }

  const kreirajDruguPodatkovnuKolonu = (skraćenica) => {
    const kolona = document.createElement("td");
    kolona.classList.add("prvaKolona");
    kolona.id = skraćenica.toLowerCase();
    kolona.classList.add("brojčaniPodatak");
    kolona.innerText = "/";
    return kolona;
  }

  const kreirajPodatkovniRed = (skraćenica, puniNaziv) => {
    const red = document.createElement("tr");
    red.appendChild(kreirajPrvuPodatkovnuKolonu(skraćenica, puniNaziv));
    red.appendChild(kreirajDruguPodatkovnuKolonu(skraćenica));
    return red;
  }

  const kreirajNaslovniRed = () => {
    const naslovniRed = document.createElement("tr");
    const prvaKolona = document.createElement("th");
    prvaKolona.classList.add("prvaKolona");
    prvaKolona.innerText = "NAZIV";
    const drugaKolona = document.createElement("th");
    const naslov = document.createElement("h2");
    naslov.innerText = "REZULTAT";
    const mjernaJedinica = document.createElement("h3");
    mjernaJedinica.innerText = "[kalorija po danu]";
    drugaKolona.appendChild(naslov);
    drugaKolona.appendChild(mjernaJedinica);
    [prvaKolona, drugaKolona].forEach(kolona => {
      naslovniRed.appendChild(kolona);
    });
    return naslovniRed;
  }

  const kreirajRedoveTabele = (tabela) => {
    tabela.appendChild(kreirajNaslovniRed());
    podaci.nutriVrijednosti.forEach(vrijednost => {
      tabela.appendChild(kreirajPodatkovniRed(vrijednost.skraćenica, vrijednost.puniNaziv));
    });
  }

  const kreirajTabeluSaPodacima = () => {
    const tabela = document.createElement("table");
    kreirajRedoveTabele(tabela);
    return tabela;
  }

  const kreirajInfoTekst = (informacije) => {
    const tekst = document.createElement("p");
    tekst.innerText = informacije;
    return tekst;
  }

  const kreirajNaslovObjašnjenja = () => {
    const naslov = document.createElement("h1");
    naslov.innerText = "Nutri Kalkulator";
    return naslov;
  }

  const kreirajObjašnjenje = () => {
    const objašnjenje = document.createElement("div");
    objašnjenje.id = "objašnjenje";
    objašnjenje.appendChild(kreirajNaslovObjašnjenja());
    objašnjenje.appendChild(kreirajInfoTekst(podaci.infoTekst));
    objašnjenje.appendChild(kreirajTabeluSaPodacima());
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



  // Nakon što je korisnički interfejs generisan, moguće je postaviti
  // odgovarajuće EventListener-e na kontrole.
  

  const muškiSpolKartica = document.getElementById("muško");
  const ženskiSpolKartica = document.getElementById("žensko");
  const potvrdaDugme = document.getElementById("potvrdaDugme");
  const unosDobi = document.getElementById("dob");
  const unosVisine = document.getElementById("visina");
  const unosTežine = document.getElementById("težina");
  const bmrPolje = document.getElementById("bmr");
  const tdeePolje = document.getElementById("tdee");
  const infoDugme = document.getElementById("infoDugme");
  const tipAktivnostiInfo = document.getElementById("tipAktivnostiInfo");
  const infoTekst = document.getElementById("infoTekst");
  const odabirTipaAktivnosti = Array.from(document.getElementsByTagName("select"))[0];

  let dob = null;
  let visina = null;
  let težina = null;
  const validacija = [
    {
      "regularniIzraz": /^[1-9][0-9]*$/,
      "poljeZaUnos": unosDobi
    }, 
    {
      "regularniIzraz": /^(\d{2,3})(\.{0,1})(\d*)$/,
      "poljeZaUnos": unosVisine
    },
    {
      "regularniIzraz": /^(\d{2,3})(\.{0,1})(\d*)$/,
      "poljeZaUnos": unosTežine
    }
  ]


  const validirajVrijednost = (regularniIzraz, polje) => {
    if (!regularniIzraz.test(polje.value)) {
      polje.classList.add("neispravanUnos");
      return false;
    }
    polje.classList.remove("neispravanUnos");
    return true;
  }

  const validirajUlaze = () => {
    let rezultat = true;
    validacija.forEach(vrijednost => {
      if (validirajVrijednost(vrijednost.regularniIzraz, vrijednost.poljeZaUnos))
        if (vrijednost.poljeZaUnos.id === "dob")
          dob = parseInt(vrijednost.poljeZaUnos.value);
        else if (vrijednost.poljeZaUnos.id === "visina")
          visina = parseFloat(vrijednost.poljeZaUnos.value);
        else
          težina = parseFloat(vrijednost.poljeZaUnos.value);
      else
        rezultat = false;
    });
    return rezultat;
  }

  const dajSpol = () => {
    if (muškiSpolKartica.classList.contains("odabraniSpol"))
      return "muško";
    return "žensko";
  }

  const izračunajBmr = (težina, visina, dob, spol) => {
    if (spol=== "muško")
      return 66.473 + (13.752 * težina) + (5.003 * visina) - (6.755 * dob);
    return 665.096 + (9.563 * težina) + (1.850 * visina) - (4.676 * dob);
  }

  const izračunajTdee = (palVrijednost, bmr) => {
    return palVrijednost * bmr;
  }

  const dajPalVrijednostTrenutneAktivnosti = () => {
    return podaci.tipoviAktivnosti.filter(tipAktivnosti => tipAktivnosti.tip == odabirTipaAktivnosti.value)[0].palVrijednost;    
  }

  const izračunajVrijednosti = () => {
    if (!validirajUlaze())
      return;
    bmrVrijednost = izračunajBmr(težina, visina, dob, dajSpol());
    bmrPolje.innerText = bmrVrijednost.toFixed(3);
    tdeeVrijednost = izračunajTdee(dajPalVrijednostTrenutneAktivnosti(), bmrVrijednost);
    tdeePolje.innerText = tdeeVrijednost.toFixed(3);
    upravljač.uputiZahtjevZaDodavanjeEnergetskihVrijednosti(bmrVrijednost, tdeeVrijednost, (greška, rezultat) => {
      if (greška)
        location.href = "/html/prijava.html";
    });
  }

  const zamijeniSpol = (odabrani, neodabrani) => {
    if (odabrani.classList.contains("odabraniSpol"))
      return;
    neodabrani.classList.remove("odabraniSpol");
    neodabrani.classList.add("neodabraniSpol");
    odabrani.classList.add("odabraniSpol");
    odabrani.classList.remove("neodabraniSpol");
  }

  const dajOpisTrenutneAktivnosti = () => {
    return podaci.tipoviAktivnosti.filter(tipAktivnosti => tipAktivnosti.tip == odabirTipaAktivnosti.value)[0].opis;
  }


  muškiSpolKartica.addEventListener("click", () => {
    zamijeniSpol(muškiSpolKartica, ženskiSpolKartica);
  });

  ženskiSpolKartica.addEventListener("click", () => {
    zamijeniSpol(ženskiSpolKartica, muškiSpolKartica);
  });

  potvrdaDugme.addEventListener("click", () => {
    upravljač.uputiZahtjevZaProvjeruPrijave((greška, rezultat) => {
      if (greška)
        location.href = "/html/prijava.html";
      else
        izračunajVrijednosti();
    });
  });

  [unosDobi, unosVisine, unosTežine].forEach(unos => {
    unos.addEventListener("focus", () =>  {
      unos.classList.remove("neispravanUnos");
    });
  });

  infoDugme.addEventListener("mouseover", () => {
    infoTekst.innerText = dajOpisTrenutneAktivnosti();
    tipAktivnostiInfo.style.visibility = "visible";
  });

  infoDugme.addEventListener("mouseleave", () => {
    tipAktivnostiInfo.style.visibility = "hidden";
  });

}