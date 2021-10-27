const getUserNameFromEmail = (email) => {
  const userName = email.split("@")[0];
  return userName;
};

module.exports = {
  getUserNameFromEmail,
};
