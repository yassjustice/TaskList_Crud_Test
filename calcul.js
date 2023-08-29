document.addEventListener("DOMContentLoaded", function () {
  // Your code here

  //buttons
  const addButton = document.getElementById("ADD");
  const saveButton = document.getElementById("SAVE");
  const editButton = document.getElementById("EDIT");
  const deleteButton = document.getElementById("DELETE");
  const cancelButton = document.getElementById("CANCEL");
  const deleteAllButton = document.getElementById("DELALL");
  const finishedButton = document.getElementById("FINISHED");
  const taskTabButton = document.getElementById("TASKTAB");
  //display side
  const pTitleElement = document.getElementById("pTitle");
  const pDescriptionElement = document.getElementById("pDescription");
  const pTimeElement = document.getElementById("pTime");
  const pDateElement = document.getElementById("pDate");
  //update side
  const inpTitleElement = document.getElementById("inpTitle");
  const inpDescriptionElement = document.getElementById("inpDescription");
  const inpTimeElement = document.getElementById("inpTime");
  const inpDateElement = document.getElementById("inpDate");
  //welcome side
  const inpNew = document.getElementById("inpNew");
  const newButton = document.querySelector(".newBtn");
  //back button
  const backButton = document.querySelector(".backBtn");
  //tabs
  const display = document.querySelector(".display");
  const update = document.querySelector(".update");
  const finishedList = document.querySelector(".finishedList");
  const taskListDiv = document.querySelector(".taskList");
  const taskListItem = document.querySelector(".task");

  //loading localStorage if there is any
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to create a new task object
  function createTask(title, description, time, date) {
    const task = {
      id: tasks.length + 1,
      title: title,
      description: description,
      time: time,
      date: date,
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return task;
  }
  // function createTask(title) {
  //   const task = {
  //     id: tasks.length + 1,
  //     title: title,
  //   };
  //   tasks.push(task);
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  //   return task;
  // }

  // Function to render tasks in the task list

  // function renderTasks() {
  //     taskListDiv.innerHTML = "";
  //     tasks.forEach((task) => {
  //       const taskDiv = document.createElement("div");
  //       taskDiv.classList.add("task");
  //       taskDiv.textContent = task.title;
  //       taskListDiv.appendChild(taskDiv);
  //     });
  //   }

  function renderTasks() {
    taskListDiv.innerHTML = "";
    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `taskCheckbox_${task.id}`;

      const label = document.createElement("label");
      label.textContent = task.title;
      label.setAttribute("for", `taskCheckbox_${task.id}`);

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(label);

      taskListDiv.appendChild(taskDiv);
    });
  }

  //finding tasks by their title:
  function findTaskIndexByTitle(title) {
    return tasks.findIndex((task) => task.title === title);
  }

  // Add event listener for the newButton
  newButton.addEventListener("click", function () {
    const newTaskTitle = inpNew.value.trim();
    if (newTaskTitle !== "") {
      // const newTask =
      createTask(newTaskTitle);
      renderTasks();
      inpNew.value = ""; // Clear the input field
    }
  });

  // initial rendering
  renderTasks();

  // Function to delete all tasks
  function deleteAllTasks() {
    tasks.length = 0; // Clear the tasks array
    localStorage.removeItem("tasks");
    renderTasks();
  }

  // Add event listener for the delete all button
  deleteAllButton.addEventListener("click", function () {
    deleteAllTasks();
  });

  //save button
  // saveButton.addEventListener("click", function () {
  //     const newTitle = inpTitleElement.value.trim();
  //     const newDescription = inpDescriptionElement.value.trim();
  //     const newTime = inpTimeElement.value.trim();
  //     const newDate = inpDateElement.value.trim();

  //     if (newTitle !== "") {
  //       const newTask = createTask(newTitle, newDescription, newTime, newDate);
  //       renderTasks();

  //       // Clear the input fields
  //       inpTitleElement.value = "";
  //       inpDescriptionElement.value = "";
  //       inpTimeElement.value = "";
  //       inpDateElement.value = "";
  //     }
  //   });

  let currentlyEditedTaskIndex = -1; // Initialize with an invalid index

  // ... (your other code)

  editButton.addEventListener("click", function () {
    // Get the task details
    const taskTitle = pTitleElement.textContent;
    const taskDescription = pDescriptionElement.textContent;
    const taskTime = pTimeElement.textContent;
    const taskDate = pDateElement.textContent;

    // Populate the update section with task details
    inpTitleElement.value = taskTitle;
    inpDescriptionElement.value = taskDescription;
    inpTimeElement.value = taskTime;
    inpDateElement.value = taskDate;

    // Store the currently edited task's index
    currentlyEditedTaskIndex = findTaskIndexByTitle(taskTitle);

    // Hide other sections and show the update section
    hideAllTabs();
    update.style.display = "grid";

    finishedButton.style.display = "none";
        addButton.style.display = "none";
        editButton.style.display = "none";
        saveButton.style.display = "inline";
        taskTabButton.style.display = "inline";
        deleteButton.style.display = "inline";

  });

  // Add event listener for the saveButton
  saveButton.addEventListener("click", function () {
    const editedTaskTitle = inpTitleElement.value.trim();
    const newTitle = inpTitleElement.value.trim();
    const newDescription = inpDescriptionElement.value.trim();
    const newTime = inpTimeElement.value.trim();
    const newDate = inpDateElement.value.trim();
    if (editedTaskTitle !== "") {
      if (currentlyEditedTaskIndex !== -1) {
        // Update the task details in the tasks array
        tasks[currentlyEditedTaskIndex].title = inpTitleElement.value;
        tasks[currentlyEditedTaskIndex].description =
          inpDescriptionElement.value;
        tasks[currentlyEditedTaskIndex].time = inpTimeElement.value;
        tasks[currentlyEditedTaskIndex].date = inpDateElement.value;

        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Re-render tasks
        renderTasks();

        // Clear the input fields
        inpTitleElement.value = "";
        inpDescriptionElement.value = "";
        inpTimeElement.value = "";
        inpDateElement.value = "";

        // Reset the currently edited task index
        currentlyEditedTaskIndex = -1;

        // Hide the update section
        update.style.display = "none";

        // Show the task list section
        taskListDiv.style.display = "flex";
      } else {
        // Create a new task
        const newTask = createTask(newTitle, newDescription, newTime, newDate);

        // Clear the input field
        inpTitleElement.value = "";

        // Hide the update section
        update.style.display = "none";
        taskListDiv.style.display = "flex";
        // Re-render tasks
        renderTasks();
      }
    }
  });

  deleteButton.addEventListener("click", function () {
    const taskTitle = pTitleElement.textContent;
    currentlyEditedTaskIndex = findTaskIndexByTitle(taskTitle);
    if (currentlyEditedTaskIndex !== -1) {
      tasks.splice(currentlyEditedTaskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      hideAllTabs();
      taskListDiv.style.display = "flex";
      // Optionally, you can clear the input fields in the update section here
    }
  });

  //tabs handeling

  function hideAllTabs() {
    display.style.display = "none";
    update.style.display = "none";
    taskListDiv.style.display = "none";
    finishedList.style.display = "none";
  }
  hideAllTabs();
  taskListDiv.style.display = "flex";

  // taskListItem.addEventListener("click", function () {
  //     hideAllTabs();
  //     display.style.display = "flex";
  //   });

  taskListDiv.addEventListener("click", function (event) {
    const clickedElement = event.target; // Get the clicked element

    // Check if the clicked element is a taskListItem
    if (clickedElement.classList.contains("task")) {
      // Find the task object in tasks array based on the clicked task's title
      const clickedTaskTitle = clickedElement.textContent;
      const clickedTask = tasks.find((task) => task.title === clickedTaskTitle);

      if (clickedTask) {
        // Update the display elements with the clicked task's details
        pTitleElement.textContent = clickedTask.title;
        pDescriptionElement.textContent = clickedTask.description;
        pTimeElement.textContent = clickedTask.time;
        pDateElement.textContent = clickedTask.date;

        hideAllTabs();
        display.style.display = "flex";
        finishedButton.style.display = "none";
        addButton.style.display = "none";
        editButton.style.display = "inline";
        saveButton.style.display = "none";
        taskTabButton.style.display = "inline";
        deleteButton.style.display = "inline";
      }
    }
  });

  addButton.addEventListener("click", function () {
    hideAllTabs();
    update.style.display = "grid";
    saveButton.style.display = "inline";
    addButton.style.display = "none";
    finishedButton.style.display = "none";
    taskTabButton.style.display = "inline";
  });

  taskTabButton.addEventListener("click", function () {
    hideAllTabs();
    taskListDiv.style.display = "flex";
    finishedButton.style.display = "inline";
    taskTabButton.style.display = "none";
    addButton.style.display = "inline";
    deleteButton.style.display = "none";
  });

  finishedButton.addEventListener("click", function () {
    hideAllTabs();
    finishedList.style.display = "flex";
    taskTabButton.style.display = "inline";
    finishedButton.style.display = "none";
  });
});
