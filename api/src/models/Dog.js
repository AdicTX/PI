const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.Te
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Dog name is required.",
          },
          is: {
            args: /^[a-zA-Z\s]+$/,
            msg: "Name format is invalid.",
          },
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Dog name is required.",
          },
          is: {
            args: /^([0-9]{1,2}) - ([0-9]{1,2})$/,
            msg: "Height format is invalid.",
          },
        },
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^([0-9]{1,2}) - ([0-9]{1,2})$/,
            msg: "Weight format is invalid.",
          },
        },
      },
      life_span: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^([0-9]{1,2}) - ([0-9]{1,2})$/,
            msg: "Life span format is invalid.",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "Image url is invalid.",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
