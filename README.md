# Playlist Duration Calculator

## Description
- A webapp made using *React.js* that finds the duration of a youtube playlist (results are shown for the first 50 videos of the playlist if exceeded).
- Used Youtube Data Api v3 to get the data about the playlist including duration and title of each video.
- Used Chart.js and react-chartjs-2 dependencies to show a bar-chart representation of each video's duration.  

## Getting started

You can view a live demo over at https://playlist-duration-calc.herokuapp.com/

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- Create a .env file and enter the following : REACT_APP_YOUTUBE_API_KEY = {YOUR_API_KEY} <br>
  *You can get your api key by going to Google Developers Console --> API Library --> Youtube Data Api v3*
- `npm start` to start the local server (this project uses create-react-app)


## Developed By

- [Swatik Paul](https://www.linkedin.com/in/swatik-paul-1218b3136/)
