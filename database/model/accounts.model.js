let mongoose = require("../connection/mongoose.connection");
const bcrypt = require("bcrypt");

const AccountSchema = new mongoose.Schema({
  name: { type: String, maxLength: 150, required: true, trim: true },
  email: {
    type: String,
    maxLength: 150,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});
/**
 * @param {*} password
 */
const SALT_WORK_FACTOR = 10;
AccountSchema.pre("save", function (next) {
  var account = this;
  // only hash the password if it has been modified (or is new)
  if (!account.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(account.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      account.password = hash;
      next();
    });
  });
});
AccountSchema.methods.comparePassword = function (password) {
  // console.log(password, password, this.password);
  return bcrypt.compareSync(password, this.password, (err, result) => {
    if (err) {
      console.log(err);
      console.error(
        "error when verifyPassword account password: ",
        err.message
      );
      return false;
    }
    return result;
  });
};

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
