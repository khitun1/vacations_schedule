const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    left_days: {type: DataTypes.DOUBLE, allowNull: false},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    mail: {type: DataTypes.STRING, allowNull: false},
    md5password: {type: DataTypes.STRING, allowNull: false},
    is_admin: {type: DataTypes.BOOLEAN, allowNull: false},
    director: {type: DataTypes.BOOLEAN},
    allow: {type: DataTypes.BOOLEAN, defaultValue: 1},
    rules: {type: DataTypes.BOOLEAN, allowNull: false},
    actual_days: {type: DataTypes.INTEGER, defaultValue: 0},
    actual_date: {type: DataTypes.DATE, allowNull: false},
    accept_all: {type: DataTypes.BOOLEAN, defaultValue: 1},
})

const Department = sequelize.define('department', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    min: {type: DataTypes.INTEGER},
    total: {type: DataTypes.INTEGER},
    percents: {type: DataTypes.INTEGER},
    rules: {type: DataTypes.BOOLEAN, defaultValue: 0},
})

const Vacations = sequelize.define('vacations', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER},
    start: {type: DataTypes.DATE},
    end: {type: DataTypes.DATE},
    requested_date: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING},
    paid: {type: DataTypes.BOOLEAN},
    explanation: {type: DataTypes.TEXT},
})

const Wishes = sequelize.define('wishes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start: {type: DataTypes.DATE},
    end: {type: DataTypes.DATE},
})

const History = sequelize.define('history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user: {type: DataTypes.STRING},
    adminId: {type: DataTypes.INTEGER},
})

const CurrentYear = sequelize.define('currentYear', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    year: {type: DataTypes.DATEONLY},
})

User.hasMany(Vacations);
Vacations.belongsTo(User);

Department.hasMany(User);
User.belongsTo(Department);

User.hasMany(Wishes);
Wishes.belongsTo(User);

module.exports = {
    User, Department, Vacations, Wishes, History, CurrentYear
}