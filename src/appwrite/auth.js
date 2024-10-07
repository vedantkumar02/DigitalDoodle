// Importing configuration from a separate file
import conf from "../conf/conf";

// Importing necessary classes from the "appwrite" library
import { Client, Account, ID } from "appwrite";

// Defining a class for authentication services
export class AuthenticationService {
  // Initializing the Appwrite client
  client = new Client();

  // Initializing the account object
  account;

  // Constructor function to set up the client and account
  constructor() {
    // Setting the endpoint and project ID for the Appwrite client
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectId);

    // Creating a new account object using the client
    this.account = new Account(this.client);
  }

  // Method to sign up a new user
  async signup({ email, password, name }) {
    try {
      // Creating a new user with a unique ID, email, password, and name
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // If the user is created successfully, log them in
      if (user) {
        return this.login({ email, password });
      } else {
        // Return the user object if creation fails
        return user;
      }
    } catch (e) {
      // Log any errors that occur during sign up
      console.log(e);
    }
  }

  // Method to log in an existing user
  async login({ email, password }) {
    try {
      // Creating a new session for the user
      const user = await this.account.createSession(email, password);

      // Return the user object if login is successful
      if (user) {
        return user;
      }
    } catch (e) {
      // Log any errors that occur during login
      console.log(e);
    }
    // Return null if login fails
    return null;
  }

  // Method to log out the current user
  async logout() {
    try {
      // Deleting all sessions for the current user
      return await this.account.deleteSessions();
    } catch (e) {
      // Log any errors that occur during logout
      console.log(e);
    }
  }

  // Method to check if a user is authenticated
  async checkauthuser() {
    try {
      // Getting the current user object
      return await this.account.get();
    } catch (e) {
      // Log any errors that occur during authentication check
      console.log(e);
    }
  }
}

// Creating a new instance of the AuthenticationService class
const authenticationservice = new AuthenticationService();

// Exporting the authentication service instance
export default authenticationservice;
