const { sequelize, DataTypes } = require('./db');
const User = require('./userModel');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // This is a reference to the User model
      key: 'id',
    },
  },
});

// Define association: An Event belongs to a User (organizer)
Event.belongsTo(User, { foreignKey: 'organizer', as: 'organizerUser' });
User.hasMany(Event, { foreignKey: 'organizer', as: 'organizedEvents' });

module.exports = Event;
