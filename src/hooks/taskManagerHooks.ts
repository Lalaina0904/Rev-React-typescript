import { useState } from "react";

type Task = {
    title: string;
    id: string;
};

export function useTaskManager() {
    const [tasksValue, setTasksValue] = useState([] as Task[]);
    const [keyword, setKeyword] = useState("");
    function saveTask(task: Task) {
        setTasksValue((prev) => [...prev, task]);
    }

    function deleteTask(id: string) {
        setTasksValue((prev) => prev.filter((task) => task.id !== id));
    }

    function searchTask(keyword: string) {
        setKeyword(keyword);
    }

    return {
        saveTask,
        deleteTask,
        searchTask,
        task:
            keyword !== ""
                ? tasksValue.filter((task) =>
                      task.title.toLowerCase().includes(keyword.toLowerCase())
                  )
                : tasksValue,
    };
}
