// Ovaj modul služi za kreiranje izgleda početne stranice.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const Početna = (korijen) => {
  
  const očistiKorijen = () => {
    korijen.innerText = "";
  }

  const kreirajIzgled = () => {
    const sadržaj = document.createElement("h1");
    sadržaj.innerText = "POČETNA";
    očistiKorijen();
    korijen.appendChild(sadržaj);
  }

  kreirajIzgled();

}