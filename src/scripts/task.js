import { events } from "./pubsub.js";
import { TaskLoader } from "./taskLoader.js";

export class Task {
    constructor () {
        this.taskLoader = new TaskLoader;
        this.tasks = this.taskLoader.loadTasks();

        events.subscribe("addTask", this.addTask.bind(this));
    }

    addTask (task) {
        this.tasks.push(task);
        events.trigger("updateTasks", this.tasks);
    }

    editTask (index, task) {
        this.tasks[index] = task;
        events.trigger("updateTasks", this.tasks);
    }

    deleteTask (index) {
        this.tasks.splice(index, index);
        events.trigger("updateTasks", this.tasks);
    }

    deleteCategory(category) {
        this.tasks = this.tasks.filter(item => item.category != category);
        events.trigger("updateTasks", this.tasks);
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