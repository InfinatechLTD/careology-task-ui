import { RuleObject } from "rc-field-form/lib/interface"; // For custom validator typing

export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const useSignUpForm = () => {
  const onFinish = (values: SignUpFormValues) => {
    console.log("Form Values: ", values);
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

  const handleRegistrationClick = () => {
    console.log("clicked");
  };

  return {
    onFinish,
    handleRegistrationClick,
    validatePasswordConfirmation,
  };
};

export default useSignUpForm;
