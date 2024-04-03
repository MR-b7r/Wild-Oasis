import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("new Booking has been added successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createBooking };
};

export default useCreateBooking;
