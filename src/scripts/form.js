import { events } from "./pubsub.js";

export class Form {
    constructor () {
        this.editChecked;
        this.editID;
        
        this.title = document.querySelector("#form-title");
        this.category = document.querySelector("#form-category");
        this.description = document.querySelector("#form-description");
        this.dueDate = document.querySelector("#form-due-date");
        this.priority = document.querySelector("#form-priority");
        this.addButton = document.querySelector("#form-add");
        this.editButton = document.querySelector("#form-edit");

        this.addButton.addEventListener("click", () => { this.get(); });
        this.editButton.addEventListener("click", () => { this.edit(); });

        events.subscribe("populate", this.populate.bind(this));
        events.subscribe("showAddButton", this.#showAddButton.bind(this));
        events.subscribe("showEditButton", this.#showEditButton.bind(this));
    }

    // Converts form data to object to send out
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
        this.clearForm();
    }

    // Same as get(), but retains both checked and id
    edit () {
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
            checked: this.editChecked,
            id: this.editID
        }
        events.trigger("editTask", data);
        events.trigger("hideTaskWindow");
        this.clearForm();
    }

    // Populates form data with currently edited task
    populate (data) {
        this.title.value = data.title;
        this.category.value = data.category;
        this.dueDate.value = data.dueDate;
        this.priority.value = data.priority;
        this.description.value = data.description;
        this.editChecked = data.checked;
        this.editID = data.id;
    }

    clearForm () {
        this.title.value = "";
        this.dueDate.value = "";
        this.priority.value = "None";
        this.description.value = "";
    }

    #showAddButton () {
        this.clearForm();
        this.addButton.style.display = "revert";
        this.editButton.style.display = "none";
    }

    #showEditButton () {
        console.log("showEditButton");
        this.editButton.style.display = "revert";
        this.addButton.style.display = "none";
    }
}