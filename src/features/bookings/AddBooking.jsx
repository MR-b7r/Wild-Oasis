import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="booking-form"
          renderButton={(open) => {
            return <Button onClick={open}>Add new Booking</Button>;
          }}
        ></Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default AddBooking;
