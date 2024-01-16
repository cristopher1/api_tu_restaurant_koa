import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations. This method is not a part of
     * Sequelize lifecycle. The `models/index` file will call this method
     * automatically.
     */
    static associate(models) {
      // define association here
      models.Dish.belongsTo(models.Menu, {
        foreignKey: {
          name: 'menu_id',
          allowNull: false,
        },
      })
    }
  }
  Dish.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priece: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB,
      },
    },
    {
      sequelize,
      modelName: 'Dish',
    },
  )
  return Dish
}
