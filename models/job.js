module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
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
      // allowNull: false
    },
    timeframe: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Job.associate = function(models) {
    Job.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Job;
};
