export function SignUp(username, email, password) {
  try {
    console.log(
      `Username: ${username}, Email: ${email}, Password: ${password}`
    );

    // check if the email is already used

    // hash the password

    // create a new user object

    // add the user object to db

    // return the data back
    return true;
  } catch (error) {
    return error;
  }
}

export function SignIn(email, password) {
  try {
    console.log(`Email: ${email}, Password: ${password}`);

    // check if the email and password is valid

    // return the data back
    return true;
  } catch (error) {
    return error;
  }
}
