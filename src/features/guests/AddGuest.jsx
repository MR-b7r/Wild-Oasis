import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateGuestForm from "./CreateGuestForm";

const AddGuest = () => {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="guest-form"
          renderButton={(open) => {
            return <Button onClick={open}>Add new Guest</Button>;
          }}
        ></Modal.Open>
        <Modal.Window name="guest-form">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddGuest;
