import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

const GuestTableOperations = () => {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "created_at-asc", label: "Default Sort by (creation Time)" },
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
          { value: "nationality-asc", label: "Sort by nationality (A-Z)" },
          { value: "nationality-desc", label: "Sort by nationality (A-Z)" },
        ]}
      />
    </TableOperations>
  );
};

export default GuestTableOperations;
