const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Project = sequelize.define('Project', {
    project_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Projects'
});

Project.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Project;
