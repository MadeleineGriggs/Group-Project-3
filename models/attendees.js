module.exports = function(sequelize, DataTypes) {
  var Attendees = sequelize.define("Attendees", {
    // mId: {
    //   type: DataTypes.INTEGER,
    //   required: true
    // },
    // uId: {
    //   type: DataTypes.INTEGER,
    //   required: true
    // }
  });

  return Attendees;
};
