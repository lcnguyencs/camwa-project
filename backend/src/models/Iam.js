const Iam = sequelize.define('Iam', {
    acc_id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    should_id: {
      type: DataTypes.STRING(45),
    },
    username: {
      type: DataTypes.STRING(45),
    },
    email: {
      type: DataTypes.STRING(45),
    },
    password: {
      type: DataTypes.STRING(45),
    },
    role: {
      type: DataTypes.STRING(45),
    },
  }, {
    tableName: 'iam',
    timestamps: false,
  });
  
  module.exports = Iam;
  