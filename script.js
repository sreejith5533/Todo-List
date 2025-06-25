const taskList = JSON.parse(localStorage.getItem("myKey")) || [];

const formElement = document.getElementById("form-em");

const addTaskBtn = document.getElementById("addTask");

const ulTag = document.getElementById("ulTag");

const checkBox = document.getElementById("checkbox");

const darkmode = document.querySelector(".slider-btn");

const slider = document.querySelector(".slider");

const clearallBtn = document.querySelector(".clearall-btn");







function saveValues() {
  localStorage.setItem("myKey", JSON.stringify(taskList));
}

clearallBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  if(confirm("Are you sure, You want to clear all the tasks.")){
    taskList.splice(0, taskList.length);
    localStorage.removeItem("myKey");
    ulTag.innerHTML = "";
  }
});


function renderTask(taskText) {
  const liTag = document.createElement("li");
  liTag.className = "list-item";

  const aTag = document.createElement("a");
  aTag.textContent = taskText;
  liTag.append(aTag);

  const d = document.createElement('div');
  d.className = "Date-Time"
  const date = new Date();

  const currentdate = date.getDate();
  const month = date.getMonth() + 1;
  const currentYear = date.getFullYear();


  

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  d.innerHTML = `Date : ${currentdate} Month : ${month} Year : ${currentYear}&nbsp;&nbsp;&nbsp;Time : ${hours}:${minutes}:${seconds} `;

  liTag.append(d)

  const btn = document.createElement("button");
  btn.className = "close-btn";
  btn.innerHTML = '<i class="fa-solid fa-square-xmark close-btn-icon"></i>';

  liTag.append(btn);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "checked-input";

  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      aTag.style.textDecoration = "line-through";
      d.style.textDecoration = "line-through";
      d.style.opacity = "0.6";
      aTag.style.opacity = "0.6";
    } else {
      aTag.style.textDecoration = "none";
      aTag.style.opacity = "1";
      d.style.textDecoration = "none";
      d.style.opacity = "1";
    }
  });

  liTag.prepend(checkBox);

  ulTag.append(liTag);



  btn.addEventListener("click", (e) => {
    const liTag = e.currentTarget.parentElement;
    const taskText = liTag.querySelector("a").innerText;

    const index = taskList.indexOf(taskText);

    if (index > -1) {
      taskList.splice(index, 1);
    }

    saveValues();

    liTag.remove();
  });
}

function addTask() {
  const inputElement = document.getElementById("inputElm");

  const taskText = inputElement.value;

  taskList.push(taskText);
  saveValues();
  renderTask(taskText);
  inputElement.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  taskList.forEach((task) => renderTask(task));
});


formElement.addEventListener('submit',(e)=>{
  e.preventDefault();
  addTask();
})

/* addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
 */


slider.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});



