import "../css/reset.css";
import "../css/style.css";
import { events } from "./pubsub.js";
import { Task } from "./task.js";
import { Display } from "./display.js";
import { Form } from "./form.js";

const main = () => {
    let display = new Display;
    let form = new Form;
    let task = new Task;
    console.log(task.tasks);
};

main();

/*
CLASSES:
Task
    - getTask
    - getAllTasks
    - createTask
    - editTask
    - deleteTask
    - deleteCategory
    -- generateUniqueID

TaskLoader
    - loadTasks
    - saveTasks



DOM/UI:
    - Today
    - Upcoming (7 days)
    - Default (Default Category)
    - School (Additional Category)
    - Work (Additional Category)



User Interface


To-Do Task
- Deal with check/uncheck
- Edit
- Delete
- View all information including notes and checklist
    - Checklist should be a simple check/uncheck


Project Category
- Load all tasks in corresponding category

Each task can belong in different categories.
JSON FORMAT
{
    {
        "title": "title",
        "category": "Default",
        "description": "description",
        "due_date": "01/01/2025",
        "priority": "high",
        "checked": false,
    },
}




{
    "School": [
        "History": [
            {
            "title": "title",
            "description": "description",
            "due_date": "01/01/2025",
            "priority": "high",
            "notes": "blah blah blah",
            "checklist": [
                {
                    "title": "part 1",
                    "checked": false
                }
            ],
            "checked": false,
            }
        ]
    ],
    "Work": [
        "Website": [
            {
            "title": "title",
            "description": "description",
            "due_date": "01/01/2025",
            "priority": "high",
            "notes": "blah blah blah",
            "checklist": [
                {
                    "title": "part 1",
                    "checked": false
                }
            ],
            "checked": false,
            }
        ]
    ] 
}

*/