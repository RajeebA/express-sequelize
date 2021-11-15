module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
