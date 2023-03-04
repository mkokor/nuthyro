// KONTROLE KORISNIČKOG INTERFEJSA

const zatvaranjePomoćnogMenija = document.getElementById("zatvaranje");
const pomoćniMeni = document.getElementById("pomoćniMeni");
const otvaranjePomoćnogMenija = document.getElementById("hamburgerMeni");
const navigacija = document.getElementById("navigacija");
const stavkeMenija = Array.from(document.getElementsByClassName("meniStavka"));


// FUNKCIJE ZA OBRADU JEDNOSTAVNIH KORISNIČKIH RADNJI

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