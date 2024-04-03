import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        FilterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No-discount" },
          { value: "with-discount", label: "With-discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "created_at-asc", label: "Default Sort by (creation Time)" },

          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },

          { value: "regularPrice-asc", label: "Sort by Price (Low first)" },
          { value: "regularPrice-desc", label: "Sort by Price (high first)" },

          { value: "maxCapacity-asc", label: "Sort by Capacity (Low first)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
