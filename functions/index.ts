import { LoginUserType, RegisterUserType, ResetPasswordType } from "@/types";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebaseconfig";
import { toast } from "react-hot-toast";

//REGISTER USER WITH EMAIL AND PASSWORD
export const RegisterUser = (RegisterDetails: RegisterUserType) => {
  createUserWithEmailAndPassword(
    auth,
    RegisterDetails.email,
    RegisterDetails.password
  )
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, { displayName: RegisterDetails.name })
        .then((res) => {
          toast.success("Account Successfully Created");
          console.log(res);
        })
        .catch((error) => {
          toast.error("Error Creating Account");
          console.log(error);
        });
    })
    .catch((err) => {
      toast.error("Error Creating Account");
      console.log(err);
    });
};

//LOGIN USER WITH EMAIL AND PASSWORD
export const LoginUser = (LoginDetails: LoginUserType) => {
  signInWithEmailAndPassword(auth, LoginDetails.email, LoginDetails.password)
    .then((res) => {
      console.log(res);
      toast.success("Login Successful");
    })
    .catch((err) => {
      toast.error("An error occured");
      console.log(err);
    });
};

export const ResetPassword = (ResetDetails: ResetPasswordType) => {
  sendPasswordResetEmail(auth, ResetDetails.email)
    .then(() => {
      toast.success("Check Email For Reset Link");
    })
    .catch((err) => toast.error("An error occurred"));
};
