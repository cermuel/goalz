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
export const RegisterUser = (
  RegisterDetails: RegisterUserType,
  extraFunc: any,
  setloading: any
) => {
  setloading(true);
  if (
    RegisterDetails.email &&
    RegisterDetails.password &&
    RegisterDetails.name
  ) {
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
            setTimeout(() => {
              extraFunc();
            }, 3000);
            setloading(false);
          })
          .catch((error) => {
            toast.error("Error Creating Account");
            console.log(error);
            setloading(false);
          });
      })
      .catch((err) => {
        toast.error("Error Creating Account");
        console.log(err);
        setloading(false);
      });
  } else {
    toast.error("Fill in all details");
    setloading(false);
  }
};

//LOGIN USER WITH EMAIL AND PASSWORD
export const LoginUser = (
  LoginDetails: LoginUserType,
  extraFunc: any,
  setloading: any
) => {
  setloading(true);
  if (LoginDetails.email && LoginDetails.password) {
    signInWithEmailAndPassword(auth, LoginDetails.email, LoginDetails.password)
      .then((res) => {
        console.log(res);
        toast.success("Login Successful");
        setTimeout(() => {
          extraFunc();
        }, 3000);
        setloading(false);
      })
      .catch((err) => {
        toast.error("An error occured");
        console.log(err);

        setloading(false);
      });
  } else {
    toast.error("Fill in all details");
    setloading(false);
  }
};

//FORGOT PASSWORD
export const ResetPassword = (ResetDetails: ResetPasswordType) => {
  sendPasswordResetEmail(auth, ResetDetails.email)
    .then(() => {
      toast.success("Check Email For Reset Link");
    })
    .catch((err) => toast.error("An error occurred"));
};
