import { events } from "./pubsub.js";
import { TaskLoader } from "./taskLoader.js";

export class Task {
    constructor () {
        this.taskLoader = new TaskLoader;
        this.tasks = this.taskLoader.loadTasks();

        events.subscribe("addTask", this.addTask.bind(this));
        events.subscribe("editTask", this.editTask.bind(this));
        events.subscribe("deleteTask", this.deleteTask.bind(this));
        events.subscribe("toggleCheck", this.toggleCheck.bind(this));
        events.trigger("updateTasks", this.tasks);
    }

    addTask (task) {
        task.id = this.#generateUniqueID();
        this.tasks.push(task);
        events.trigger("updateTasks", this.tasks);
    }

    editTask (task) {
        // let index = this.tasks.findIndex(item => item.id == task.id);
        this.deleteTask(task.id);
        this.addTask(task);
        events.trigger("updateTasks", this.tasks);
    }

    toggleCheck (id) {
        let index = this.tasks.findIndex(item => item.id == id);
        this.tasks[index].checked = !this.tasks[index].checked;
        events.trigger("updateTasks", this.tasks);
    }

    deleteTask (id) {
        this.tasks = this.tasks.filter(item => item.id != id);
        events.trigger("updateTasks", this.tasks);
    }

    deleteCategory(category) {
        this.tasks = this.tasks.filter(item => item.category != category);
        events.trigger("updateTasks", this.tasks);
    }

    #generateUniqueID () {
        let uniqueID = 0;
        while (this.tasks.find(item => item.id == uniqueID)) {
            uniqueID++;
        }
        return uniqueID;
    }
}

/*
[
    {
        "title": "title",
        "category": "Default",
        "description": "description",
        "due_date": "01/01/2025",
        "priority": "high",
        "checked": false,
    },
]
*/