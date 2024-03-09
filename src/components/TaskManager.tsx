import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";

// TODO: create custom hook to manage task state

type Task = {
    id: string;
    title: string;
};

export const TaskManager = () => {
    const [title, setTitle] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [tasks, setTasks] = useState([] as Task[]);

    // remove task from list
    const completeTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, taskUpdate: string) => {
        const newTasks = tasks.slice();

        const index = tasks.findIndex((task) => task.id === id);

        newTasks[index].title = taskUpdate;

        setTasks(newTasks);
    };

    const addTask = () => {
        if (title.length < 1) {
            return;
        }

        const newTask: Task = {
            // using nanoid to generate unique id
            id: nanoid(),
            title,
        };
        setTasks((prev) => prev.concat(newTask));
        setTitle("");
    };

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <div className='container'>
            <h1>Task Manager</h1>

            <div>
                <input
                    type='text'
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder='Search Task'
                />
            </div>

            <div className='task'>
                <input
                    type='text'
                    value={title}
                    onChange={(ev) => {
                        setTitle(ev.target.value);
                    }}
                />

                <button onClick={addTask}>Add Task</button>
            </div>

            <ul className='container'>
                {filteredTasks.map((task) => (
                    <li key={task.id} className='task'>
                        <div className='task'>
                            <input
                                type='text'
                                placeholder='Add new task'
                                value={task.title}
                                onChange={(e) =>
                                    updateTask(task.id, e.target.value)
                                }
                            />
                            <button onClick={() => completeTask(task.id)}>
                                Done
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
