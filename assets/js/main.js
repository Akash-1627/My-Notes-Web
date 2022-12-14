showNotes();

// adding a note and updating it to local storage

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("title");

  let imag;
  let checkBx = document.getElementById("checkBx");
  if (checkBx.checked) {
    imag = `<img class="image" id="image" src="./assets/img/star.png">`;
  } else {
    imag = "";
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    check: checkBx.checked,
    checkbox: imag,
  };

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  checkBx.checked = false;

  showNotes();
});

// function for showing the notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        </style>
        <div class="notecard mx-3 my-3 card" style="width: 18rem">
        <div class="card-body">
          <div class = "design">
          <h5 class="card-title">${element.title}</h5>
          ${element.checkbox}
          </div>
          
          <p class="card-text">
            ${element.text}
          </p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>

        </div>
      </div> `;
  });

  let buttons = document.getElementById("buttons");
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    buttons.style.display = "flex";
  } else {
    notesElm.innerHTML = `<center><b>Nothing to show! Use "Add Note" to add your first note.</b></center>`;
    buttons.style.display = "none";
  }
}

// code for checkbox

addbtn.addEventListener("click", function (e) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let image = document.getElementById("image");

  if (notesObj.checkbox == true) {
    image.classList.add("dispBlock");
  } else {
    image.classList.add("dispNone");
  }

  showNotes();
});

// function for deleting a note

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// function for editing the note

function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let popped = notesObj[index];

  let checkBx = document.getElementById("checkBx");
  let addTitle = document.getElementById("title");
  let addTxt = document.getElementById("addTxt");
  addTitle.value = `${popped.title}`;
  addTxt.value = `${popped.text}`;
  if (popped.check == true) {
    checkBx.checked = true;
  } else {
    checkBx.checked = false;
  }

  deleteNote(index);
}

// code for the search bar

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let notecards = document.getElementsByClassName("notecard");
  Array.from(notecards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTitle = element
      .getElementsByTagName("h5")[0]
      .innerText.toLowerCase();
    if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// code for filtering buttons

// code for important button

let imp = document.getElementById("imp");
imp.addEventListener("click", function (e) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let notecards = document.getElementsByClassName("notecard");
  Array.from(notecards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("img")[0];
    if (cardTxt == undefined) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  });

  // code for all button

  let all = document.getElementById("all");
  all.addEventListener("click", function (e) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function (element) {
      element.style.display = "block";
    });
  });
});

// code for navbar

// window.onscroll = function() {scroll()};

// function scroll(){
//   let nav = document.getElementById('nav');

  
//   if(document.body.scrollTop>60 || document.documentElement.scrollTop>60){
//     nav.style.position = "fixed";
//   }
//   else{
//     nav.style.position = "none";
//   }
// }

// if(document.body.scroll<60 || document.documentElement.scroll<60){
//   nav.style.position = "none";
// }

// code for scrolltop button

let scrolltop = document.getElementById('scroll-top');

if(document.body.scrollTop>10 || document.documentElement.scrollTop > 10){
  scrolltop.style.display = "flex";
}
else{
  scrolltop.style.display = "none";
}

function scrollt(){
  document.documentElement.scrollTop = 0;
}