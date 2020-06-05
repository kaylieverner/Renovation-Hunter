module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
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
    },
    bid: {
      type: DataTypes.INTEGER
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


