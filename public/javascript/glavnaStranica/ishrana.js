// Ovaj modul služi za kreiranje izgleda stranice za unos dnevne ishrane.
// Korijen je element tipa "div" unutar kojeg će kompletan sadržaj
// ove stranice biti pohranjen.


const Ishrana = (korijen) => {
  
  const očistiKorijen = () => {
    korijen.innerText = "";
  }

  const kreirajIzgled = () => {
    const sadržaj = document.createElement("h1");
    sadržaj.innerText = "ISHRANA";
    očistiKorijen();
    korijen.appendChild(sadržaj);
  }

  kreirajIzgled();

}