module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Project.associate = function(models) {
    Project.hasMany(models.Meeting);
  };

  return Project;
};
