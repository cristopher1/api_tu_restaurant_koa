import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations. This method is not a part of
     * Sequelize lifecycle. The `models/index` file will call this method
     * automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Restaurant, {
        foreignKey: {
          name: 'owner_email',
          allowNull: false,
        },
      })
    }
  }
  User.init(
    {
      email: {
        primaryKey: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'This is not a valid email',
          },
        },
      },
      names: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'The names only can contain letters',
          },
        },
      },
      surnames: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'The surnames only can contain letters',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
