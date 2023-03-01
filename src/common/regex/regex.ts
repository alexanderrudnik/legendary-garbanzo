export const PASSWORD_NUMBER_REGEX = /(?=.*\d)/;
export const PASSWORD_UPPER_CASE_REGEX = /(?=.*[A-Z])/;
export const PASSWORD_LOWER_CASE_REGEX = /(?=.*[a-z])/;

export const TELEGRAM_AT_REGEX = /^((?!@).)*$/;

export const LINK_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
