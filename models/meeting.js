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
      type: DataTypes.STRING,
      required: true
    },
    attendees: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Meeting.associate = function(models) {
    Meeting.hasMany(models.Attendees);
  };

  return Meeting;
};
