import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useChangePassword = () => {
  const { isLoading, mutate: changePassword } = useMutation({
    mutationFn: ({ newPassword }) => changePasswordApi(newPassword),
    onSuccess: () => {
      toast.success("Password updated Successfully");
    },
    onError: () => {
      toast.error("Provided Email is incorrect");
    },
  });
  return { changePassword, isLoading };
};

export default useChangePassword;
