// Ovaj modul služi za kreiranje izgleda stranice sa izvještajem o ishrani.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const upravljačZahtjevimaZaIzvještaj = UpravljačZahtjevima;


const IzvještajOIshrani = (korijen, pomoćneInformacije) => {

    // POMOĆNE FUNKCIJE ZA RAD MODULA I NJEGOVIH KOMPONENTI

    const očistiKorijen = () => {
      korijen.innerText = "";
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

    const kreirajOmotač = (id = null) => {
      const omotač = document.createElement("div");
      id == null ? null : omotač.id = id;
      return omotač;
    }

    const kreirajDugmeSaIkonom = (putanja, alternativniTekst) => {
      const ikona = document.createElement("img");
      ikona.src = putanja;
      ikona.alt = alternativniTekst;
      return ikona;      
    }

    const kreirajPodatakTabele = () => {
      const podatak = document.createElement("div");
      podatak.classList.add("podatakIzvještaja");
      return podatak;
    }

    const dajNaziveAtributa = (nasloviKolona) => {
      return nasloviKolona.filter(naslov => naslov.naslov != "")
                          .map(naslov => {
                            let neobrađenaRiječ = (naslov.naslov).split("[")[0];
                            neobrađenaRiječ = neobrađenaRiječ.charAt(0).toLowerCase() + neobrađenaRiječ.slice(1);
                            let obrađenaRiječ = neobrađenaRiječ.split(" ").join("")
                            return obrađenaRiječ == "saharidi" ? "ugljikohidrati" : (obrađenaRiječ == "količina" ? "gramaža" : obrađenaRiječ); 
                          });
    }

  
    // KOMPONENTE MODULA

    const kreirajNaslovIzvještaja = () => {

      const kreirajSekcijuNaziva = () => {
        const omotač = kreirajOmotač(null);
        const naslov = document.createElement("h1");
        naslov.innerText = "Izvještaj o ishrani";
        const povratniLink = document.createElement("a");
        povratniLink.innerText = "Nastavi unos";
        povratniLink.id = "povratniLink";
        omotač.appendChild(naslov);
        omotač.appendChild(povratniLink);
        return omotač;
      }

      const kreirajPorukuUpozorenja = () => {

        const kreirajIkonuUpozorenja = () => {
          const omotač = kreirajOmotač();
          const ikona = document.createElement("img");
          ikona.src = "../slike/ikone/upozorenje.png";
          ikona.alt = "upozorenje";
          omotač.appendChild(ikona);
          return omotač;
        }

        const kreirajTekst = () => {
          const omotač = kreirajOmotač();
          const naslov = document.createElement("h1");
          naslov.innerText = "Nepotpun unos!"
          const opis = document.createElement("p");
          opis.innerText = "Popunite formu Nutri Kalkulatora kako bi generisali vrijednosti BMI i TDEE.";
          omotač.appendChild(naslov);
          omotač.appendChild(opis);
          return omotač;
        }

        const porukaUpozorenja = kreirajOmotač("porukaUpozorenja");
        porukaUpozorenja.appendChild(kreirajIkonuUpozorenja());
        porukaUpozorenja.appendChild(kreirajTekst());
        porukaUpozorenja.classList.add("porukaUpozorenja");
        
        return porukaUpozorenja;
      
      }

      const kreirajSekcijuObavijesti = () => {
        const omotač = kreirajOmotač("porukaObavijesti");
        const obavijest = kreirajOmotač("porukaObavijestiJson");
        obavijest.innerText = "Preuzmite izvještaj u JSON formatu"
        omotač.appendChild(obavijest);
        return omotač;
      }

      const kreirajDugmeZaPreuzimanjeIzvještaja = () => {
        const dugme = document.createElement("button");
        dugme.id = "dugmeZaPreuzimanje";
        dugme.appendChild(kreirajDugmeSaIkonom("../slike/ikone/preuzmi.png", "preuzmi"));
        return dugme; 
      }

      const naslovIzvještaja = kreirajOmotač("naslovIzvještaja");
      naslovIzvještaja.appendChild(kreirajSekcijuNaziva());
      naslovIzvještaja.appendChild(kreirajPorukuUpozorenja());
      naslovIzvještaja.appendChild(kreirajSekcijuObavijesti());
      naslovIzvještaja.appendChild(kreirajDugmeZaPreuzimanjeIzvještaja());

      return naslovIzvještaja;

    }

    const kreirajTabeluIzvještaja = (nasloviKolona, pojedinačneVrijednosti, sumarneVrijednosti) => {

      const kreirajZaglavlje = () => {
        const zaglavlje = kreirajOmotač("zaglavlje");
        nasloviKolona.forEach(naslov => {
          const omotačNaslova = document.createElement("div");
          naslov.klase.forEach(klasa => {
            omotačNaslova.classList.add(klasa);
          });
          omotačNaslova.innerText = naslov.naslov;
          zaglavlje.appendChild(omotačNaslova);
        });
        return zaglavlje;
      }

      const kreirajIzvještajONamirnici = (namirnica) => {

        const kreirajIkonuNamirnice = () => {
          const ikona = document.createElement("img");
          ikona.src = `/ikonaNamirnice/${namirnica.id}`;
          ikona.alt = "ikona";
          const ikonaPolje = kreirajPodatakTabele();
          ikonaPolje.appendChild(ikona);
          return ikonaPolje;
        }

        const omotač = document.createElement("div");
        omotač.classList.add("izvještajONamirnici");
        const podaci = dajNaziveAtributa(nasloviKolona);
        omotač.appendChild(namirnica.hasOwnProperty("id") ? kreirajIkonuNamirnice() : kreirajOmotač(null));
        podaci.forEach(podatak => {
          const podatakPolje = kreirajPodatakTabele();
          let vrijednost = namirnica[podatak];
          if (podatak != "naziv") {
            podatakPolje.classList.add("brojUIzvještaju");
            vrijednost = vrijednost.toFixed(3);
          }
          podatakPolje.innerText = vrijednost;
          omotač.append(podatakPolje);
        });

        return omotač;

      }

      const kreirajIzvještajONamirnicama = (namirnice) => {
        const omotač = kreirajOmotač("pojedinačneNamirnice");
        if (namirnice.length == 0)
          omotač.appendChild(kreirajObavijestOPraznomOdabiru());
        else
          namirnice.forEach(vrijednost => {
            omotač.appendChild(kreirajIzvještajONamirnici(vrijednost));
          });
        return omotač;
      }

      const kreirajTotale = (totalneVrijednosti) => {
        let totali = kreirajIzvještajONamirnici(totalneVrijednosti);
        totali.classList.remove("izvještajONamirnici");
        totali.id = "totalneVrijednosti";
        totali.childNodes.forEach(podatak => { podatak.classList.remove("podatakIzvještaja"); });
        totali.childNodes[1].id = "totalNaziv";
        return totali;
      }

      const omotač = kreirajOmotač("tabelaIzvještaja");
      omotač.appendChild(kreirajZaglavlje());
      omotač.appendChild(kreirajIzvještajONamirnicama(pojedinačneVrijednosti));
      omotač.appendChild(kreirajTotale(sumarneVrijednosti));
      
      return omotač;

    }

  
    // GLAVNA FUNKCIJA
  
    const kreirajIzgled = () => {
      očistiKorijen();
      const omotačZaIzvještaj = kreirajOmotač("izvještajOIshrani");
      omotačZaIzvještaj.appendChild(kreirajNaslovIzvještaja()); 
      omotačZaIzvještaj.appendChild(kreirajTabeluIzvještaja(pomoćneInformacije.izvještaj.nasloviKolona, pomoćneInformacije.izvještaj.pojedinačneVrijednosti, pomoćneInformacije.izvještaj.sumarneVrijednosti));
      korijen.appendChild(omotačZaIzvještaj);
    }
  
    kreirajIzgled();
  
  
  
    // Nakon što je korisnički interfejs generisan, moguće je postaviti
    // odgovarajuće EventListener-e na kontrole.


    const dugmeZaPreuzimanje = document.getElementById("dugmeZaPreuzimanje");
    const porukaObavijesti = document.getElementById("porukaObavijesti");
    const povratniLink = document.getElementById("povratniLink");
    const porukaUpozorenja = Array.from(document.getElementsByClassName("porukaUpozorenja"))[0];


    dugmeZaPreuzimanje.addEventListener("mouseover", () => {
      porukaObavijesti.style.opacity = "1";
    });

    dugmeZaPreuzimanje.addEventListener("mouseleave", () => {
      porukaObavijesti.style.opacity = "0";
    });

    dugmeZaPreuzimanje.addEventListener("click", () => {
      if (pomoćneInformacije.izvještaj.bmi == "/") {
        porukaUpozorenja.style.opacity = "1";
        setTimeout(() => {
          porukaUpozorenja.style.opacity = "0";
        }, 5000);
        return;
      }
      upravljačZahtjevimaZaIzvještaj.uputiZahtjevZaProvjeruPrijave((greška, podaci) => {
        if (greška) {
          location.href = "/html/prijava.html";
          return;
        }
        const izvještaj = {
          "datum": pomoćneInformacije.izvještaj.datum,
          "korisničkoIme": pomoćneInformacije.izvještaj.korisničkoIme,
          "mjernaJedinicaZaEnergiju": "kcal",
          "mjernaJedinicaZaMasu": "g",
          "bmi": pomoćneInformacije.izvještaj.bmi,
          "tdee": pomoćneInformacije.izvještaj.tdee,
          "pojedinačneNamirnice": pomoćneInformacije.izvještaj.pojedinačneVrijednosti.sort((a, b) => (a.id > b.id ? 1 : -1)),
          "sumarneVrijednosti": pomoćneInformacije.izvještaj.sumarneVrijednosti
        }
        const blob = new Blob([JSON.stringify(izvještaj, null, 2)], { "type": "application/json"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "izvještajOIshrani.json");
        link.click();
      });
    });

    povratniLink.addEventListener("click", () => {
      upravljačZahtjevimaZaIzvještaj.uputiZahtjevZaDobavljanjeDostupnihNamirnica((greška, rezultat) => {
        if (greška) {
          location.href = "/html/prijava.html";
          return;
        }
        Ishrana(korijen, {
          "uputeZaKorisnika": "Unesite namirnice koje ste konzumirali u toku dana, a NuThyro će Vam prikazati količinu važnih nutrijenata koji su obuhvaćeni Vašom ishranom.",
          "dostupnaJela": JSON.parse(rezultat)
        });
      }); 
    });

}
