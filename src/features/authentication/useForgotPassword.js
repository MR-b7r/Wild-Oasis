import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const { isLoading, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success("Check your email for the reset link");
    },
    onError: () => {
      toast.error("Provided Email is incorrect");
    },
  });
  return { forgotPassword, isLoading };
};

export default useForgotPassword;
