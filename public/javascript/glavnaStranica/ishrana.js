// Ovaj modul služi za kreiranje izgleda stranice za unos dnevne ishrane.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const Ishrana = (korijen, pomoćneInformacije) => {

  // POMOĆNE FUNKCIJE ZA RAD MODULA I NJEGOVIH KOMPONENTI

  const kreirajOmotač = (id = null) => {
    const omotač = document.createElement("div");
    id == null ? null : omotač.id = id;
    return omotač;
  }

  const očistiKorijen = () => {
    korijen.innerText = "";
  }

  const kreirajLabelu = (tekst) => {
    const labela = document.createElement("label");
    labela.innerText = tekst;
    return labela;
  }

  const kreirajDugme = (id, tekst) => {
    const dugme = document.createElement("button");
    dugme.id = id;
    dugme.innerText = tekst;
    return dugme;
  }


  // KOMPONENTE MODULA

  const kreirajSekcijuZaUnosJela = (uputeZaKorisnika, dostupnaJela) => {

    const kreirajSekcijuZaKoličinu = () => {
      const omotač = kreirajOmotač("količina");
      omotač.appendChild(kreirajLabelu("Gramaža:"));
      const unosGramaže = document.createElement("input");
      unosGramaže.type = "text";
      unosGramaže.id = "gramaža";
      unosGramaže.placeholder = 0;
      omotač.appendChild(unosGramaže);
      return omotač;
    }

    const kreirajSekcijuZaOdabirJela = () => {

      const kreirajSekcijuZaOdabir = () => {

        const kreirajListuDostupnihJela = () => {
          const omotač = kreirajOmotač("jela");
          dostupnaJela.forEach(jelo => {
            const jeloPolje = document.createElement("div");
            jeloPolje.classList.add("jelo");
            jeloPolje.innerText = jelo.naziv;
            omotač.appendChild(jeloPolje);
          });
          return omotač;
        }

        const kreirajDugmeZaOtvaranjeListeDostupnihJela = () => {
          const dugme = document.createElement("button");
          dugme.id = "pretragaJela";
          const ikona = document.createElement("img");
          ikona.src = "../slike/ikone/strelicaDoleBijela.png";
          ikona.alt = "pretraga";
          dugme.appendChild(ikona);
          return dugme;
        }

        const kreirajPoljeZaOdabranoJelo = () => {
          const odabranoJeloPolje = kreirajLabelu();
          odabranoJeloPolje.id = "trenutnoOdabrano";
          odabranoJeloPolje.innerText = dostupnaJela.length != 0 ? dostupnaJela[0].naziv : "";
          return odabranoJeloPolje;
        }

        const odabranoJelo = kreirajOmotač("odabranoJelo");
        odabranoJelo.appendChild(kreirajPoljeZaOdabranoJelo());
        odabranoJelo.appendChild(kreirajDugmeZaOtvaranjeListeDostupnihJela());
        odabranoJelo.appendChild(kreirajListuDostupnihJela());

        return odabranoJelo;

      }

      const odabirJela = kreirajOmotač("naziv");
      odabirJela.appendChild(kreirajLabelu("Odabrano jelo:"));
      odabirJela.appendChild(kreirajSekcijuZaOdabir());

      return odabirJela;

    }

    const kreirajNaslovnuSekcijuZaUnosJela = () => {
      
      const kreirajNaslovniOpis = (tekstOpisa) => {
        const opis = document.createElement("p");
        opis.innerText = tekstOpisa
        return opis;
      }

      const kreirajNaslovZaUnosJela = () => {
        const naslov = document.createElement("h1");
        naslov.innerText = "Odabir jela";
        return naslov;
      }

      const naslovnaSekcija = kreirajOmotač()
      naslovnaSekcija.appendChild(kreirajNaslovZaUnosJela());
      naslovnaSekcija.appendChild(kreirajNaslovniOpis(uputeZaKorisnika));

      return naslovnaSekcija;

    }

    const unosJela = kreirajOmotač("unosJela");
    unosJela.appendChild(kreirajNaslovnuSekcijuZaUnosJela());
    unosJela.appendChild(kreirajSekcijuZaOdabirJela());
    unosJela.appendChild(kreirajSekcijuZaKoličinu());
    unosJela.appendChild(kreirajDugme("potvrdiUnosJela", "Potvrdi"));

    return unosJela;

  }

  const kreirajSekcijuZaOdabranaJela = () => {
    
    const kreirajNaslovZaOdabranaJela = () => {
      const omotačNaslova = kreirajOmotač("odabranaJelaNaslov");
      const naslov = document.createElement("h1");
      naslov.innerText = "Odabrana jela";
      omotačNaslova.appendChild(naslov);
      omotačNaslova.appendChild(kreirajDugme("generisanjeIzvještajaOIshrani", "Prikaži rezultate"));
      return omotačNaslova;
    }

    const kreirajListuOdabranihJlea = () => {
      const lista = kreirajOmotač("uneseneNamirnice")
      const prazanOdabir = document.createElement("img");
      prazanOdabir.id = "prazanOdabir";
      prazanOdabir.src = "../slike/ikone/prazanOdabir.png";
      prazanOdabir.alt = "prazno";
      const prazno = kreirajOmotač("prazno");
      prazno.appendChild(prazanOdabir)
      lista.appendChild(prazno);
      return lista;
    }

    const omotač = kreirajOmotač("obavještenjeZaIshranu");
    omotač.appendChild(kreirajNaslovZaOdabranaJela());
    omotač.appendChild(kreirajListuOdabranihJlea());

    return omotač;

  }


  // GLAVNA FUNKCIJA

  const kreirajIzgled = () => {
    očistiKorijen();
    const omotačZaIshranu = kreirajOmotač("ishrana");
    omotačZaIshranu.appendChild(kreirajSekcijuZaUnosJela(pomoćneInformacije.uputeZaKorisnika, pomoćneInformacije.dostupnaJela)); 
    omotačZaIshranu.appendChild(kreirajSekcijuZaOdabranaJela());
    korijen.appendChild(omotačZaIshranu);
  }

  kreirajIzgled();



  // Nakon što je korisnički interfejs generisan, moguće je postaviti
  // odgovarajuće EventListener-e na kontrole.


  const pretragaJela = document.getElementById("pretragaJela");
  const meniJela = document.getElementById("jela");
  let meniJelaOtvoren = false;

  pretragaJela.addEventListener("click", () => {
    pretragaJela.children[0].src = `../slike/ikone/strelica${meniJelaOtvoren ? "Dole" : "Gore"}Bijela.png`;
    meniJela.style.visibility = meniJelaOtvoren ? "hidden" : "visible";
    meniJelaOtvoren = !meniJelaOtvoren;
  });

}