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
            validate: {isEmail: true}
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


    // User.associate = function(models) {
    //     User.hasMany(models.Item);
    // };

    return User;
};