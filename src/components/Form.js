import React, { useState } from "react";
import {
  getPlaylistDetails,
  getVideoDetails,
  findTime,
} from "../services/detail.js";
import styles from "./styles/formStyle.module.css";

const Form = (props) => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allTime, setAllTime] = useState("");
  const [len, setLen] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url_regex = /^([\S]+list=)?([\w_-]+)[\S]*$/;

    var playlistId;
    var match = url.match(url_regex);
    if (match) {
      playlistId = match[2];
    }

    if (!playlistId) {
      setErrorMessage(
        "The playlist identified with the request's playlistId parameter cannot be found."
      );
      e.target.reset();
      return;
    }

    const { data, error } = await getPlaylistDetails(playlistId);

    if (!error) {
      const parsedVideosData = await getVideoDetails(data);

      const allTime = findTime(parsedVideosData.videos);
      const len = parsedVideosData.videos.length;
      setLen(len);

      setAllTime(allTime);
      console.log("allTime", allTime);
    } else {
      setErrorMessage(
        "The playlist identified with the request's playlistId parameter cannot be found."
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
          <label> Find details of any YouTube playlist : </label>
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
                Submit
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
        {allTime && (
          <div className={styles.result}>
            <p> Number of videos: {len}</p>
            <p>Total duration : {allTime.totatDurationAt100x} </p>
            <p> At 1.25x : {allTime.totatDurationAt125x} </p>
            <p> At 1.50x : {allTime.totatDurationAt150x} </p>
            <p> At 1.75x : {allTime.totatDurationAt175x} </p>
            <p> At 2.00x : {allTime.totatDurationAt200x} </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
