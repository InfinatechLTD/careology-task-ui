import SignInForm from "../components/auth/SignInForm/SignInForm";
import AuthLayout from "../components/Layout/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
