const { roles } = require('../config/roles');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
    {}
  );
  // eslint-disable-next-line no-unused-vars
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
