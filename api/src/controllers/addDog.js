const { Dog, Temperament } = require("../db");
const getTemperaments = require("./getTemperaments");

const addDog = async ({ name, height, weight, life_span, temperament, image }) => {
  await getTemperaments();

  const newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
  });

  if (Array.isArray(temperament) && temperament.length > 0) {
    for (let name of temperament) {
      const temDB = await Temperament.findOne({ where: { name } });
      await newDog.addTemperament(temDB);
    }
  }

  const newDogFromDB = await Dog.findOne({
    where: { id: newDog.id },
    include: [
      {
        model: Temperament,
        as: "temperament",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  }).then((results) => results.toJSON());

  newDogFromDB.temperament = newDogFromDB.temperament.map((t) => t.name);
  console.log("ACA ES", newDogFromDB);
  return newDogFromDB;
};

module.exports = addDog;
