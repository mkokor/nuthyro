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

const upravljačZahtjevima = UpravljačZahtjevima;


window.onload = () => {
  upravljačZahtjevima.uputiZahtjevZaProvjeruPrijave((greška, sadržaj) => {
    if (greška)
      location.href = "/html/prijava.html";
  });
}

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}

zatvaranjePomoćnogMenija.addEventListener("click", () => {
  pomoćniMeni.style.marginRight = "-170px";
  navigacija.style.backgroundColor = "#e6f8ea";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
});

otvaranjePomoćnogMenija.addEventListener("click", () => {
  pomoćniMeni.style.marginRight = "0px";
  navigacija.style.backgroundColor = "rgba(0, 0, 0, 0)";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
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
      "infoTekst": "A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.",
      "nutriVrijednosti": [{
        "skraćenica": "BMR",
        "puniNaziv": "Basal Metabolic Rate"
      }, {
        "skraćenica": "TDEE",
        "puniNaziv": "Total Daily Energy Expenditure "
      }]
    });
  }); 
}

početna.forEach(stavka => {
  stavka.addEventListener("click", () => { 
    prebaciTab(početna, [...dnevnaAktivnost, ...ishrana], Početna); 
  });
});

dnevnaAktivnost.forEach(stavka => {
  stavka.addEventListener("click", prebaciNaDnevnuAktivnost);
});

ishrana.forEach(stavka => {
  stavka.addEventListener("click", () => { 
    prebaciTab(ishrana, [...dnevnaAktivnost, ...početna], Ishrana); 
  });
});