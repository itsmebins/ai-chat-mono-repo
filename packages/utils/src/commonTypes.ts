export interface BaseUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  preferences?: UserPreferences;
  password: string;
  postcode?: string;
  countryCode?: string;
  userPrefLang?: string;
}

export interface ChatMessage {
  id: string;
  chatID: string;
  parentID?: string;
  timestamp: number;
  role: string;
  model?: string;
  content: string;
  done?: boolean;
}

export interface UserPreferences {
  marketing?: boolean;
  emailPref: {
    emailNotify: boolean;
    system: boolean;
    activity: boolean;
  };
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface FieldError {
  errorCode: string;
  errorMsg?: string;
  params?: { [key: string]: string };
  fieldName?: string;
}

export interface ApiPayload<T> {
  success: boolean;
  errorCode?: string;
  errorMsg?: string;
  errors?: FieldError[];
  data: T;
}

export interface SignInErrorDataResponse {
  signInAttemptsLeft: number;
}

export interface ApiResponseData {
  // Define the structure of the data property
}

export interface ApiErrorResponse {
  response: {
    data: ApiResponseData;
    status?: number;
    // any other properties you expect in the response
  };
}
