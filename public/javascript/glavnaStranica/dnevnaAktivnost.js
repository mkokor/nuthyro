// Ovaj modul služi za kreiranje izgleda stranice za unos dnevne aktivnosti.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const DnevnaAktivnost = (korijen) => {
  
  const očistiKorijen = () => {
    korijen.innerText = "";
  }

  const kreirajIzgled = () => {
    const sadržaj = document.createElement("h1");
    sadržaj.innerText = "DNEVNA AKTIVNOST";
    očistiKorijen();
    korijen.appendChild(sadržaj);
  }

  kreirajIzgled();

}