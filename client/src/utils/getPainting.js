import axios from 'axios';
import randomWords from 'random-words';

export const randomMetPainting = async () => {
  try {
    const word = randomWords();
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&hasImages=true&q=${word}`
    );
    console.log(response.data);
    const random = Math.floor(Math.random() * response.data.objectIDs.length);
    const randomId = response.data.objectIDs[random];
    console.log(randomId);
    const painting = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
    );
    console.log(painting.data.primaryImage);

    return painting.data.primaryImage;
  } catch (error) {
    console.error(error.messsage);
  }
};
