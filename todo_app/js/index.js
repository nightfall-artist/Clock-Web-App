// ****** select items **********

const form = document.querySelector(".todo-form");
const alert = document.querySelector(".alert");
const todo = document.getElementById("todo");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".todo-container");
const list = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn");
const completeBtn = document.querySelector(".completeBtn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = todo.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("todo-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
            <!-- completed btn -->
              <button type="button" class="complete-btn">
                <i class="bi bi-circle"></i>
                <i class="bi bi-check-circle" style="display:none"></i>
              </button>
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="bi bi-pencil-square"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </div>
          `;
    // add event listeners to both buttons;
const deleteBtn = element.querySelector(".delete-btn");
deleteBtn.addEventListener("click", deleteItem);
const editBtn = element.querySelector(".edit-btn");
editBtn.addEventListener("click", editItem);
const completeBtn = element.querySelector(".complete-btn");
completeBtn.addEventListener("click", toggleCompleted); // Corrected from completeItem to toggleCompleted

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");

    // edit  local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".todo-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  todo.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "edit";
}
// set backt to defaults
function setBackToDefault() {
  todo.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const todo = { id, value};
  let items = getLocalStorage();
  items.push(todo);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value, item.checked);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("todo-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- completed btn -->
              <button type="button" class="complete-btn">
                <i class="bi bi-circle"></i>
                <i class="bi bi-check-circle" style="display:none;"></i>
              </button>
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="bi bi-pencil-square"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </div>
          `;
  // add event listeners to buttons;
  const completeBtn = element.querySelector(".complete-btn");
  completeBtn.addEventListener("click", toggleCompleted);
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}

// Inside the toggleCompleted function
function toggleCompleted(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const checkIcon = element.querySelector('.complete-btn .bi-check-circle');
  const circleIcon = element.querySelector('.complete-btn .bi-circle');

  element.classList.toggle('completed');
  displayAlert("item status changed", "success");

  if (element.classList.contains('completed')) {
    // If completed, show check icon and hide circle icon
    checkIcon.style.display = 'inline';
    circleIcon.style.display = 'none';
  } else {
    // If not completed, show circle icon and hide check icon
    checkIcon.style.display = 'none';
    circleIcon.style.display = 'inline';
  }

  // update local storage
  const id = element.dataset.id;
  const value = element.querySelector('.title').innerText;
  editLocalStorage(id, value);
}


