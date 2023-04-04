const { DataTypes } = require("sequelize");

module.exports = (konekcijaNaBazuPodataka) => {
  const atributiModela = {
    "tip": {
      "type": DataTypes.ENUM("Neaktivan", "Slabo aktivan", "Umjereno aktivan", "Veoma aktivan", "Ekstremno aktivan")
    },
    "opis": DataTypes.STRING,
    "palVrijednost": DataTypes.DOUBLE   
  }
  const dodatneOpcije = {
    "tableName": "DnevnaAktivnost"
  }
  return konekcijaNaBazuPodataka.define("DnevnaAktivnost", atributiModela, dodatneOpcije);
}

