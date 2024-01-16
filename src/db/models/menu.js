import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations. This method is not a part of
     * Sequelize lifecycle. The `models/index` file will call this method
     * automatically.
     */
    static associate(models) {
      // define association here
      models.Menu.belongsTo(models.Restaurant, {
        foreignKey: {
          name: 'restaurant_id',
          allowNull: false,
        },
      })
      models.Menu.hasMany(models.Dish, {
        foreignKey: {
          name: 'menu_id',
          allowNull: false,
        },
      })
    }
  }
  Menu.init(
    {},
    {
      sequelize,
      modelName: 'Menu',
    },
  )
  return Menu
}
