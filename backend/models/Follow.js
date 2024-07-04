// models/Follow.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Project = require('./Project');

const Follow = sequelize.define('Follow', {
    follow_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        }
    },
    followed_project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Project',
            key: 'project_id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

Follow.belongsTo(User, { foreignKey: 'follower_id' });
Follow.belongsTo(Project, { foreignKey: 'followed_project_id' });

module.exports = Follow;
