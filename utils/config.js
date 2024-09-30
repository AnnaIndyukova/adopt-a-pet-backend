const { JWT_SECRET = "secret-dev" } = process.env;
const { DB_ADDRESS = "mongodb://127.0.0.1:27017/adopt_db" } = process.env;
module.exports = { JWT_SECRET, DB_ADDRESS };
