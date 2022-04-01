import { Sequelize } from 'sequelize';
import { DBCONFIG } from 'src/config/db';

const sequelize = new Sequelize({
  dialect: 'postgres',
  pool: {
    max: 50,
    min: 0,
    idle: 1000,
  },
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: false,
    freezeTableName: true,
  },
  ...DBCONFIG,
});

sequelize.sync({
  force: false,
});

export default sequelize;
