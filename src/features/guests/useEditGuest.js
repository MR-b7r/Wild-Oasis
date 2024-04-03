import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest as editGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

const useCreateGuest = () => {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editGuest } = useMutation({
    mutationFn: ({ newGuestData, id }) => editGuestApi(newGuestData, id),
    onSuccess: () => {
      toast.success("Guest has been Edited successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editGuest };
};

export default useCreateGuest;
