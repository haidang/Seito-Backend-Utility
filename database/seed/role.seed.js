const logger = require("../../lib/winston");

const db = require("../model");
const Role = db.Role;

const seeder = () => {
  const data = [{ name: "user" }, { name: "moderator" }, { name: "admin" }];

  data.forEach((item) => {
    Role.findOne({ name: item.name }, (err, roleExist) => {
      if (err) {
        if (err.name !== "MongooseError") {
          logger.error(
            "error when find role '" + item.name + "': " + err.message
          );
        }
        return;
      }
      if (roleExist === undefined || roleExist === null) {
        new Role(item).save((err) => {
          if (err) {
            logger.error(
              "error when save role '" + item.name + "': " + err.message
            );
            return;
          }
          logger.info("add role '" + item.name + "' successfully");
        });
      } else {
        // logger.info("role '" + item.name + "' already exist");
      }
    });
  });
};

module.exports = seeder;
