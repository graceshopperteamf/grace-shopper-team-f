/* eslint-disable no-case-declarations */
import axios from 'axios';

const defaultAdmin = {
  allArtists: [],
  artist: {},
};

const ADD_NEW_ARTIST = 'ADD_NEW_ARTIST';
const DELETE_ARTIST = 'DELETE_ARTIST';
const GET_ARTISTS = 'GET_ARTISTS';

const getArtists = (artists) => ({
  type: GET_ARTISTS,
  artists
});

const deleteArtist = (artistId) => ({
  type: DELETE_ARTIST,
  artistId
});

const addNewArtist = (artist) => ({
  type: ADD_NEW_ARTIST,
  artist
});

export const getArtistsFromServer = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/artists');
    dispatch(getArtists(data));
  };
};

export const deleteArtistFromServer = (artistId) => {
  return async (dispatch) => {
    await axios.delete(`/api/artists/${artistId}`);
    dispatch(deleteArtist(artistId));
  };
};

export const addNewArtistToServer = (newArtist) => {
  return async (dispatch) => {
    const response = await axios.post('/api/artists', newArtist);
    dispatch(addNewArtist(response.data));
  };
};


const adminArtistReducer = (state = defaultAdmin, action) => {
  switch (action.type) {
    case ADD_NEW_ARTIST:
      return { ...state, allArtists: [...state.allArtists, (action.newArtist)] };
    case DELETE_ARTIST:
      const updatedArtists = { ...state };
      const filteredArtists = updatedArtists.defaultAdmin.filter(artist => artist.id !== action.artist);
      return { ...state, defaultAdmin: filteredArtists };
    case GET_ARTISTS:
      return { ...state, allArtists: action.artists };
    default:
      return state;
  }
};

export default adminArtistReducer;
