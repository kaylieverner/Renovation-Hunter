module.exports = function(sequelize, DataTypes) {
  var Jobs = sequelize.define('Jobs', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    timeline: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Jobs.associate = function(models) {
    Jobs.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Jobs;
};