import React from "react";
import { Controller, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";

import useCreateGuest from "./useCreateGuest";

import useCountries from "../../hooks/useCountries";

const CreateGuestForm = ({ onCloseModal }) => {
  const { isCreating, createGuest } = useCreateGuest();
  const { isLoading: isCountryLoading, countries } = useCountries();
  const { register, handleSubmit, reset, formState, control } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;
    const finalData = {
      ...data,
      countryFlag,
    };
    createGuest(finalData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  if (isCountryLoading) {
    return <Spinner />;
  }
  const guestValidation = {
    fullName: { required: "This field is required" },

    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email address",
      },
    },

    nationalID: { required: "National ID is required" },

    nationality: { required: "National ID is required" },
  };
  const countriesOptionsNationality = [
    { value: "", label: "Select a Country" },
    ...countries
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((country, index) => ({
        value: country.label,
        label: country.label,
        flagUrl: country.flagUrl,
        key: `${country.value}-${index}`,
      })),
  ];
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="fullName"
          {...register("fullName", guestValidation.fullName)}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="email"
          {...register("email", guestValidation.email)}
        />
      </FormRow>

      <FormRow label="national ID" error={errors?.nationalID?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="nationalID"
          {...register("nationalID", guestValidation.nationalID)}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Controller
          name="nationality"
          control={control}
          rules={guestValidation.nationality}
          render={({ field }) => (
            <Select
              {...field}
              options={countriesOptionsNationality}
              disabled={isCreating}
            />
          )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>create Guest</Button>
      </FormRow>
    </Form>
  );
};

export default CreateGuestForm;
