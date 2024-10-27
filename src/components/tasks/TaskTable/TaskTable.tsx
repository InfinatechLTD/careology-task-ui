import { Table, Button, Tag, Typography } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useGetTasksQuery } from "../../../features/tasks/tasksApi";
import { TaskTableContainer } from "./TaskTable.styles";
import { columns } from "./TaskTable.helper";

const { Title } = Typography;

const TasksTable: React.FC = () => {
  const { data = { tasks: [] }, isLoading } = useGetTasksQuery(undefined);

  const dataWithEditableRow = [...data.tasks];

  return (
    <TaskTableContainer>
      <Button
        type="primary"
        onClick={() => {}}
        icon={<PlusOutlined />}
        style={{ marginBottom: "32px" }}
      >
        Add Task
      </Button>

      <Title level={4}>Tasks to do</Title>

      <Table
        columns={columns}
        dataSource={dataWithEditableRow}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #f0f0f0",
        }}
      />
    </TaskTableContainer>
  );
};

export default TasksTable;
