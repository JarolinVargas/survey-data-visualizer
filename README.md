This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installing and running the app
 - Clone or download this this repo to your computer.
 - Install `Node >= 8.10 and npm >= 5.6` if not already installed. [Nodejs](https://nodejs.org/en/download/)
 - using the terminal; `cd` into the downloaded folder directory and run `npm install`. If installation fails; running `sudo npm install` and entering your password might help.
 - Once installed, run `npm start`. A new window should automatically open on your default web browser pointing to `localhost`.

## Folder structure
`/survey-data-visualizer`
 - `/design/` - Stores app design files and image templates.
 - `/src/assets/` - Stores images and all media related files.
 - `/src/components/` - Stores components .js and .scss files.
 
## Libraries
 - [use-http](https://github.com/alex-cory/use-http) - Reack hook for making http requests.
 - [framer-motion](https://github.com/framer/motion) - Animation library for react. Includes positionTransition and layoutTransition features.
 - [fontawesome](https://github.com/FortAwesome/react-fontawesome) - Use SVG FontAwesome icons in React apps.

 ## To-do
  - Test cross-browser compatibility.
  - Test animation performance on mobile and other low-end devices.
  - Test with varying data structures and implement error handling in that regard.
  - Implement feature that allows the user to go forward and back the timeline using keyboard arrow keys.