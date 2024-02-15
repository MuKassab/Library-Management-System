// The regex for name allows only characters and spaces between them such those no two spaces are adjacent
// Example: John Doe
export const NAME_REGEX = /^(?!.*\s\s)[a-zA-Z\s]+$/;

// The regex for password allows characters, numbers, and special characters
// Example a54w!@9SZ
export const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+{}|\\[\]:";'<>,.?/~`]+$/;

// The email regex accepts the format of 1+ letters before @ then 1+ letters then . and lastly 2+ letters
// Example John_Doe@domain.com
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
