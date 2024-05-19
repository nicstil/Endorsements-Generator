//alert("Hello! I am an alert box!!");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-c3460-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsListInDB = ref(database, "endorsementsList");

const endorsementInputEl = document.getElementById("endorsementInput");
const publishBtnEl = document.getElementById("publishBtn");
const endorsementsListEl = document.getElementById("endorsementsList");

publishBtnEl.addEventListener("click", function () {
  let inputValue = endorsementInputEl.value;
  push(endorsementsListInDB, inputValue);
  clearEndorsementInputEl();
});

onValue(endorsementsListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());

    clearEndorsementsListEl();

    for (let i = 0; i < endorsementsArray.length; i++) {
      let currentEndorsement = endorsementsArray[i];
      let currentEndorsementID = currentEndorsement[0];
      let currentEndorsementValue = currentEndorsement[1];

      appendEndorsementToEndorsementsListEl(currentEndorsement);
    }
  } else {
    endorsementsListEl.innerHTML = `<div id="emptyText">No endorsements here...yet</div>`;
  }
});

function clearEndorsementsListEl() {
  endorsementsListEl.innerHTML = "";
}

function clearEndorsementInputEl() {
  endorsementInputEl.value = "";
}

function appendEndorsementToEndorsementsListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("textarea");

  newEl.textContent = itemValue;
  newEl.style.background = "white";
  newEl.style.color = "#1b1924";
  newEl.style.margin = "1em 1em 0 0";
  newEl.style.fontFamily = "inter,sans-serif";
  newEl.style.borderRadius = "0";

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `endorsementsList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  endorsementsListEl.append(newEl);
}
