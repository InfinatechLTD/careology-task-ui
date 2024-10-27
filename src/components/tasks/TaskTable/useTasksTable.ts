import { useState, useEffect } from "react";
import {
  useAddTaskMutation,
  useGetTasksQuery,
} from "../../../features/tasks/tasksApi";

interface Task {
  id: string | null;
  name: string | null;
  dueDate: string | null;
  completed: boolean;
  note: string | null;
  tag: string | null;
}

export const useTasksTable = () => {
  const { data = { tasks: [] }, isLoading } = useGetTasksQuery(undefined);
  const [addTask] = useAddTaskMutation();
  const [tableData, setTableData] = useState<Task[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task> | null>(null);

  useEffect(() => {
    if (data.tasks.length > 0) {
      setTableData(data.tasks);
    }
  }, [data.tasks]);

  const handleAddNewTask = () => {
    const emptyTask: Task = {
      id: "",
      name: "",
      dueDate: null,
      completed: false,
      note: null,
      tag: null,
    };
    setTableData([...tableData, emptyTask]);
    setNewTask(emptyTask);
    setEditingKey("");
  };

  const handleInputChange = (key: keyof Task, value: any) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (newTask) {
      try {
        const savedTask = await addTask(newTask as Task).unwrap();
        setTableData((prevData) =>
          prevData.map((task) =>
            task.id === "" ? { ...savedTask.task } : task
          )
        );
        setNewTask(null);
        setEditingKey(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    tableData,
    editingKey,
    newTask,
    isLoading,
    handleAddNewTask,
    handleInputChange,
    handleSave,
  };
};
