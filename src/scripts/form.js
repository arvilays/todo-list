import { events } from "./pubsub.js";

export class Form {
    constructor () {
        this.addTask = document.querySelector(".add-task");
        this.title = document.querySelector("#title");
        this.category = document.querySelector("#category");
        this.description = document.querySelector("#description");
        this.dueDate = document.querySelector("#due-date");
        this.priority = document.querySelector("#priority");

        this.addTask.addEventListener("click", () => { this.get(); });
    }

    get () {
        let data = {
            title: this.title.value,
            category: this.category.value,
            description: this.description.value,
            dueDate: this.dueDate.value,
            priority: this.priority.value,
            checked: false,
        }
        events.trigger("addTask", data);
    }
}