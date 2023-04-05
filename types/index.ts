export type RegisterUserType = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  email: string;
};

export type InputType = {
  placeholder: string;
  onChange: void | string | any;
  type: string;
  label: string;
  error?: boolean;
};

export type ButtonType = {
  onClick: any;
  text: string;
  loading: boolean;
  disabled?: boolean;
};

export type MatchCardType = {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamGoals: number | string;
  awayTeamGoals: number | string;
  homeTeamImageUrl: string;
  awayTeamImageUrl: string;
  status: string;
  redirect: redirect;
  homeWinner: boolean;
  awayWinner: boolean;
};

export type redirect = {
  path: string;
  matchData: matchData | any;
};

export type matchData = {
  homeTeamName: string | any;
  awayTeamName: string | any;
  homeTeamGoals: number | string | any;
  awayTeamGoals: number | string;
  homeTeamImageUrl: string | any;
  awayTeamImageUrl: string | any;
  homeTeamForm: string | any;
  awayTeamForm: string | any;
  headline: string | any;
  venue: string | any;
  status: string | any;
  matchEvents?: matchEvents[];
  homeTeamOdds?: number | string;
  awayTeamOdds?: number | string;
  drawOdds?: number | string;
  competition: string;
};

export type matchEvents = {
  athlete: string | any;
  time: number | string | any;
  eventType: string | any;
  homeTeam: boolean | any;
};

export type NewsCardType = {
  image: string;
  date: string | number;
  headline: string;
  action: void | any;
};

export type NewsRedirectType = {
  path: string;
  newsData: newsDataType;
};

export type newsDataType = {
  headline: string;
  image: string;
  description: string;
  datePublished: string;
  link: string | string[];
  category: string;
};
