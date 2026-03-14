const API_URL = "https://notes-api-ty5u.onrender.com";

async function uploadNote(){

const title = document.getElementById("title").value;
const subject = document.getElementById("subject").value;
const file = document.getElementById("file").files[0];

const formData = new FormData();

formData.append("title", title);
formData.append("subject", subject);
formData.append("file", file);

await fetch(`${API_URL}/upload`,{
method:"POST",
body:formData
});

loadNotes();
}

async function loadNotes(){

const res = await fetch(`${API_URL}/notes`);
const data = await res.json();

const notesDiv = document.getElementById("notes");

notesDiv.innerHTML = "";

data.forEach(note => {

notesDiv.innerHTML += `
<div class="note">
<h3>${note.title}</h3>
<p>${note.subject}</p>

<a href="${API_URL}/uploads/${note.file}" target="_blank">
Download PDF
</a>

<button onclick="deleteNote('${note._id}')">
Delete
</button>

</div>
`;

});

}

async function deleteNote(id){

await fetch(`${API_URL}/notes/${id}`,{
method:"DELETE"
});

loadNotes();

}

async function searchNotes(){

const keyword = document.getElementById("search").value.toLowerCase();

const res = await fetch(`${API_URL}/notes`);
const data = await res.json();

const notesDiv = document.getElementById("notes");

notesDiv.innerHTML = "";

data.forEach(note => {

if(note.subject.toLowerCase().includes(keyword)){

notesDiv.innerHTML += `
<div class="note">
<h3>${note.title}</h3>
<p>${note.subject}</p>

<a href="${API_URL}/uploads/${note.file}" target="_blank">
Download PDF
</a>

<button onclick="deleteNote('${note._id}')">
Delete
</button>

</div>
`;

}

});

if(keyword === ""){
loadNotes();
}

}

loadNotes();