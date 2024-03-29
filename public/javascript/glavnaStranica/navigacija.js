// KONTROLE KORISNIČKOG INTERFEJSA I VARIJABLE

const zatvaranjePomoćnogMenija = document.getElementById("zatvaranje");
const pomoćniMeni = document.getElementById("pomoćniMeni");
const otvaranjePomoćnogMenija = document.getElementById("hamburgerMeni");
const navigacija = document.getElementById("navigacija");
const opcijeOdjave = Array.from(document.getElementsByClassName("opcijaOdjave"));
const početna = Array.from(document.getElementsByClassName("početna"));
const dnevnaAktivnost = Array.from(document.getElementsByClassName("dnevnaAktivnost"));
const ishrana = Array.from(document.getElementsByClassName("ishrana"));
const sadržaj = document.getElementById("sadržaj");
const zatamnjivač = document.getElementById("zatamnjivač");

const upravljačZahtjevima = UpravljačZahtjevima;


window.onload = () => {
  upravljačZahtjevima.uputiZahtjevZaProvjeruPrijave((greška, sadržaj) => {
    if (greška)
      location.href = "/html/prijava.html";
    else {
      prebaciTab(početna, [...dnevnaAktivnost, ...ishrana], Početna, {
        "meniStavke": [
          {
            "id": "hashimotoOboljenje",
            "naziv": "Hashimoto oboljenje",
            "ikona": "../slike/ikone/štitnaŽlijezda.png",
            "alternativniTekst": "štitnaŽlijezda",
          },
          {
            "id": "prehrana",
            "naziv": "Prehrana",
            "ikona": "../slike/ikone/jabuka.png",
            "alternativniTekst": "jabuka",
          },
          {
            "id": "oAplikaciji",
            "naziv": "O Aplikaciji",
            "ikona": "../slike/ikone/oAplikaciji.png",
            "alternativniTekst": "oAplikaciji",
          },
        ]
      });
    }
  });
}

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}

zatvaranjePomoćnogMenija.addEventListener("click", () => {
  pomoćniMeni.style.marginRight = "-170px";
});

otvaranjePomoćnogMenija.addEventListener("click", () => {
  pomoćniMeni.style.marginRight = "0px";
});

opcijeOdjave.forEach(opcijaOdjave => {
  opcijaOdjave.addEventListener("click", () => {
    upravljačZahtjevima.uputiZahtjevZaOdjavu((greška, sadržaj) => {
      location.href = "/html/prijava.html";
    });
  });
});

const prebaciTab = (aktivne, pasivne, generišiSadržaj, drugiParametarZaGenerisanje = null) => {
  upravljačZahtjevima.uputiZahtjevZaProvjeruPrijave((greška, rezultat) => {
    if (greška) {
      location.href = "/html/prijava.html";
      return;
    }
    aktivne.forEach(stavka => { stavka.classList.add("aktivnaStavka"); });
    pasivne.forEach(stavka => stavka.classList.remove("aktivnaStavka"));
    if (drugiParametarZaGenerisanje)
      generišiSadržaj(sadržaj, drugiParametarZaGenerisanje);
    else
      generišiSadržaj(sadržaj);
  });
}

const prebaciNaDnevnuAktivnost = () => {
  upravljačZahtjevima.uputiZahtjevZaTipoveAktivnosti((greška, rezultat) => {
    if (greška) {
      location.href = "/html/prijava.html";
      return;
    }
    prebaciTab(dnevnaAktivnost, [...početna, ...ishrana], DnevnaAktivnost, {
      "tipoviAktivnosti": JSON.parse(rezultat).tipoviAktivnosti,
      "infoTekst": "BMI (eng. <i>Body Mass Index</i>) je vrijednost kojom se definiše stepen uhranjenosti. Skala vrijednosti glasi: <br />1. Pothranjenost (< 18.5)<br />2. Adekvatna tjelesna masa (18.5 - 24.9)<br />3. Prekomjerna tjelesna masa (25 - 29.9)<br />4. Gojaznost prvog stepena (30 - 34.9)<br />5. Gojaznost drugog stepena (> 35)<br />TDEE (eng. <i>Total Daily Energy Expenditure</i>) vrijednost je koja pokazuje broj kalorija koje naše tijelo troši unutar jednog dana.",
      "nutriVrijednosti": [{
        "skraćenica": "BMI",
        "puniNaziv": "Body Mass Index"
      }, {
        "skraćenica": "TDEE [kcal/dan]",
        "puniNaziv": "Total Daily Energy Expenditure "
      }]
    });
  }); 
}

const prebaciNaIshranu = () => {
  upravljačZahtjevima.uputiZahtjevZaDobavljanjeDostupnihNamirnica((greška, rezultat) => {
    if (greška) {
      location.href = "/html/prijava.html";
      return;
    }
    prebaciTab(ishrana, [...dnevnaAktivnost, ...početna], Ishrana, {
      "uputeZaKorisnika": "Unesite namirnice koje ste konzumirali u toku dana, a NuThyro će Vam prikazati količinu važnih nutrijenata koji su obuhvaćeni Vašom ishranom.",
      "dostupnaJela": JSON.parse(rezultat)
    });
  }); 
}

početna.forEach(stavka => {
  stavka.addEventListener("click", () => { 
    prebaciTab(početna, [...dnevnaAktivnost, ...ishrana], Početna, {
      "meniStavke": [
        {
          "id": "hashimotoOboljenje",
          "naziv": "Hashimoto oboljenje",
          "ikona": "../slike/ikone/štitnaŽlijezda.png",
          "alternativniTekst": "štitnaŽlijezda",
        },
        {
          "id": "prehrana",
          "naziv": "Prehrana",
          "ikona": "../slike/ikone/jabuka.png",
          "alternativniTekst": "jabuka",
        },
        {
          "id": "oAplikaciji",
          "naziv": "O Aplikaciji",
          "ikona": "../slike/ikone/oAplikaciji.png",
          "alternativniTekst": "oAplikaciji",
        },
      ]
    }); 
  });
});

dnevnaAktivnost.forEach(stavka => {
  stavka.addEventListener("click", prebaciNaDnevnuAktivnost);
});

ishrana.forEach(stavka => {
  stavka.addEventListener("click", prebaciNaIshranu);
});