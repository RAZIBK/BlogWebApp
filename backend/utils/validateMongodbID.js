const mongoose = require("mongoose");

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("this id is  not valid or found");
};

module.exports = validateMongodbId;
