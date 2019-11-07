var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hourlyrate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cancreatemeet: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = function(models) {
    User.hasMany(models.Attendees);
  };

  return User;
};
