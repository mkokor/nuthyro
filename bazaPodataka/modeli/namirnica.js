const { DataTypes } = require("sequelize");

module.exports = (konekcijaNaBazuPodataka) => {
  // Energija se zapisuje u "kcal", a ostale numeričke vrijednosti u gramima!
  const atributiModela = {
    "naziv": DataTypes.STRING,
    "referentnaMasa": DataTypes.DOUBLE,
    "energija": DataTypes.DOUBLE,
    "proteini": DataTypes.DOUBLE,
    "masti": DataTypes.DOUBLE,
    "ugljikohidrati": DataTypes.DOUBLE,
    "vitaminA": DataTypes.DOUBLE,
    "vitaminE": DataTypes.DOUBLE,
    "vitaminD": DataTypes.DOUBLE,
    "vitaminC": DataTypes.DOUBLE,
    "željezo": DataTypes.DOUBLE,
    "magnezij": DataTypes.DOUBLE,
    "cink": DataTypes.DOUBLE,
    "bakar": DataTypes.DOUBLE,
    "selen": DataTypes.DOUBLE,
    "ikona": DataTypes.BLOB
  }
  const dodatneOpcije = {
    "tableName": "Namirnica",
    "timestamps": false
  }
  return konekcijaNaBazuPodataka.define("Namirnica", atributiModela, dodatneOpcije);
}

