import { Button, Input, Typography } from "antd";
import { TaskHeaderContainer } from "./TaskHeader.styles";
import { SearchOutlined, LockOutlined } from "@ant-design/icons";
import useTaskHeader from "./useTaskHeader";

const { Title } = Typography;

const TasksHeader = () => {
  const { handleLogout } = useTaskHeader();

  return (
    <TaskHeaderContainer>
      <Title level={4} style={{ alignSelf: "flex-start" }}>
        My Tasks for the next month
      </Title>

      <div style={{ display: "flex", gap: "16px" }}>
        <Input placeholder="Search" prefix={<SearchOutlined />}></Input>

        <Button type="default" icon={<LockOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </TaskHeaderContainer>
  );
};

export default TasksHeader;
