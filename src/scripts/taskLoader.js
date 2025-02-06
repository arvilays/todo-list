import { events } from "./pubsub.js";

export class TaskLoader {
    constructor () {
        events.subscribe("updateTasks", this.saveTasks);
    }
    
    loadTasks () {
        let loadedTasks;
        if (localStorage["tasks"] == undefined) {
            console.log("Tasks not found, loading default");
            loadedTasks = [];
        } else {
            console.log("Tasks loaded");
            loadedTasks = JSON.parse(localStorage["tasks"]); 
        }
        return loadedTasks;
    }

    saveTasks (tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}