import { MainLayout } from "../components/Layout";
import TasksHeader from "../components/Tasks/TasksHeader/TasksHeader";
import TasksTable from "../components/Tasks/TaskTable/TasksTable";

const TasksPage = () => {
  return (
    <MainLayout>
      <TasksHeader />
      <TasksTable />
    </MainLayout>
  );
};

export default TasksPage;
