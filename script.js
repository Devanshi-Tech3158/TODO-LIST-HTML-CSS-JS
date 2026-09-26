const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("task-count");


function addTask() {

    if (inputBox.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    li.textContent = inputBox.value.trim();

    let span = document.createElement("span");

    span.textContent = "×";

    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();

    updateTaskCount();
}


listContainer.addEventListener("click", function(event) {

    if (event.target.tagName === "LI") {

        event.target.classList.toggle("checked");

        saveData();

        updateTaskCount();
    }

    else if (event.target.tagName === "SPAN") {

        event.target.parentElement.remove();

        saveData();

        updateTaskCount();
    }

});


inputBox.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


function saveData() {

    localStorage.setItem("todoData", listContainer.innerHTML);

}


function showTask() {

    let savedData = localStorage.getItem("todoData");

    if (savedData) {
        listContainer.innerHTML = savedData;
    }

    updateTaskCount();
}


function updateTaskCount() {

    let tasks = listContainer.querySelectorAll("li");

    let totalTasks = tasks.length;

    let completedTasks =
        listContainer.querySelectorAll("li.checked").length;

    let remainingTasks = totalTasks - completedTasks;

    if (totalTasks === 0) {
        taskCount.textContent = "0 tasks";
    }

    else if (remainingTasks === 1) {
        taskCount.textContent = "1 task left";
    }

    else {
        taskCount.textContent = remainingTasks + " tasks left";
    }
}


showTask();
