import React from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { SignInFormContainer } from "./SignInForm.styles";
import { GreenLink } from "../../Common/Link";
import { SignInFormValues } from "../../../models/auth";
import useSignInForm from "./useSignInForm";

const { Title, Text } = Typography;

const SignInForm: React.FC = () => {
  const [form] = Form.useForm<SignInFormValues>();
  const { onFinish, handleForgotPassword, isLoading, error } = useSignInForm();

  return (
    <SignInFormContainer>
      <Title level={3}>Welcome !</Title>
      <Title level={2}>Sign in to</Title>
      <Text>get things done &#10024;</Text>

      <Form<SignInFormValues>
        form={form}
        name="login"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Text
            style={{ fontWeight: 300, fontSize: "14px", textAlign: "center" }}
          >
            <GreenLink onClick={handleForgotPassword}>
              Forgot Password?
            </GreenLink>
          </Text>
        </div>
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
            Login
          </Button>
        </Form.Item>
      </Form>

      <Text style={{ fontWeight: 300, textAlign: "center" }}>
        Don't have an account? <GreenLink href="/sign-up">Register</GreenLink>
      </Text>
    </SignInFormContainer>
  );
};

export default SignInForm;
