const { Schema } = require("mongoose");

const WatchlistSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
  type: Number,
  default: 0,
},

  percent: {
  type: String,
  default: "0.00%",
},

  isDown: {
    type: Boolean,
    default: false,
  },

});

module.exports = { WatchlistSchema };