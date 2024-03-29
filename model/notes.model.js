import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

const notesConnection = mongoose.model("note", NotesSchema);

export default notesConnection;
