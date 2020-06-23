import axios from 'axios';

const ADD_NEW_ARTIST = 'ADD_NEW_ARTIST';

const defaultAdmin = {};

const addNewArtist = (artist) => ({
  type: ADD_NEW_ARTIST,
  artist
});

export const addNewArtistToServer = (newArtist) => {
  return async (dispatch) => {
    const response = await axios.post('/api/artists', newArtist);
    dispatch(addNewArtist(response.data));
  };
};

// const adminArtistReducer = (state = defaultAdmin, action) => {
//   switch(action.type) {
//     case ADD_NEW_ARTIST:
//       return
//   }
// }
