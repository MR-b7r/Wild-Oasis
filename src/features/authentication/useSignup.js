import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Plaese verify the new account from user's email address"
      );
    },
    onError: (err) => {
      console.error(err);
      toast.error("Invalid Email or Password");
    },
  });
  return { signup, isLoading };
}
