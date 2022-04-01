import InitModel from 'src/utils/initModel';
import sequelize from 'src/utils/initSequelize';
import { TABLENAME } from 'src/config/db';
import { DataTypes } from 'sequelize';

class Test extends InitModel {}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '名字',
    },
  },
  {
    sequelize,
    modelName: TABLENAME.TEST,
  },
);

export default Test;
