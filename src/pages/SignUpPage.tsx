import SignUpForm from "../components/auth/SignUpForm/SignUpForm";
import { AuthLayout } from "../components/Layout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
