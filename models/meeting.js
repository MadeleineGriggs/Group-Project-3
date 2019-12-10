module.exports = function(sequelize, DataTypes) {
  var Meeting = sequelize.define("Meeting", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
    title: {
      type: DataTypes.STRING
    },
    attendees: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    prodId: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.STRING
    }
  });

  Meeting.associate = function(models) {
    Meeting.hasMany(models.Attendees);
    Meeting.belongsTo(models.Project)
  };

  return Meeting;
};
