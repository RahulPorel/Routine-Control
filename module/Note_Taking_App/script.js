// Selectors
const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");

const closeIcon = popupBox.querySelector("header i");
const titleTag = document.querySelector("#title");
const descTag = document.querySelector("#desc-textarea");
const addBtn = document.querySelector("#add-notes");

// Event Listners

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.textContent = "Add Note";
  popupTitle.textContent = "Add a new Note";
  popupBox.classList.remove("show");
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  // getting hours,min, month,day,year
  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    // converting 12 hours from 24 hours & adding AM & PM format
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let month = dateObj.getMonth();
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      time_date: `${hours}:${minutes} ${ampm} ~ ${month}/${day}/${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo); //  adding new note to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo; //updating selected note only
    }
    // saving notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});

//gettting localstorage notes if exist and parsing them to js object else passing an empty array to notes
// Data
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;
// Functions

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());

  notes.forEach((note, index) => {
    let liTag = `
    <li class="note user-color-apply-bg">
      <div class="details user-color-apply-c">
        <p class= "user-color-apply-p">${note.title}</p>
        <span class=  "user-color-apply-bg">${note.description}</span
        >
      </div>
      <div class="bottom-content">
        <span id="updateTime_Date_Edited" >${note.time_date}</span>
        <i onclick="showColorMenu(this)" class="fa-solid fa-palette "></i>
        <div class="setting">
        
          <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
      
          <ul class="menu">
          <div class="color-container">
          <span id="1" onclick="(${index},color(this))" class="color cl1"></span>
          <span id="2" onclick="(${index},color(this))" class="color cl2"></span>
          <span onclick="(${index},color(this))" class="color cl3"></span>
          <span onclick="(${index},color(this))" class="color cl4"></span>
        </div>
 <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
       
            <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
          </ul>
        </div>
      </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();
window.showMenu = function (elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    // removing show classs frm the settings menu on document click
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
};

window.color = function (z) {
  const a = getComputedStyle(z);
  const b = a.backgroundColor;
  document.getElementsByTagName("body")[0].style.backgroundColor = b;
};

window.updateNote = function (noteId, title, desc) {
  addBox.click();
  isUpdate = true;
  updateId = noteId;
  titleTag.value = title;
  descTag.value = desc;
  addBtn.textContent = "Save Updated Note";
  popupTitle.textContent = "Update Note";
};


window.deleteNote = function (noteId) {
  // let confirmDel = confirm("Are you sure you want to delete this note?")
  alert("Are you sure you want to delete this note?");
  notes.splice(noteId, 1); // removing selected note from array_tasks
  // saving updating notes to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
};

