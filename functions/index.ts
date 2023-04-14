export function ValidateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export const ValidatePasswordStrength = (password: string) => {
  let strength = 0;
  const feedback = [];
  let strong: boolean = false;

  if (password.length >= 10) {
    strength++;
  } else {
    feedback.push("Must be 10 characters of greater");
  }

  if (/[a-z]/.test(password)) {
    strength++;
  } else {
    feedback.push("Must have at least 1 lowercase letter");
  }

  if (/[A-Z]/.test(password)) {
    strength++;
  } else {
    feedback.push("Must have at least 1 uppercase letter");
  }

  if (/[0-9]/.test(password)) {
    strength++;
  } else {
    feedback.push("Must have at least 1 number");
  }

  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
    strength++;
  } else {
    feedback.push("Must have at least 1 special character");
  }

  if (strength >= 5) {
    strong = true;
  }
  return { strength, feedback, strong };
};

export const InchToFeet = (inch: string | number) => {
  let feet: number;
  if (typeof inch == "string") {
    feet = Number(inch) * 0.083;
  } else {
    feet = inch * 0.083;
  }
  return feet;
};

//1985-09-03T07:00Z conert to dob format
export const getAthleteDOBFormat = (isoDate: string) => {
  const dob: string = new Date(isoDate).toLocaleDateString();
  return dob;
};
