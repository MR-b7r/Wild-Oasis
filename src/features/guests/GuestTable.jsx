import GuestRow from "./GuestRow";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import useGuests from "./useGuests";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function GuestTable() {
  const { guests, isLoading, count } = useGuests();

  if (isLoading) return <Spinner />;
  if (!guests) return <Empty resourceName="Guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.4fr 1.4fr 1.2fr 1fr .1fr 0.5fr">
        <Table.Header role="row">
          <div>ID</div>
          <div>GUEST</div>
          <div>Email</div>
          <div>nationalID</div>
          <div>Country</div>
          <div>Flag</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
