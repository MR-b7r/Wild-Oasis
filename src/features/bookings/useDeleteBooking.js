import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),

    onSuccess: () => {
      toast.success("booking successfully Deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleteing, deleteBooking };
};
