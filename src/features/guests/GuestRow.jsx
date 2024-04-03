import styled from "styled-components";
import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteGuest } from "./useDeleteGuest";
import EditGuestForm from "./EditGuestForm";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const Number = styled.div`
  font-family: "Sono";
  font-weight: 500;
  font-size: 1.4rem;
`;

const GuestRow = ({ guest }) => {
  const { deleteGuest, isDeleteing } = useDeleteGuest();
  const {
    countryFlag,
    // created_at,s
    fullName,
    email,
    id: guestID,
    nationalID,
    nationality,
  } = guest;
  return (
    <Table.Row>
      <Cabin>{guestID}</Cabin>

      <Stacked>
        <span>{fullName}</span>
      </Stacked>

      <Stacked>
        <span>{email}</span>
      </Stacked>

      <Number>
        <span>{nationalID}</span>
      </Number>

      <Stacked>
        <span>{nationality}</span>
      </Stacked>
      <Stacked>
        {countryFlag && (
          <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
        )}
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guestID} />

          <Menus.List id={guestID}>
            <Modal.Open
              opens="edit"
              renderButton={(open) => (
                <Menus.Button icon={<HiPencil />} onClick={open}>
                  Edit
                </Menus.Button>
              )}
            ></Modal.Open>

            <Modal.Open
              opens="deleteGuest"
              renderButton={(open) => (
                <Menus.Button icon={<HiTrash />} onClick={open}>
                  Delete Guest
                </Menus.Button>
              )}
            ></Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="deleteGuest">
          <ConfirmDelete
            resourceName="guest"
            disabled={isDeleteing}
            onConfirm={() => deleteGuest(guestID)}
          />
        </Modal.Window>
        <Modal.Window name="edit">
          <EditGuestForm guestToEdit={guest} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default GuestRow;
