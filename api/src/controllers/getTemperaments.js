const { API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

var res = [];

const getTemperaments = async () => {
  const temDB = await Temperament.findAll();

  if (temDB.length === 0) {
    const temAPI = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      .then((r) => r.data)
      .then((dogs) => {
        let temperaments = dogs
          .filter((dog) => dog.temperament !== undefined)
          .map((dog) => dog.temperament.split(", "))
          .flat();
        return [...new Set(temperaments)];
      });

    for (let name of temAPI) {
      let newName = await Temperament.create({ name });
      res.push(newName);
    }
  } else {
    res = [...temDB];
  }

  return res;
};

module.exports = getTemperaments;
