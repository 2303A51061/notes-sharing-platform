async function uploadNote(){

const title = document.getElementById("title").value;
const subject = document.getElementById("subject").value;
const file = document.getElementById("file").files[0];

const formData = new FormData();

formData.append("title", title);
formData.append("subject", subject);
formData.append("file", file);

await fetch("http://localhost:5000/upload",{
method:"POST",
body:formData
});

loadNotes();
}
async function loadNotes(){

const res = await fetch("http://localhost:5000/notes");
const data = await res.json();

const notesDiv = document.getElementById("notes");

notesDiv.innerHTML = "";

data.forEach(note => {

notesDiv.innerHTML += `
<div class="note">
<h3>${note.title}</h3>
<p>${note.subject}</p>
<a href="http://localhost:5000/uploads/${note.file}" target="_blank">
Download PDF
</a>

<button onclick="deleteNote('${note._id}')">
Delete
</button>
</div>
`;

});

}

loadNotes();
async function deleteNote(id){

await fetch(`http://localhost:5000/notes/${id}`,{
method:"DELETE"
});

loadNotes();

async function searchNotes(){
    if(keyword === ""){
    loadNotes();
    return;
    }

const keyword = document.getElementById("search").value.toLowerCase();

const res = await fetch("http://localhost:5000/notes");
const data = await res.json();

const notesDiv = document.getElementById("notes");

notesDiv.innerHTML = "";

data.forEach(note => {

if(note.subject.toLowerCase().includes(keyword)){

notesDiv.innerHTML += `
<div class="note">
<h3>${note.title}</h3>
<p>${note.subject}</p>

<a href="http://localhost:5000/uploads/${note.file}" target="_blank">
Download PDF
</a>

<button onclick="deleteNote('${note._id}')">
Delete
</button>

</div>
`;

}

});

}

}