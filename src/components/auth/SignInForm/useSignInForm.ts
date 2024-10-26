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
      console.log("User has been registered successfully!");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onFinish = async (values: SignInFormValues) => {
    try {
      console.log(values);
      await loginUser(values).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // Password confirmation validation rule

  return {
    onFinish,
    isLoading,
    error,
    isSuccess,
  };
};

export default useSignInForm;
