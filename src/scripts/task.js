import { events } from "./pubsub.js";
import { TaskLoader } from "./taskLoader.js";

export class Task {
    constructor () {
        this.taskLoader = new TaskLoader;
        this.tasks = this.taskLoader.loadTasks();
        this.categoryFilter = "Default";

        events.subscribe("addTask", this.addTask.bind(this));
        events.subscribe("editTask", this.editTask.bind(this));
        events.subscribe("deleteTask", this.deleteTask.bind(this));
        events.subscribe("toggleCheck", this.toggleCheck.bind(this));
        events.subscribe("changeCategory", this.setCategoryFilter.bind(this));
        
        events.trigger("updateTasks", this.tasks.filter(item => item.category == this.categoryFilter));
        events.trigger("updateCategories", this.getCategories());
    }

    addTask (task) {
        task.id = this.#generateUniqueID();
        this.tasks.push(task);
        this.#update();
    }

    editTask (task) {
        this.deleteTask(task.id);
        this.addTask(task);
        this.#update();
    }

    toggleCheck (id) {
        let index = this.tasks.findIndex(item => item.id == id);
        this.tasks[index].checked = !this.tasks[index].checked;
        this.#update();
    }

    deleteTask (id) {
        this.tasks = this.tasks.filter(item => item.id != id);
        this.#update();
    }

    getCategories() {
        let categories = [];
        this.tasks.forEach(item => {
            categories.push(item.category);
        });
        return [...new Set(categories)];
    }

    setCategoryFilter(category) {
        this.categoryFilter = category;
        this.#update();
    }

    #generateUniqueID () {
        let uniqueID = 0;
        while (this.tasks.find(item => item.id == uniqueID)) {
            uniqueID++;
        }
        return uniqueID;
    }

    #update () {
        events.trigger("updateTasks", this.tasks.filter(item => item.category == this.categoryFilter));
        events.trigger("updateCategories", this.getCategories());
        events.trigger("saveTasks", this.tasks);
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
        "id": "3434234"
    },
]
*/