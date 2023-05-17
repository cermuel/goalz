import { LoginUserType, RegisterUserType, ResetPasswordType } from "@/types";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebaseconfig";
import { toast } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";

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
        res?.user?.displayName &&
          localStorage.setItem("name", res?.user?.displayName);
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

//GET ALL MATCHES
export const GetAllMatches = (setdata: any, seterror: any, setloading: any) => {
  setloading(true);
  axios
    .get(`https://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard`)
    .then((response) => {
      setdata(response?.data);
      setloading(false);
    })
    .catch((err) => {
      setloading(false);
      seterror(err);
      console.log(err);
    });
};

//GET LEAGUE MATCHES
export const GetLeagueMatches = (
  league: string,
  setdata: any,
  seterror: any,
  setloading: any
) => {
  setloading(true);
  axios
    .get(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}.1/scoreboard
    `
    )
    .then((response) => {
      setdata(response?.data);
      setloading(false);
    })
    .catch((err) => {
      setloading(false);
      seterror(err);
      console.log(err);
    });
};

export const GetAllNews = async (
  setdata: any,
  seterror: any,
  setloading: any
) => {
  setloading(true);

  try {
    const response: AxiosResponse = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/all/news`
    );
    setdata(response.data);
    setloading(false);
  } catch (err) {
    setloading(false);
    seterror(err);
  }
};

export const GetLeagueNews = (
  league: string,
  setdata: any,
  seterror: any,
  setloading: any
) => {
  setloading(true);
  axios
    .get(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}.1/news
    `
    )
    .then((response) => {
      setdata(response?.data);
      setloading(false);
    })
    .catch((err) => {
      setloading(false);
      seterror(err);
      console.log(err);
    });
};

export const GetLeagueTeams = (
  league: string,
  setdata: any,
  seterror: any,
  setloading: any
) => {
  setloading(true);
  axios
    .get(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}.1/teams
    `
    )
    .then((response) => {
      setdata(response?.data);
      setloading(false);
    })
    .catch((err) => {
      setloading(false);
      seterror(err);
      console.log(err);
    });
};

export const GetSingleTeam = (
  id: string | number,
  slug: string,
  setdata: any,
  seterror: any,
  setloading: any
) => {
  setloading(true);
  axios
    .get(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}.1/teams/${id}?enable=roster
    `
    )
    .then((response) => {
      setdata(response?.data);
      setloading(false);
    })
    .catch((err) => {
      setloading(false);
      seterror(err);
      console.log(err);
    });
};
