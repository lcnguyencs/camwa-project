import { DataTypes } from 'sequelize';
import sequelize from '../common/sequelize/connect.sequelize.js';

const Class = sequelize.define('Class', {
  class_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  intake_module_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: { model: 'IntakeModules', key: 'intake_module_id' },
  },
  class_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
  class_date: {
    type: DataTypes.DATE,
  },
  start_time: {
    type: DataTypes.TIME,
  },
  end_time: {
    type: DataTypes.TIME,
  },
  lecturer_id: {
    type: DataTypes.STRING(20),
    allowNull: true,
    references: { model: 'Lecturer', key: 'staff_id' },
  },
}, {
  tableName: 'class',
  timestamps: false,
});

// Association with IntakeModules (One-to-Many)
Class.belongsTo('IntakeModules', {
  foreignKey: 'intake_module_id',
  targetKey: 'intake_module_id',
});

// Association with Lecturer (One-to-Many)
Class.belongsTo('Lecturer', {
  foreignKey: 'lecturer_id',
  targetKey: 'staff_id',
});

export default Class;
