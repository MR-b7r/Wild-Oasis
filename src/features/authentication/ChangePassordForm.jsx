import React from "react";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useChangePassword from "./useChangePassword";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

const ChangePassordForm = () => {
  const navigate = useNavigate();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { changePassword, isLoading } = useChangePassword();

  function onSubmit({ newPassword }) {
    changePassword(
      { newPassword },
      {
        onSettled: () => {
          reset();
          navigate("/login");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Reapeat New Password">
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "The password do not match",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" variation="secondary" disabled={isLoading}>
          {!isLoading ? "Change Password" : <SpinnerMini />}
        </Button>

        <Button size="large" variation="secondary" disabled={isLoading}>
          Cancel
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default ChangePassordForm;
