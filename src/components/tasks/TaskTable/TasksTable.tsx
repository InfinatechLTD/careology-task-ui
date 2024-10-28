import {
  Table,
  Button,
  Typography,
  Input,
  Select,
  Tag,
  DatePicker,
  Space,
  Checkbox,
  Spin,
} from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTasksTable } from "./useTasksTable";
import { TaskTableContainer } from "./TasksTable.styles";
import dayjs, { Dayjs } from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const formatDate = (date: Dayjs | null): string => {
  return date ? date.format("YYYY-MM-DD") : "";
};

const parseDate = (dateString: string): Dayjs | null => {
  return dateString ? dayjs(dateString) : null;
};

const TasksTable: React.FC = () => {
  const {
    outstandingTaskTableData,
    completedTasksTableData,
    editingKey,
    newTask,
    isLoading,
    toggleTaskId,
    isToggleLoading,
    handleAddNewTask,
    handleInputChange,
    handleSave,
    handleEditTask,
    handleCancelEdit,
    handleDeleteTask,
    handleToggleTaskCompleted,
  } = useTasksTable();

  const isEditing = (record: any) => record.id === editingKey;

  const columns = [
    {
      title: "",
      dataIndex: "completed",
      key: "completed",
      width: 10,
      render: (_: any, record: any) => {
        return isToggleLoading && toggleTaskId === record.id ? (
          <Spin size="small" />
        ) : (
          <Checkbox
            checked={record.completed}
            onChange={() => handleToggleTaskCompleted(record)}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) =>
        isEditing(record) ? (
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
      width: 150,
      render: (_: any, record: any) =>
        isEditing(record) ? (
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
        isEditing(record) ? (
          <Select
            value={newTask?.tag || "Not Urgent"}
            onChange={(value) => handleInputChange("tag", value)}
          >
            <Option value="Urgent">Urgent</Option>
            <Option value="Not Urgent">Not Urgent</Option>
          </Select>
        ) : (
          <Tag color={record.tag === "Urgent" ? "red" : "gray"}>
            {record.tag}
          </Tag>
        ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (_: any, record: any) =>
        isEditing(record) ? (
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
      width: 100,
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button icon={<CloseOutlined />} onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditTask(record)}
            ></Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteTask(record)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <TaskTableContainer>
      <Button type="primary" onClick={handleAddNewTask} icon={<PlusOutlined />}>
        Add Task
      </Button>

      <Title level={4}>Tasks to do</Title>

      <Table
        columns={columns}
        dataSource={outstandingTaskTableData}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #f0f0f0",
        }}
      />

      <Title level={4}>Completed tasks</Title>

      <Table
        columns={columns}
        dataSource={completedTasksTableData}
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
