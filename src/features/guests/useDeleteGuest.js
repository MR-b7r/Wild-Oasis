import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { mutate: deleteGuest, isLoading: isDeleteing } = useMutation({
    mutationFn: (guestID) => {
      deleteGuestApi(guestID);
    },
    onSuccess: () => {
      toast.success("guest successfully Deleted");

      queryClient.invalidateQueries({ queryKey: ["guests, bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteGuest, isDeleteing };
}
