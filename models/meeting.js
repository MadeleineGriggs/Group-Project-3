module.exports = function(sequelize, DataTypes) {
  var Meeting = sequelize.define("Meeting", {
    date: {
      type: DataTypes.STRING,
      required: true
    },
    start: {
      type: DataTypes.STRING,
      required: true
    },
    end: {
      type: DataTypes.INTEGER,
      required: true
    }
  });
  return Meeting;
};
