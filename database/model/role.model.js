let mongoose = require("../connection/mongoose.connection");

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
});

const Role = mongoose.model("Role", schema);

module.exports = Role;
