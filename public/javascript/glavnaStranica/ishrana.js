// Ovaj modul služi za kreiranje izgleda stranice za unos dnevne ishrane.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const upravljačZahtjevimaZaIshranu = UpravljačZahtjevima;


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

  const kreirajObavijestOPraznomOdabiru = () => {
    const prazanOdabir = document.createElement("img");
    prazanOdabir.id = "prazanOdabir";
    prazanOdabir.src = "../slike/ikone/prazanOdabir.png";
    prazanOdabir.alt = "prazno";
    const prazno = kreirajOmotač("prazno");
    prazno.appendChild(prazanOdabir);
    return prazno;
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
      lista.appendChild(kreirajObavijestOPraznomOdabiru());
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
  const jela = Array.from(document.getElementsByClassName("jelo"));
  const odabranoJelo = document.getElementById("trenutnoOdabrano");
  const dugmeZaPotvrdu = document.getElementById("potvrdiUnosJela");
  const gramažaPolje = document.getElementById("gramaža");
  const uneseneNamirniceSekcija = document.getElementById("uneseneNamirnice");
  const generisanjeIzvještajaOIshrani = document.getElementById("generisanjeIzvještajaOIshrani");

  let meniJelaOtvoren = false;
  let selektovanoJelo = pomoćneInformacije.dostupnaJela[0];


  const obradiPrikazivanjeListeDostupnihNamirnica = () => {
    pretragaJela.children[0].src = `../slike/ikone/strelica${meniJelaOtvoren ? "Dole" : "Gore"}Bijela.png`;
    meniJela.style.visibility = meniJelaOtvoren ? "hidden" : "visible";
    meniJelaOtvoren = !meniJelaOtvoren;
  }

  pretragaJela.addEventListener("click", obradiPrikazivanjeListeDostupnihNamirnica);

  jela.forEach(jelo => {
    jelo.addEventListener("click", (event) => {
      selektovanoJelo = pomoćneInformacije.dostupnaJela.filter(jelo => jelo.naziv === event.target.innerText)[0]; // Element sigurno postoji!
      odabranoJelo.innerText = selektovanoJelo.naziv;
      obradiPrikazivanjeListeDostupnihNamirnica();
    });
  });

  // Ako u trenutnoj sesiji korisnik ima odabrane namirnice, prikazat će se!
  upravljačZahtjevimaZaIshranu.uputiZahtjevZaDobavljanjeSpiskaNamirnica((greška, podaci) => {
      JSON.parse(podaci).forEach(element => {
        kreirajKarticuJela(element);
      });
  });

  const kreirajKarticuJela = (odabranoJelo) => {

    const kreirajDugmeZaBrisanje = () => {

      const obrišiKarticu = (event) => {
        let roditelj = event.target.parentNode;
        if (roditelj.tagName.toUpperCase() === "BUTTON")
          roditelj = roditelj.parentNode;
        const id = pomoćneInformacije.dostupnaJela.filter(jelo => jelo.naziv === roditelj.children[0].children[1].children[0].innerText)[0].id;
        const gramaža = parseInt(roditelj.children[0].children[1].children[1].innerText.split("g")[0]);
        upravljačZahtjevimaZaIshranu.uputiZahtjevZaProvjeruPrijave((greška, podaci) => {
          if (greška)
            location.href = "/html/prijava.html";
          else {
            upravljačZahtjevimaZaIshranu.uputiZahtjevZaUklanjanjeNamirniceSaSpiska(id, gramaža, (greška, podaci) => {
              uneseneNamirniceSekcija.innerHTML = "";
              JSON.parse(podaci).forEach(element => kreirajKarticuJela(element));
              if (uneseneNamirniceSekcija.innerHTML === "")
                uneseneNamirniceSekcija.appendChild(kreirajObavijestOPraznomOdabiru());
            });
          }
        })
      }

      const dugmeZaBrisanje = kreirajDugme("brisanjeNamirnice", "");
      const ikona = document.createElement("img");
      ikona.src = "../slike/ikone/brisanje.png";
      dugmeZaBrisanje.appendChild(ikona);
      dugmeZaBrisanje.addEventListener("click", (event) => { obrišiKarticu(event); });
      
      return dugmeZaBrisanje;
    
    }

    const kreirajSekcijuZaInformacijeONamirnici = () => {

      const kreirajTekstualneInformacijeONamirnici = () => {

        const kreirajNazivNamirnice = () => {
          const nazivNamirnice = kreirajOmotač();
          nazivNamirnice.classList.add("nazivNamirnice");
          nazivNamirnice.innerText = odabranoJelo.naziv;
          return nazivNamirnice;
        }

        const kreirajKoličinuNamirnice = () => {
          const količinaNamirnice = kreirajOmotač();
          količinaNamirnice.classList.add("količinaNamirnice");
          količinaNamirnice.innerText = odabranoJelo.gramaža + "g";
          return količinaNamirnice;
        }

        const tekstualneInformacije = kreirajOmotač();
        tekstualneInformacije.classList.add("tekstualneInformacijeONamirnici");
        tekstualneInformacije.appendChild(kreirajNazivNamirnice());
        tekstualneInformacije.appendChild(kreirajKoličinuNamirnice());

        return tekstualneInformacije;

      }

      const kreirajIkonuNamirnice = () => {
        const slikaIkone = document.createElement("img");
        slikaIkone.src = `/ikonaNamirnice/${encodeURIComponent(selektovanoJelo.id)}`;
        return slikaIkone;
      }

      const informacijeONamirnici = kreirajOmotač();
      informacijeONamirnici.classList.add("informacijeONamirnici");
      informacijeONamirnici.appendChild(kreirajIkonuNamirnice());
      informacijeONamirnici.appendChild(kreirajTekstualneInformacijeONamirnici());

      return informacijeONamirnici;

    }

    if (document.getElementById("prazno"))
      uneseneNamirniceSekcija.innerText = "";
    const karticaJela = kreirajOmotač();
    karticaJela.classList.add("karticaNamirnice");
    karticaJela.appendChild(kreirajSekcijuZaInformacijeONamirnici());
    karticaJela.appendChild(kreirajDugmeZaBrisanje());
    
    uneseneNamirniceSekcija.appendChild(karticaJela);

  }

  const dajGramažu = () => {
    if (gramažaPolje.value === "" || isNaN(gramažaPolje.value) || parseFloat(gramažaPolje.value) <= 0)
      return null;
    return parseFloat(gramažaPolje.value);
  }

  const dodajJeloNaListu = () => {
    const gramaža = dajGramažu();
    if (gramaža === null) {
      gramažaPolje.classList.add("neispravanUnos");
      return;
    }
    upravljačZahtjevimaZaIshranu.uputiZahtjevZaDodavanjeNamirniceNaSpisak({ ...selektovanoJelo, "gramaža": gramaža, }, (greška, podaci) => {
      if (greška)
        location.href = "/html/prijava.html";
      else
        kreirajKarticuJela({ ...selektovanoJelo, "gramaža": gramaža });
    });
  }

  dugmeZaPotvrdu.addEventListener("click", () => {
    upravljačZahtjevimaZaIshranu.uputiZahtjevZaProvjeruPrijave((greška, rezultat) => {
      upravljač.uputiZahtjevZaProvjeruPrijave((greška, rezultat) => {
        if (greška)
          location.href = "/html/prijava.html";
        else
          dodajJeloNaListu();
      });
    });
  });

  gramažaPolje.addEventListener("focus", () => {
    gramažaPolje.classList.remove("neispravanUnos");
  });

  generisanjeIzvještajaOIshrani.addEventListener("click", () => {
    upravljačZahtjevimaZaIshranu.uputiZahtjevZaSumarneNutritivneVrijednosti((greška, podaci) => {
      if (greška) {
        location.href = "/html/prijava.html";
        return;
      }
      upravljačZahtjevimaZaIshranu.uputiZahtjevZaDobavljanjeEnergetskihVrijedosti((pronađeni, energetskeVrijednosti) => {
        IzvještajOIshrani(korijen, {
          "izvještaj": {
            "nasloviKolona": [
              {
                "naslov": "",
                "klase": []
              },
              {
                "naslov": "Naziv",
                "klase": []
              },
              {
                "naslov": "Količina [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Energija [kcal]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Proteini [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Masti [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Saharidi [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Vitamin A [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Vitamin E [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Vitamin C [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Vitamin D [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Željezo [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Magnezij [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Cink [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Bakar [g]",
                "klase": ["zaglavljeBroj"]
              },
              {
                "naslov": "Selen [g]",
                "klase": ["zaglavljeBroj"]
              }
            ],
            "korisničkoIme": JSON.parse(podaci).korisničkoIme,
            "datum": JSON.parse(podaci).datum,
            "bmi": pronađeni == false ? JSON.parse(energetskeVrijednosti).bmi : "/",
            "tdee": pronađeni == false ? JSON.parse(energetskeVrijednosti).tdee : "/",
            "pojedinačneVrijednosti": JSON.parse(podaci).pojedinačneVrijednosti,
            "sumarneVrijednosti": JSON.parse(podaci).sumarneVrijednosti
          }
        });
      })
    });
  });

}