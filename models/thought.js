const { Schema, model } = require('mongoose');
const reaction = require('./reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date => date.toString().match(/[A-Za-z]{3}\s\d{2}\s\d{4}/)[0]
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reaction],
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought;