import { Table, Button, Typography, Input } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useTasksTable } from "./useTasksTable";
import { TaskTableContainer } from "./TasksTable.styles";

const { Title } = Typography;

const TasksTable: React.FC = () => {
  const {
    tableData,
    editingKey,
    newTask,
    isLoading,
    handleAddNewTask,
    handleInputChange,
    handleSave,
  } = useTasksTable();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) =>
        editingKey === record.id ? (
          <Input
            value={newTask?.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          record.name
        ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (_: any, record: any) =>
        editingKey === record.id ? (
          <Input
            value={newTask?.dueDate || ""}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        ) : (
          record.dueDate
        ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (_: any, record: any) =>
        editingKey === record.id ? (
          <Input
            value={newTask?.note || ""}
            onChange={(e) => handleInputChange("note", e.target.value)}
          />
        ) : (
          record.note
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) =>
        editingKey === record.id ? (
          <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>
            Save
          </Button>
        ) : null,
    },
  ];

  return (
    <TaskTableContainer>
      <Button
        type="primary"
        onClick={handleAddNewTask}
        icon={<PlusOutlined />}
        style={{ marginBottom: "32px" }}
      >
        Add Task
      </Button>

      <Title level={4}>Tasks to do</Title>

      <Table
        columns={columns}
        dataSource={tableData}
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
