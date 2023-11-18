// knexfile.js
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'database_store'
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  }
};
