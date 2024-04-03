import React, { useState } from "react";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useMoveBack } from "../../hooks/useMoveBack";
import useForgotPassword from "./useForgotPassword";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const [email, setEmail] = useState("");

  const moveBack = useMoveBack();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Provided Email is incorrect");
      return;
    }
    forgotPassword(email);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          disabled={isLoading}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button disabled={isLoading}>Reset Passowrd</Button>
        <Button variation="secondary" type="reset" onClick={moveBack}>
          Cancel
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default ForgotPasswordForm;
