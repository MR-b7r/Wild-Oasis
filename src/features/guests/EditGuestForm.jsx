import React from "react";
import { Controller, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";

import useEditGuest from "./useEditGuest";

import useCountries from "../../hooks/useCountries";

const EditGuestForm = ({ guestToEdit = {}, onCloseModal }) => {
  const { isEditing, editGuest } = useEditGuest();
  const { isLoading: isCountryLoading, countries } = useCountries();
  const { id: editID, ...editValues } = guestToEdit;

  const { register, handleSubmit, reset, formState, control } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

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

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;
    const finalData = {
      ...data,
      countryFlag,
    };
    editGuest(
      { newGuestData: finalData, id: editID },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          disabled={isEditing}
          type="text"
          id="fullName"
          {...register("fullName", guestValidation.fullName)}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          disabled={isEditing}
          type="text"
          id="email"
          {...register("email", guestValidation.email)}
        />
      </FormRow>

      <FormRow label="national ID" error={errors?.nationalID?.message}>
        <Input
          disabled={isEditing}
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
              disabled={isEditing}
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
        <Button disabled={isEditing}>Edit Guest</Button>
      </FormRow>
    </Form>
  );
};

export default EditGuestForm;
