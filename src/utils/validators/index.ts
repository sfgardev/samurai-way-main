export const required = (value: string) => {
  if (value) return undefined;

  return "Field is required";
};

export const maxLengthCreator = (maxLength: number) => (value: string) => {
  if (value.length > maxLength)
    return `Max length should be ${maxLength} symbols`;

  return undefined;
};

// export const maxLength30 = (value: string) => {
//   if (value.length < 30) return undefined;

//   return "Max length should be 30";
// };
