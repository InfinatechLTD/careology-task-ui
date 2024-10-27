import { useLoginUserMutation } from "../../../features/auth/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignInFormValues } from "../../../models/auth";

const useSignInForm = () => {
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate(); // React-router navigation hook

  // Handle success and navigate to login page
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onFinish = async (values: SignInFormValues) => {
    try {
      await loginUser(values).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    alert("Not implemented yet! Sorry :)");
  };

  // Password confirmation validation rule

  return {
    onFinish,
    handleForgotPassword,
    isLoading,
    error,
    isSuccess,
  };
};

export default useSignInForm;
