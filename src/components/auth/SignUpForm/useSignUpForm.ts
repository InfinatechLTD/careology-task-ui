import { RuleObject } from "rc-field-form/lib/interface"; // For custom validator typing
import { SignUpFormValues } from "../../../models/auth";
import { useRegisterUserMutation } from "../../../features/auth/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSignUpForm = () => {
  const [registerUser, { isLoading, error, isSuccess }] =
    useRegisterUserMutation();

  const navigate = useNavigate(); // React-router navigation hook

  // Handle success and navigate to login page
  useEffect(() => {
    if (isSuccess) {
      console.log("User has been registered successfully!");
      navigate("/sign-in"); // Navigate to login page
    }
  }, [isSuccess, navigate]);

  const onFinish = async (values: SignUpFormValues) => {
    try {
      console.log(values);
      await registerUser(values).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // Password confirmation validation rule
  const validatePasswordConfirmation = ({
    getFieldValue,
  }: {
    getFieldValue: (field: string) => string;
  }): RuleObject => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return {
    onFinish,
    validatePasswordConfirmation,
    isLoading,
    error,
    isSuccess,
  };
};

export default useSignUpForm;
