var mongoose = require("mongoose");

var schema = mongoose.schema;

var noteSchema = new schema({
    headlineId: {
        type: schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: {
        type: Boolean,
        default: false
    }
});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;