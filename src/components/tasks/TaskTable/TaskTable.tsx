import { Table, Checkbox, Button, Tag, Space, Typography } from "antd";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetTasksQuery } from "../../../features/tasks/tasksApi";
import { TaskTableContainer } from "./TaskTable.styles";

const { Title } = Typography;

const TasksTable: React.FC = () => {
  const { data = { tasks: [] }, isLoading } = useGetTasksQuery(undefined);

  const columns = [
    {
      title: "",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => <Checkbox checked={completed} />,
    },
    {
      title: "Task name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (tag: string) =>
        tag ? <Tag color={tag === "Urgent" ? "red" : "gray"}>{tag}</Tag> : null,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

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
