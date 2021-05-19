import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const getApiEndpointForPlaylist = (id) =>
  `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${id}&key=${API_KEY}`;

const getApiEndpointForVideosDetails = (ids) =>
  `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids}&key=${API_KEY}`;

export const getPlaylistDetails = async (id) => {
  let data = null;
  try {
    if (localStorage.getItem(id) === null) {
      const apiResponse = await axios.get(getApiEndpointForPlaylist(id));
      data = apiResponse.data;
      localStorage.setItem(id, JSON.stringify(data));
      return { data, error: false };
    }

    data = localStorage.getItem(id);
    data = JSON.parse(data);
    return { data, error: false };
  } catch (error) {
    console.log(error);
    return { data, error };
  }
};

export const getVideoDetails = async (data) => {
  let videos = null;

  const videoIds = data.items.map((item) => item.contentDetails.videoId);

  const { data: videosList, error } = await getAllVideoDetails(videoIds);

  console.log("list", videosList);

  if (!error) {
    videos = parseReqVideoDetails(videosList);
  }

  return { videos, error };
};

const getAllVideoDetails = async (ids) => {
  const videoIds = ids.join();

  let data = null;

  try {
    if (localStorage.getItem(videoIds) === null) {
      const apiResponse = await axios.get(
        getApiEndpointForVideosDetails(videoIds)
      );
      data = apiResponse.data;
      localStorage.setItem(videoIds, JSON.stringify(data));
      return { data, error: false };
    }

    data = localStorage.getItem(videoIds);
    data = JSON.parse(data);
    return { data, error: false };
  } catch (error) {
    return { data, error };
  }
};

const parseReqVideoDetails = async (data) => {
  const result = data.items.map((item) => ({
    duration: convertYouTubeDuration(item.contentDetails.duration),
    title: item.snippet.title,
    id: item.id,
  }));
  return result;
};

const convertYouTubeDuration = async (duration) => {
  const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const extracted = time_extractor.exec(duration);
  const hours = parseInt(extracted[1], 10) || 0;
  const minutes = parseInt(extracted[2], 10) || 0;
  const seconds = parseInt(extracted[3], 10) || 0;
  return hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
};
