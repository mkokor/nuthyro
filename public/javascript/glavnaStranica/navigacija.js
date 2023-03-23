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

const prebaciTab = (aktivne, pasivne, tekst) => {
  aktivne.forEach(stavka => { stavka.classList.add("aktivnaStavka"); });
  pasivne.forEach(stavka => stavka.classList.remove("aktivnaStavka"));
  sadržaj.innerHTML = `<h1>${tekst}</h1>`;
}

početna.forEach(stavka => {
  stavka.addEventListener("click", () => { 
    prebaciTab(početna, [...dnevnaAktivnost, ...ishrana], "POČETNA"); 
  });
});

dnevnaAktivnost.forEach(stavka => {
  stavka.addEventListener("click", () => { 
    prebaciTab(dnevnaAktivnost, [...početna, ...ishrana], "DNEVNA AKTIVNOST"); 
  });
});

ishrana.forEach(stavka => {
  stavka.addEventListener("click", () => { 
    prebaciTab(ishrana, [...dnevnaAktivnost, ...početna], "ISHRANA"); 
  });
});