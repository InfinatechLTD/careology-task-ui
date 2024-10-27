import { Checkbox, Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns = [
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
