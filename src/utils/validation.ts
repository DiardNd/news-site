const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const usernameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9_-]{1,24}$/;

export const checkIsEmailValid = (email: string) => {
  if (!email) {
    return 'You must fill in your email';
  } else if (!emailRegex.test(email)) {
    return 'Please enter a valid email';
  }

  return null;
};

export const checkIsPasswordValid = (password: string) => {
  if (!password) {
    return 'You must fill in your password';
  } else if (password.length < 7) {
    return 'Password must be at least 7 characters long';
  }

  return null;
};

export const checkIsNameValid = (username: string) => {
  if (!username) {
    return 'You must fill in your name';
  } else if (!usernameRegex.test(username)) {
    return 'Please enter a valid username';
  }

  return null;
};
