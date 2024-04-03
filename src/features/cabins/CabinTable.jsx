import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const [searchParams] = useSearchParams();

  const { cabins, isLoading } = useCabin();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="Bookings" />;

  // FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // function compare(a, b) {
  //   if (a["name"] < b["name"]) {
  //     return modifier * -1;
  //   }
  //   if (a["name"] > b["name"]) {
  //     return modifier * 1;
  //   }
  //   return 0;
  // }

  const sortedCabins =
    field === "name"
      ? // ? filteredCabins.sort(compare)
        filteredCabins.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>CAPACITY</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
