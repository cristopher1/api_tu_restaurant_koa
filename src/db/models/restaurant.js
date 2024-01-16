import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations. This method is not a part of
     * Sequelize lifecycle. The `models/index` file will call this method
     * automatically.
     */
    static associate(models) {
      // define association here
      models.Restaurant.belongsTo(models.User, {
        foreignKey: {
          name: 'owner_email',
          allowNull: false,
        },
      })
      models.Restaurant.hasOne(models.Menu, {
        foreignKey: {
          name: 'restaurant_id',
          allowNull: false,
        },
      })
    }
  }
  Restaurant.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      business_hour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tables_availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      web_page: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Restaurant',
    },
  )
  return Restaurant
}
