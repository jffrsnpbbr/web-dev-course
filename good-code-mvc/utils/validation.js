function postIsValid(title, content) {
  return (title && content && title.trim() !== '') || content.trim() !== '';
}

function userIsValid(email, confirmEmail, password) {
  return (
    email &&
    confirmEmail &&
    password &&
    password.trim().length > 6 &&
    email === confirmEmail &&
    confirmEmail.includes('@')
  );
}

module.exports = {
  postIsValid,
};
