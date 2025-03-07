import emptyCheckIcon from "../images/checkbox-blank-circle-outline.svg";
import filledCheckIcon from "../images/check-circle.svg";
import lowIcon from "../images/alpha-l-box.svg";
import mediumIcon from "../images/alpha-m-box.svg";
import highIcon from "../images/alpha-h-box.svg";
import editIcon from "../images/playlist-edit.svg";
import deleteIcon from "../images/trash-can.svg";
import { events } from "./pubsub.js";

export class Display {
    constructor () {    
        this.body = document.querySelector("body");   
        this.addTask = document.querySelector(".add-task");
        this.taskWindow = document.querySelector(".task-window");
        this.closeWindowImage = document.querySelector("#close-window-image");
        this.projectList = document.querySelector(".project-list");
        this.categoryTitle = document.querySelector(".category-title");
        this.taskContainer = document.querySelector(".task-container");

        this.addTask.addEventListener("click", () => { this.toggleTaskWindow("add") });
        this.closeWindowImage.addEventListener("click", () => { this.hideTaskWindow(); });
        document.addEventListener("keyup", e => {
            if (e.key == "Escape") this.hideTaskWindow();
        });

        events.subscribe("updateTasks", this.#generateTasks.bind(this));
        events.subscribe("updateCategories", this.#generateCategories.bind(this));
        events.subscribe("toggleTaskWindow", this.toggleTaskWindow.bind(this));
        events.subscribe("hideTaskWindow", this.hideTaskWindow.bind(this));

        this.body.style.display = "initial";
    }

    toggleTaskWindow (mode) {
        let taskWindowDisplay = this.taskWindow.style.display;
        if (taskWindowDisplay == "" || taskWindowDisplay == "none") this.showTaskWindow();
        else if (taskWindowDisplay == "revert") this.hideTaskWindow();

        if (mode == "add") events.trigger("showAddButton");
        else if(mode == "edit") events.trigger("showEditButton");
    }

    showTaskWindow () {
        this.taskWindow.style.display = "revert";
    }

    hideTaskWindow () {
        this.taskWindow.style.display = "none";
    }

    // Generate DOM for each task in the tasks array
    #generateTasks (tasks) {
        this.taskContainer.textContent = "";
        tasks.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1).forEach(item => {
            let task = document.createElement("div");
            task.className = "task";
            task.id = item.id;

            // Header
            let header = document.createElement("div");
            header.className = "task-header";

            let check = document.createElement("div");
            check.className = "task-check";
            let checkImage = document.createElement("img");
            checkImage.id = "check";
            if (item.checked) checkImage.src = filledCheckIcon;
            else checkImage.src = emptyCheckIcon;
            checkImage.addEventListener("click", () => { events.trigger("toggleCheck", item.id) });
            check.appendChild(checkImage);

            let title = document.createElement("div");
            title.className = "task-title";
            title.textContent = item.title;
            if (item.checked) {
                title.style.textDecoration = "line-through";
                title.style.opacity = "50%";
            }

            let dueDate = document.createElement("div");
            dueDate.className = "task-due-date";
            dueDate.textContent = item.dueDate;

            
            let category = document.createElement("div"); // Unused
            category.className = "task-category";
            category.textContent = item.category;
            category.style.display = "none";

            let priority = document.createElement("div");
            priority.className = "task-priority";
            let priorityImage = document.createElement("img");
            priorityImage.id = "priority";
            priority.appendChild(priorityImage);

            let taskPriority = item.priority;
            if (taskPriority == "low") priorityImage.src = lowIcon;
            else if (taskPriority == "medium") priorityImage.src = mediumIcon;
            else if (taskPriority == "high") priorityImage.src = highIcon;
            else priority.style.display = "none";

            header.appendChild(check);
            header.appendChild(title);
            header.appendChild(dueDate);
            header.appendChild(priority);

            // Body
            let body = document.createElement("div");
            body.className = "task-body";

            let description = document.createElement("div");
            description.className = "task-description";
            description.textContent = item.description;

            let modify = document.createElement("div");
            modify.className = "task-modify";
            let editImage = document.createElement("img");
            editImage.id = "edit";
            editImage.src = editIcon;
            editImage.addEventListener("click", () => {
                events.trigger("toggleTaskWindow");
                events.trigger("showEditButton");
                events.trigger("populate", item);
            })
            modify.appendChild(editImage);
            let deleteImage = document.createElement("img");
            deleteImage.id = "delete";
            deleteImage.src = deleteIcon;
            deleteImage.addEventListener("click", () => {
                events.trigger("deleteTask", item.id);
                task.remove();
            });
            modify.appendChild(deleteImage);

            body.appendChild(description);
            body.appendChild(modify);

            task.appendChild(header);
            task.appendChild(body);

            header.addEventListener("click", () => {
                let bodyDisplay = body.style.display;
                if (bodyDisplay == "" || bodyDisplay == "none") body.style.display = "flex";
                else if (bodyDisplay == "flex") body.style.display = "none";
            })

            this.taskContainer.appendChild(task);
        });
    }

    // Generate DOM for each unique category in the tasks array
    #generateCategories (categories) {
        this.projectList.textContent = "";
        categories.forEach(category => {
            let project = document.createElement("div");
            project.className = "project";
            project.textContent = category;
            project.addEventListener("click", () => {
                this.categoryTitle.textContent = category;
                events.trigger("changeCategory", category);
            });
            this.projectList.appendChild(project);
        });
    }
}