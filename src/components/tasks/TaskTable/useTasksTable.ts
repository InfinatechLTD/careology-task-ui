import { useState, useEffect } from "react";
import {
  useAddTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
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

  // To do: Add error handling and loading if time allows
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

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

  const handleEditTask = (task: Task) => {
    setEditingKey(task.id);
    setNewTask({ ...task });
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setNewTask(null);
  };

  const handleSave = async () => {
    if (newTask) {
      try {
        if (!newTask.id) {
          const savedTask = await addTask(newTask as Task).unwrap();
          setTableData((prevData) =>
            prevData.map((task) => (task.id === "" ? { ...savedTask } : task))
          );
        } else {
          const { task: updatedTask } = await updateTask(
            newTask as Task
          ).unwrap();

          setTableData((prevData) =>
            prevData.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
        }

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
    handleEditTask,
    handleCancelEdit,
    handleSave,
  };
};
