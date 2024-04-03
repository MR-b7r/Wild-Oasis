import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { RESULT_PER_PAGE } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";

const useGuests = () => {
  const queryCLient = useQueryClient();
  const [searchParams] = useSearchParams();

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : searchParams.get("page");

  const {
    data: { data: guests, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests", page, sortBy],
    queryFn: () => getGuests({ page, sortBy }),
  });

  // PRE_FETCHING;
  const pageCount = Math.ceil(count / RESULT_PER_PAGE);

  if (page < pageCount)
    queryCLient.prefetchQuery({
      queryKey: ["guests", sortBy, page + 1],
      queryFn: () => getGuests({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryCLient.prefetchQuery({
      queryKey: ["guests", sortBy, page - 1],
      queryFn: () => getGuests({ sortBy, page: page - 1 }),
    });

  return { guests, isLoading, error, count };
};

export default useGuests;
