// KONTROLE KORISNIČKOG INTERFEJSA I VARIJABLE

const zatvaranjePomoćnogMenija = document.getElementById("zatvaranje");
const pomoćniMeni = document.getElementById("pomoćniMeni");
const otvaranjePomoćnogMenija = document.getElementById("hamburgerMeni");
const navigacija = document.getElementById("navigacija");
const stavkeMenija = Array.from(document.getElementsByClassName("meniStavka"));
const sadržaj = document.getElementById("sadržaj");
const opcijeOdjave = Array.from(document.getElementsByClassName("opcijaOdjave"));

const upravljačZahtjevima = UpravljačZahtjevima;


// FUNKCIJE ZA OBRADU JEDNOSTAVNIH KORISNIČKIH RADNJI

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