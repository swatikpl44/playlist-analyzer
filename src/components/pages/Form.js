import React, { useState } from "react";
import { getPlaylistDetails, getVideoDetails } from "../services/detail.js";

const Form = (props) => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url_regex = /^([\S]+list=)?([\w_-]+)[\S]*$/;

    var playlistId;
    var match = url.match(url_regex);
    console.log(match);
    if (match) {
      playlistId = match[2];
    }

    console.log(playlistId);
    if (!playlistId) {
      setErrorMessage(
        "The playlist identified with the request's playlistId parameter cannot be found."
      );
      e.target.reset();
      return;
    }

    const { data, error } = await getPlaylistDetails(playlistId);

    if (!error) {
      console.log("result", data);
      const parsedVideosData = getVideoDetails(data);
      console.log("Videos", parsedVideosData);
      // createBarChartFromData(parsedVideosData.videos);
    } else {
      setErrorMessage(
        "2. The playlist identified with the request's playlistId parameter cannot be found."
      );
    }
  };

  return (
    <div className="container mt-4">
      <nav className="mb-4 navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          <img src="https://i.imgur.com/PjcsUXm.png" height="60" alt="" />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="https://github.com/swatikpl44">
              <img
                src="https://image.flaticon.com/icons/svg/25/25231.svg"
                height="30"
                alt="Github Icon"
              />
            </a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label> Find the length of any YouTube playlist : </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="youtube.com/playlist?list=ID"
              name="playlistUrl"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-danger">
                Get Length
              </button>
            </div>
          </div>
          <small id="emailHelp" className="form-text text-muted">
            You can enter a playlist link, playlist ID or even a video link from
            the playlist!
            <br />
            This only works with playlists with upto 500 videos.
          </small>
        </form>

        {errorMessage && <div className="error"> {errorMessage} </div>}
      </div>
    </div>
  );
};

export default Form;
