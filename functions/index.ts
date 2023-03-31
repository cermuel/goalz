import { LoginUserType, RegisterUserType, ResetPasswordType } from "@/types";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebaseconfig";

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
          console.log("User created successfully!");
          console.log(res);
        })
        .catch((error) => {
          console.error("Error Creating User:", error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//LOGIN USER WITH EMAIL AND PASSWORD
export const LoginUser = (LoginDetails: LoginUserType) => {
  signInWithEmailAndPassword(auth, LoginDetails.email, LoginDetails.password)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const ResetPassword = (ResetDetails: ResetPasswordType) => {
  sendPasswordResetEmail(auth, ResetDetails.email)
    .then((res) => {
      console.log(res);
      console.log("Mail sent");
    })
    .then((err) => console.log(err));
};
