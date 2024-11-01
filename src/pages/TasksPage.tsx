import { MainLayout } from "../components/Layout";
import TasksHeader from "../components/tasks/TasksHeader/TasksHeader";
import TasksTable from "../components/tasks/TaskTable/TasksTable";

const TasksPage = () => {
  return (
    <MainLayout>
      <TasksHeader />
      <TasksTable />
    </MainLayout>
  );
};

export default TasksPage;
