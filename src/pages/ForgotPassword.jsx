import React from "react";
import Logo from "../ui/Logo";
import styled from "styled-components";
import ForgotPasswordForm from "../features/authentication/ForgotPasswordForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const ForgotPassword = () => {
  return (
    <LoginLayout>
      <Logo />
      <p>
        Enter your email address and we will send you a link to reset your
        password.t
      </p>
      <ForgotPasswordForm />
    </LoginLayout>
  );
};

export default ForgotPassword;
