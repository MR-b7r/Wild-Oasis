import React from "react";
import Logo from "../ui/Logo";
import styled from "styled-components";
import ChangePasswordForm from "../features/authentication/ChangePasswordForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const ChangePassword = () => {
  return (
    <LoginLayout>
      <Logo />
      <p>Enter your new Password</p>
      <ChangePasswordForm />
    </LoginLayout>
  );
};

export default ChangePassword;
