import {
  Table,
  Button,
  Typography,
  Input,
  Select,
  Tag,
  DatePicker,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useTasksTable } from "./useTasksTable";
import { TaskTableContainer } from "./TasksTable.styles";
import dayjs, { Dayjs } from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const formatDate = (date: Dayjs | null): string => {
  return date ? date.format("YYYY-MM-DD") : "";
};

// Function to parse 'YYYY-MM-DD' string to dayjs object
const parseDate = (dateString: string): Dayjs | null => {
  return dateString ? dayjs(dateString) : null;
};

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
          <DatePicker
            value={newTask?.dueDate ? parseDate(newTask.dueDate) : null}
            onChange={(date) =>
              handleInputChange("dueDate", date ? formatDate(date) : null)
            }
            format="YYYY-MM-DD"
          />
        ) : (
          record.dueDate
        ),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (_: any, record: any) =>
        editingKey === record.id ? (
          <Select
            value={newTask?.tag || "Not Urgent"}
            onChange={(value) => handleInputChange("tag", value)}
          >
            <Option value="Urgent">Urgent</Option>
            <Option value="Not Urgent">Not Urgent</Option>
          </Select>
        ) : record.tag ? (
          <Tag color={record.tag === "Urgent" ? "red" : "gray"}>
            {record.tag}
          </Tag>
        ) : null,
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
