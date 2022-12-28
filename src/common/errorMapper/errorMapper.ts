export const errorMapper = (error: string) => {
  const message = error.slice(error.indexOf("/") + 1, error.indexOf(")")); // too-many-requests
  const messageWithSpaces = message.replaceAll("-", " "); // too many requests

  return `${messageWithSpaces
    .slice(0, 1)
    .toUpperCase()}${messageWithSpaces.slice(1)}`; // Too many requests
};
