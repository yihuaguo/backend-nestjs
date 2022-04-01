let ENV = {
  LOC: {
    host: 'localhost',
    username: 'postgres',
    password: '842637',
    database: 'test',
    port: 5432,
  },
  DEV: {},
};

export const TABLENAME = {
  TEST: 'test',
};

export const DBCONFIG = ENV['LOC'];

export default {
  DBCONFIG,
  TABLENAME,
};
