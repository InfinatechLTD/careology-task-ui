import { useState, useEffect } from "react";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleTaskMutation,
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
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTask] = useToggleTaskMutation();

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

  const handleDeleteTask = async (deleteToTask: Task) => {
    try {
      await deleteTask(deleteToTask).unwrap();
      setTableData((prevData) =>
        prevData.filter((task) => task.id !== deleteToTask.id)
      );
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleToggleTaskCompleted = async (taskToToggle: Task) => {
    try {
      const updatedTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };

      await toggleTask(updatedTask).unwrap();
      setTableData((prevData) =>
        prevData.map((task) =>
          task.id === taskToToggle.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to toggle task", error);
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
    handleDeleteTask,
    handleToggleTaskCompleted,
  };
};
