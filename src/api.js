import { API_KEY, DEFAULT_SEARCH, MAX_RESULTS } from './constants';

const base = 'https://www.googleapis.com/youtube/v3';

// Data neccessary for the app
const normalize = json => {
  return json.items.reduce((acc, element) =>
    [...acc, {
      id: element.id.videoId,
      title: element.snippet.title,
      author: element.snippet.channelTitle,
      description: element.snippet.description,
      img: element.snippet.thumbnails.high.url
    }],
  []);
};

export const getVideos = async (term) => {
  const uri = `${base}/search?key=${API_KEY}&part=snippet&q=${term || DEFAULT_SEARCH}&type=video&maxResults=${MAX_RESULTS}`;
  try {
    const response = await fetch(uri);
    const json = await response.json();
    return normalize(json);
  } catch (err) {
    throw err;
  }
};

export const getViews = async (id) => {
  const uri = `${base}/videos?key=${API_KEY}&part=snippet,statistics&id=${id}&type=video`;
  try {
    const response = await fetch(uri);
    const json = await response.json();
    return Number(json.items[0].statistics.viewCount).toLocaleString();
  } catch (err) {
    throw err;
  }
};

export const getRecommendedVideos = async (id) => {
  const uri = `${base}/search?key=${API_KEY}&part=snippet&relatedToVideoId=${id}&type=video&maxResults=${MAX_RESULTS}`;
  try {
    const response = await fetch(uri);
    const json = await response.json();
    return normalize(json);
  } catch (err) {
    throw err;
  }
};