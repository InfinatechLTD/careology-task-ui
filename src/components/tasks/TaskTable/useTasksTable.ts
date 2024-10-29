import { useState, useEffect, useMemo } from "react";
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
  const [toggleTask, { isLoading: isToggleLoading }] = useToggleTaskMutation();

  const [tableData, setTableData] = useState<Task[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task> | null>(null);
  const [toggleTaskId, setToggleTaskId] = useState<string | null>(null);

  // Sync table data when tasks data changes
  useEffect(() => {
    if (data.tasks.length > 0) {
      setTableData(data.tasks);
    }
  }, [data]);

  const outstandingTaskTableData = useMemo(
    () => tableData.filter((task) => !task.completed),
    [tableData]
  );

  const completedTasksTableData = useMemo(
    () => tableData.filter((task) => task.completed),
    [tableData]
  );

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
    if (!newTask?.id) {
      // If the task doesn't have an ID, it's not saved yet, so remove it from the table
      setTableData((prevData) => prevData.filter((task) => task.id !== ""));
    }

    setEditingKey(null);
    setNewTask(null);
  };

  const handleSave = async () => {
    if (newTask) {
      try {
        if (!newTask.id) {
          // Add new task
          const { task: savedTask } = await addTask(newTask as Task).unwrap();
          setTableData((prevData) =>
            prevData.map((task) => (task.id === "" ? { ...savedTask } : task))
          );
        } else {
          // Update existing task
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
      setToggleTaskId(taskToToggle.id);
      const updatedTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };

      await toggleTask(updatedTask).unwrap();

      setTableData((prevData) =>
        prevData.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to toggle task", error);
    } finally {
      setToggleTaskId(null);
    }
  };

  return {
    outstandingTaskTableData,
    completedTasksTableData,
    editingKey,
    newTask,
    isLoading,
    toggleTaskId,
    isToggleLoading,
    handleAddNewTask,
    handleInputChange,
    handleEditTask,
    handleCancelEdit,
    handleSave,
    handleDeleteTask,
    handleToggleTaskCompleted,
  };
};
