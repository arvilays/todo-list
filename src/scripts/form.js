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
        let category;
        let formCategory = this.category.value;
        if (formCategory == "") category = "Default";
        else category = formCategory;

        let data = {
            title: this.title.value,
            category: category,
            dueDate: this.dueDate.value,
            priority: this.priority.value,
            description: this.description.value,
            checked: false,
        }
        events.trigger("addTask", data);
    }
}