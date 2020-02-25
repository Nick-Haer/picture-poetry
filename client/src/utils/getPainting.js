import axios from 'axios';
import randomWords from 'random-words';

export const randomMetPainting = async () => {
  try {
    const word = randomWords();
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&hasImages=true&q=${word}`
    );
    const random = Math.floor(Math.random() * response.data.objectIDs.length);
    const randomId = response.data.objectIDs[random];
    const painting = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
    );

    return painting.data.primaryImage;
  } catch (error) {
    console.error(error.messsage);
  }
};
