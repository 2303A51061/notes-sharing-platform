const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });
mongoose.connect("mongodb+srv://notesadmin:notes123@cluster0.q379ba3.mongodb.net/notesDB?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  file: String
});
const Note = mongoose.model("Note", noteSchema);

app.post("/upload", upload.single("file"), async (req,res)=>{

  const note = new Note({
    title: req.body.title,
    subject: req.body.subject,
    file: req.file.filename
  });

  await note.save();

  res.json({message:"Note uploaded with PDF"});
});

app.get("/notes", async (req,res)=>{
  const notes = await Note.find();
  res.json(notes);
});
app.delete("/notes/:id", async (req,res)=>{

  const id = req.params.id;

  await Note.findByIdAndDelete(id);

  res.json({message:"Note deleted"});

});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});