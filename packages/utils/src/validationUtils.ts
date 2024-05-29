export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

export const PASSWORD_SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{}|']/;

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|'])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|']{6,128}$/;


export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);

export const isValidPassword = (password: string) =>
  PASSWORD_REGEX.test(password);

export const hasSpecialCharInUserPassword = (password: string) =>
  PASSWORD_SPECIAL_CHAR_REGEX.test(password);

export function isNonEmptyString(value: string | null | undefined): boolean {
  return (value ?? "").trim().length > 0;
}

export function isString(value: FormDataEntryValue): value is string {
  return typeof value === "string";
}
