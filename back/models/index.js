const Sequelize = require("sequelize");
// 기본값으로 development가 들어있다. 즉 env는 development
const env = process.env_NODE_ENV || "development";
// 즉 여기서는 env가 development이다. 만든 config.json을 require했다.
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.usename,
  config.password,
  config
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./Hashtag")(sequelize, Sequelize);
db.Image = require("./Image")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
