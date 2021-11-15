const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(roles),
        allowNull: false,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    }
  );
  Model.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };
  User.addHook('beforeCreate', async (password) => {
    const user = this;
    user.password = await bcrypt.hash(password, 8);
  });
  return User;
};
