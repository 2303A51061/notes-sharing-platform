const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
title:String,
subject:String
});

module.exports = mongoose.model("Note",NoteSchema);