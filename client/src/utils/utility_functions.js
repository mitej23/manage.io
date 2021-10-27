export const getUserIdFromEmail = (email) => {
  const userId = email.split("@")[0];
  return userId;
};
