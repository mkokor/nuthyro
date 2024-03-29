const { DataTypes } = require("sequelize");

module.exports = (konekcijaNaBazuPodataka) => {
  const atributiModela = {
    "token": {
      "type": DataTypes.STRING,
      "allowNull": false
    }
  }
  const dodatneOpcije = {
    "tableName": "SigurnosniToken"
  }
  return konekcijaNaBazuPodataka.define("SigurnosniToken", atributiModela, dodatneOpcije);
}
