// Ovaj modul služi za kreiranje izgleda početne stranice.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const Početna = (korijen, pomoćneInformacije) => {
  
  const očistiKorijen = () => {
    korijen.innerText = "";
  }

  const kreirajOmotač = (id = null) => {
    const omotač = document.createElement("div");
    id == null ? null : omotač.id = id;
    return omotač;
  }

  const kreirajLabelu = (tekst) => {
    const labela = document.createElement("label");
    labela.innerText = tekst;
    return labela;
  }

  const kreirajIkonu = (urlSlike, alternativniTekst) => {
    const ikona = document.createElement("img");
    ikona.src = urlSlike;
    ikona.alt = alternativniTekst;
    return ikona;
  }

  const kreirajDugme = (id) => {
    const dugme = document.createElement("button");
    dugme.id = id;
    return dugme;
  }

  const kreirajParagraf = (id) => {
    const paragraf = document.createElement("p");
    paragraf.id = id;
    return paragraf;
  }

  const kreirajMeni = () => {

    const kreirajMeniStavku = (meniStavka) => {
      const stavka = document.createElement("div");
      stavka.id = meniStavka.id;
      stavka.classList.add("meniStavkaPočetna");
      stavka.appendChild(kreirajLabelu(meniStavka.naziv));
      stavka.appendChild(kreirajIkonu(meniStavka.ikona, meniStavka.alternativniTekst));
      return stavka;
    }

    const kreirajSekcijuTeksta = () => {

      const kreirajNaslov = () => {
        const omotačNaslova = kreirajOmotač("naslovPočetna");
        const naslov = document.createElement("h1");
        naslov.id = "naslovTeksta";
        const dugme = kreirajDugme("sakrijTekstDugme");
        dugme.appendChild(kreirajIkonu("../slike/ikone/strelicaGoreCrna.png", "sakrij"));
        omotačNaslova.appendChild(naslov);
        omotačNaslova.appendChild(dugme);
        return omotačNaslova;
      }

      const tekst = kreirajOmotač("tekstPočetna");
      tekst.appendChild(kreirajNaslov());
      tekst.appendChild(kreirajParagraf("sadržajTeksta"));

      return tekst;

    }

    const omotač = kreirajOmotač("meniPočetna");
    pomoćneInformacije.meniStavke.forEach(meniStavka => {
      omotač.appendChild(kreirajMeniStavku(meniStavka));
    });
    omotač.appendChild(kreirajSekcijuTeksta());

    return omotač;

  }

  const kreirajIzgled = () => {
    očistiKorijen();
    const početna = kreirajOmotač("početna");
    početna.appendChild(kreirajMeni());
    korijen.appendChild(početna);
  }

  kreirajIzgled();
  
  
  
  // Nakon što je korisnički interfejs generisan, moguće je postaviti
  // odgovarajuće EventListener-e na kontrole.


  const sadržajMeniStavke = document.getElementById("tekstPočetna");
  const hashimotoOboljenje = document.getElementById("hashimotoOboljenje");
  const prehrana = document.getElementById("prehrana");
  const oAplikaciji = document.getElementById("oAplikaciji");
  const sakrijTekstDugme = document.getElementById("sakrijTekstDugme");
  const naslovTeksta = document.getElementById("naslovTeksta");
  const sadržajTeksta = document.getElementById("sadržajTeksta");
  
  const prebaciStavku = (aktuelna, pasivne) => {
    aktuelna.classList.add("odabranaMeniStavkaPočetna");
    aktuelna.classList.remove("neodabranaMeniStavkaPočetna");
    pasivne.forEach(stavka => {
      stavka.classList.remove("odabranaMeniStavkaPočetna");
      stavka.classList.add("neodabranaMeniStavkaPočetna");
    });
  }

  hashimotoOboljenje.addEventListener("click", () => {
    prebaciStavku(hashimotoOboljenje, [prehrana, oAplikaciji]);
    sadržajMeniStavke.style.visibility = "visible";
    naslovTeksta.innerText = "Hashimoto oboljenje";
    sadržajTeksta.innerText = "Autoimune bolesti su bolesti koje nastaju zbog napada imunog sistema na zdravo tkivo. Imuni sistem stvara antitijela koja stanice zdravog tkiva prepoznaju kao bakterije, viruse ili druga strana tijela, te ih, kao takve napadaju. Hashimotov tireoiditis je jedna od najučestalijih autoimunih i endokrinoloških bolesti. Bolest se javlja u različitim životnim dobima, i ma da nije pravilo, od Hashimotovog tireoiditisa češće oboljevaju žene. Liječenju autoimune bolesti štitne žlijezde pristupa se kroz odgovarajuću terapiju propisanu od strane doktora endokrinologa, ali i kroz pravilnu ishranu i promjene u stilu života.";
  });

  prehrana.addEventListener("click", () => {
    prebaciStavku(prehrana, [hashimotoOboljenje, oAplikaciji]);
    sadržajMeniStavke.style.visibility = "visible";
    naslovTeksta.innerText = "Prehrana";
    sadržajTeksta.innerHTML = "Dijetoterapija je složenica nastala od riječi grčkog porijekla diaite i therapia što u prevodu označava liječenje dijetom. Ona stavlja težište na liječenje i/ili način življenja primjenom dijete osmišljene po individualnim potrebama, na način da bi se smanjila mogućnost pogoršanja odgovarajuće bolesti.<br>Slaganjem jelovnika dijetoterapije bave se dijetetičari nutricionisti.<br>Kako bi se svakodnevni jelovnici prilagodili potrebama osobe oboljele od Hashimotovog tireoiditisa, potrebno je posebnu pažnju posvetiti adekvatnom unosu makro i mikronutrijenata važnih za normalan rad štitne žlijezde, koji su, opet, u skladu s potrebama pojedinca.";
  });

  oAplikaciji.addEventListener("click", () => {
    prebaciStavku(oAplikaciji, [prehrana, hashimotoOboljenje]);
    sadržajMeniStavke.style.visibility = "visible";
    naslovTeksta.innerText = "O Aplikaciji";
    sadržajTeksta.innerText = "Ova aplikacija će poslužiti kao olakšavajuća alatka nutricionistima prilikom planiranja ishrane/slaganja jelovnika osobama koje su oboljele od autoimune bolesti štitne žlijezde. Forme koje je potrebno ispuniti nakon pristupa u aplikaciju, dat će uvid nutricionistima u antropometrijske parametre te prehrambene navike pacijenta, koje su nužne sa kreiranje plana prehrane.";
  });

  sakrijTekstDugme.addEventListener("click", () => {
    sadržajMeniStavke.style.visibility = "hidden";
    [hashimotoOboljenje, prehrana, oAplikaciji].forEach(stavka => {
      stavka.classList.remove("neodabranaMeniStavkaPočetna");
      stavka.classList.remove("odabranaMeniStavkaPočetna");
    });
  });

}