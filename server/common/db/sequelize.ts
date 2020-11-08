import { Sequelize } from 'sequelize-typescript';
import l from '../logger';

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mariadb',
    models: [__dirname + '../../../models'],
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
      timezone: 'Asia/Seoul',
      collate: 'utf8mb4_general_ci',
    },
    define: {
      timestamps: true,
      charset: 'utf8mb4',
    },
    timezone: 'Asia/Seoul',
    logging:
      process.env.SEQUELIZE_LOG_ENABLE === 'true' ? msg => l.info(msg) : false,
    sync: {
      force: process.env.SEQUELIZE_SYNC_FORCE === 'true',
    },
  }
);

const connectSequelize = async (): Promise<Sequelize> => {
  try {
    if (process.env.SEQUELIZE_SYNC_INIT === 'true') {
      if (
        process.env.NODE_ENV === 'production' &&
        process.env.SEQUELIZE_SYNC_FORCE === 'true'
      ) {
        await sequelize.sync({ force: false });
      } else {
        await sequelize.sync();
      }
    }
    await sequelize.authenticate();
    l.info('Sequelize connection has been established successfully.');
    return sequelize;
  } catch (error) {
    l.info('Unable to Sequelize connect to the database:', error);
  }
};

export { sequelize, connectSequelize };
