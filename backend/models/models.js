const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    left_days: {type: DataTypes.INTEGER},
    login: {type: DataTypes.STRING, unique: true},
    md5password: {type: DataTypes.STRING},
    is_admin: {type: DataTypes.BOOLEAN},
})

const Department = sequelize.define('department', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    min: {type: DataTypes.INTEGER},
    max: {type: DataTypes.INTEGER},
    total: {type: DataTypes.INTEGER},
    percents: {type: DataTypes.INTEGER},
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

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Wishes = sequelize.define('wishes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start: {type: DataTypes.DATE},
    end: {type: DataTypes.DATE},
})

User.hasMany(Vacations);
Vacations.belongsTo(User);

Department.hasMany(User);
User.belongsTo(Department);

Type.hasMany(Vacations);
Vacations.belongsTo(Type);

User.hasMany(Wishes);
Wishes.belongsTo(User);

module.exports = {
    User, Department, Type, Vacations, Wishes,
}