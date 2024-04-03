import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked-out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error("There was an error while checking out");
      console.log(err);
    },
  });

  return { checkout, isCheckingOut };
}
