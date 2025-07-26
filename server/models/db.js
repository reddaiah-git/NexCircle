const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // This will create a file named database.sqlite in the server directory
  logging: false, // Disable logging SQL queries to the console
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite connection has been established successfully.');
    // Synchronize models with the database
    await sequelize.sync({ alter: true }); // `alter: true` will update the table if it already exists
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, DataTypes, connectDB };
