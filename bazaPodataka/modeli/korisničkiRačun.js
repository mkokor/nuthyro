const { DataTypes } = require("sequelize");

module.exports = (konekcijaNaBazuPodataka) => {
  const atributiModela = {
    "email": DataTypes.STRING,
    "korisničkoIme": DataTypes.STRING,
    "kodLozinke": DataTypes.STRING 
  }
  const dodatneOpcije = {
    "tableName": "KorisničkiRačun"
  }
  return konekcijaNaBazuPodataka.define("KorisničkiRačun", atributiModela, dodatneOpcije);
}

