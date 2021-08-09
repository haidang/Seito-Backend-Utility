const logger = require("../../lib/winston");

const db = require("../model");
const Account = db.Account;
const Role = db.Role;

const seeder = async () => {
  const data = [
    {
      name: "admin",
      email: "nvanhaidang@gmail.com",
      password: "Admin123@321",
      roles: ["admin"],
    },
    {
      name: "user",
      email: "thachhaidangit@gmail.com",
      password: "user1234",
      roles: ["user"],
    },
  ];

  await data.forEach((item) => {
    Account.findOne({ email: item.email }, (err, accountExist) => {
      if (err) {
        if (err.name !== "MongooseError") {
          logger.error(
            "error when find account '" + item.name + "': " + err.message
          );
        }
        return;
      }
      if (accountExist === undefined || accountExist === null) {
        let arrRoles = item.roles;
        delete item.roles;
        new Account(item).save((err, account) => {
          if (err) {
            logger.error(
              "error when save account '" + item.name + "': " + err.message
            );
            return;
          }
          Role.find(
            {
              name: { $in: arrRoles },
            },
            (err, roles) => {
              if (err) {
                logger.error(
                  "error when find role for account '" + account.name + "'"
                );
                return;
              }

              account.roles = roles.map((role) => role._id);
              account.save((err) => {
                if (err) {
                  logger.error(
                    "error when save role for account '" + account.name + "'"
                  );
                  return;
                }
              });
            }
          );
          logger.info("add account '" + item.name + "' successfully");
        });
      } else {
        // logger.info("account '" + item.name + "' already exist");
      }
    });
  });
};

module.exports = seeder;
