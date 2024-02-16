// The regex for name allows only characters and spaces between them such those no two spaces are adjacent
// Example: John Doe
export const NAME_REGEX = /^(?!.*\s\s)[a-zA-Z\s]+$/;

// The regex for password allows characters, numbers, and special characters
// Example a54w!@9SZ
export const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+{}|\\[\]:";'<>,.?/~`]+$/;

// The email regex accepts the format of 1+ letters before @ then 1+ letters then . and lastly 2+ letters
// Example John_Doe@domain.com
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// The ISBN regex accept a string of length 17 which includes 13 digits and 4 hyphens
// The regex allows the overall length to be less than 17 but this can be fixed by Joi and database validation
// Example 978-0-545-01022-1
export const ISBN_REGEX = /^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/;
