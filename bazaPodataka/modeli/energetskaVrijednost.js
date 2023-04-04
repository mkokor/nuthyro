// Model će se možda naknadno proširiti podacima na osnovu kojih 
// su izračunate energetske vrijednosti (tj. spol, visina, težina, dob i tip aktivnosti).


const { DataTypes } = require("sequelize");

module.exports = (konekcijaNaBazuPodataka) => {
  const atributiModela = {
    "bmr": DataTypes.DOUBLE,
    "tdee": DataTypes.DOUBLE
  }
  const dodatneOpcije = {
    "tableName": "EnergetskaVrijednost"
  }
  return konekcijaNaBazuPodataka.define("EnergetskaVrijednost", atributiModela, dodatneOpcije);
}