const $modal = document.getElementById("modal");
const $titleInput = document.getElementById("title");
const $descriptionInput = document.getElementById("description");
const $priorityInput = document.getElementById("priority");
const $deadLineInput = document.getElementById("deadLine");
const $idInput = document.getElementById("idInput");
const $column = document.getElementById("column");

const $createTaskTitle = document.getElementById("createTaskTitle");
const $editTaskTitle = document.getElementById("editTaskTitle");

const $createTaskButton = document.getElementById("createTaskButton");
const $editTaskButton = document.getElementById("editTaskButton");



let taskList = [];

function openModal(id = null) {
    $modal.style.display = "flex";

    if (id) {
        $createTaskTitle.style.display = "none";
        $createTaskButton.style.display = "none";

        $editTaskTitle.style.display = "block";
        $editTaskButton.style.display = "block";

        const task = taskList.find(task => task.id === id);

        if (task) {
            $idInput.value = task.id;
            $titleInput.value = task.title;
            $descriptionInput.value = task.description;
            $priorityInput.value = task.priority;
            $deadLineInput.value = task.deadLine;
            $column.value = task.column;
        }
    } else {
        $createTaskTitle.style.display = "block";
        $createTaskButton.style.display = "block";

        $editTaskTitle.style.display = "none";
        $editTaskButton.style.display = "none";
        resetModalFields();
    }
}

function closeModal() {
    $modal.style.display = "none";
    resetModalFields();
}

function resetModalFields() {
    $idInput.value = "";
    $titleInput.value = "";
    $descriptionInput.value = "";
    $priorityInput.value = "";
    $deadLineInput.value = "";
    $column.value = "";
}

function generateCards() {
    document.querySelectorAll("[task-column]").forEach(column => {
        column.querySelector(".body").innerHTML = ""; // Limpa os cards antes de gerar novos
    });

    taskList.forEach(task => {
        const formattedDate = moment(task.deadLine).format("DD/MM/YYYY");
        const columnBody = document.querySelector(`[task-column="${task.column}"] .body`);

        if (columnBody) {
            const card = `
                <div 
                id='${task.id}'
                class="card" draggable="true" ondragstart="dragstart_handler(event)">
                    <div class="info"> 
                        <b>Título:</b> <span>${task.title}</span>
                    </div>
                    <div class="info"> 
                        <b>Descrição:</b> <span>${task.description}</span>
                    </div>
                    <div class="info"> 
                        <b>Prioridade:</b> <span>${task.priority}</span>
                    </div>
                    <div class="info"> 
                        <b>Prazo:</b> <span>${formattedDate}</span>
                    </div>
                    <div class="button-edit-delete">
                    <button onclick="openModal(${task.id})" class="material-symbols-outlined">
                        edit
                    </button> 
                    <button onclick="deleteTask(${task.id})" class="material-symbols-outlined">
                        delete
                    </button>
                    </div>
                </div>`;
            columnBody.innerHTML += card;
        }
    });
}

function createTask() {
    const newTask = {
        id: Date.now(), // Garante IDs únicos
        title: $titleInput.value.trim(),
        description: $descriptionInput.value.trim(),
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
        column: $column.value
    };

    taskList.push(newTask);
    saveToLocalStorage();
    closeModal();
    generateCards();
}

function updateTask() {
    const id = parseInt($idInput.value);
    const index = taskList.findIndex(task => task.id === id);

    if (index !== -1) {
        taskList[index] = {
            id,
            title: $titleInput.value.trim(),
            description: $descriptionInput.value.trim(),
            priority: $priorityInput.value,
            deadLine: $deadLineInput.value,
            column: $column.value
        };

        saveToLocalStorage();
        closeModal();
        generateCards();
    } else {
        console.error("Erro: Tarefa não encontrada para atualização.");
    }
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    saveToLocalStorage();
    generateCards();
}

function changeColumn(task_id, column_id) {
    taskList = taskList.map(task => {
        if (task.id === task_id) {
            return { ...task, column: column_id };
        }
        return task;
    });
    saveToLocalStorage();
    generateCards();
}

function dragstart_handler(event) {
    // Adiciona o ID do item ao dataTransfer
    event.dataTransfer.setData("text/plain", event.target.id);
    console.log("Drag iniciado:", event.target.id);
}

function dragover_handler(event) {
    event.preventDefault();
    console.log("Drag sobre um container.");
}

function drop_handler(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);

    if (draggedElement) {
        event.currentTarget.querySelector(".body").appendChild(draggedElement);

        const columnId = event.currentTarget.getAttribute("task-column");
        changeColumn(parseInt(id), columnId);

        console.log("Item movido:", id, "para a coluna", columnId);
    } else {
        console.log("Elemento não encontrado:", id);
    }
}

function saveToLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadFromLocalStorage() {
    const storedList = localStorage.getItem("taskList");
    if (storedList) {
        taskList = JSON.parse(storedList);
        generateCards();
    }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();

    $createTaskButton.addEventListener("click", createTask);
    $editTaskButton.addEventListener("click", updateTask);
    document.getElementById("closeModalButton").addEventListener("click", closeModal);
});