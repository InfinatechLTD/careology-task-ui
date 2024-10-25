import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { SignUpFormContainer } from "./SignUpForm.styles";
import useSignUpForm from "./useSignUpForm";
import { GreenLink } from "../../Common/Link";
import { SignUpFormValues } from "../../../models/auth";

const { Title, Text } = Typography;

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm<SignUpFormValues>();
  const { onFinish, validatePasswordConfirmation, isLoading, error } =
    useSignUpForm();

  return (
    <SignUpFormContainer>
      <Title level={3}>Welcome !</Title>
      <Title level={2}>Sign up to</Title>
      <Text>get things done &#10024;</Text>

      <Form<SignUpFormValues>
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          name="email"
          label="Enter your email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="yours@example.com" defaultValue="test@test.com" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Enter your user name"
          rules={[{ required: true, message: "Please enter your user name" }]}
        >
          <Input placeholder="task master" defaultValue="tester" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Enter your password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            defaultValue="111111"
          />
        </Form.Item>
        <Form.Item
          name="confirmationPassword"
          label="Confirm your password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            validatePasswordConfirmation,
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            defaultValue="111111"
          />
        </Form.Item>
        {error && <p style={{ color: "red" }}>An error occurred</p>}{" "}
        {/* Display error */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
            disabled={isLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>

      <Text style={{ fontWeight: 300, textAlign: "center" }}>
        Already have an account? <GreenLink href="/login">Login</GreenLink>
      </Text>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
