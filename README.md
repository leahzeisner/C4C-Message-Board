
# C4C-Message-Board

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It was stylized using the [Tailwind CSS](https://tailwindcss.com/) framework.

This is a Message Board application for C4C. Users can register and login via Firebase email/password authentication.
Once authenticated, they are brought to the message board. Here, they can see all the current messages on the board, and they can post messages of their own.
All messages and user information are stored in Cloud Firestore for Firebase.

## Pages

`Login.js` - Handles user login & Firebase authentication.

`Register.js` - Handles user registration & creating authenticated users in Firebase.

`MessageBoard.js` - Handles all message board ui components and actions.

## Components

`Header.js` - Contains a welcome message for the current user, the logout button, and the page title. The logout button uses Firebase to sign out the current authenticated user.

`MessageInput.js` - Handles message posting & updating the state. When a message is posted, it updates the messages in Firebase, and updates the state of the <b>MessagesList</b> component.

`MessageList.js` - Displays all the current messages stored in Firebase as a list of <b>Message</b> components.

`Message.js` - The component for a single message, which contains the message's text, author, and a timestamp for when it was posted.

## Requirements Covered

This project covers all the requirements outlined in the project description. 

A user can post a message to the board. Their message must be non-empty and at most 128 characters. There is a character count to display the current length of the message. Once the count reaches 128, the user cannot type anything else into the input box.

The messages on the board are sorted top-down from most to least recent.

The app uses Firebase Cloud Firestore to store the messages so that users on different computers and operating systems can post to the same board and view all the other messages.

## Additional Details

1. The use of Firebase ensures the data persists on disk.

2. Users can signup, login, logout, and post under a username. Their username is displayed in the <b>Header</b> component, as well as on each message they post.

3. The app uses the npm "bad-words" package to filter out any innappropriate language posted by a user. It replaces any bad language with x's.

4. There's a character count that updates as the user types for better user experience.

## Future implementation plans

1. Allow users to edit or delete their messages.

2. Allow users to edit their profile (email, password, username).

3. Enable searching for specific messages via keywords.

4. Enable hashtags on posts and searching for messages via hashtags.

5. Allow message reporting, and include a red flag icon on any reported messages or messages filtered by the "bad-words" package.

6. Allow additional sign-in methods besides email/password, such as Google, Facebook, Apple, Twitter.

7. Add additional authentication security via SMS Multi-factor Authentication.

## How to start the application

### Prerequisites

1. [Install "Node.js" and "npm"](https://nodejs.org/en/download/current/) 

### Running on localhost:

1. Run `npm install`

2. Run `npm start`

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
