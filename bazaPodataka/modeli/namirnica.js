const { DataTypes } = require("sequelize");

module.exports = (konekcijaNaBazuPodataka) => {
  const atributiModela = {
    "naziv": DataTypes.STRING,
    "ikona": DataTypes.BLOB
  }
  const dodatneOpcije = {
    "tableName": "Namirnica",
    "timestamps": false
  }
  return konekcijaNaBazuPodataka.define("Namirnica", atributiModela, dodatneOpcije);
}

