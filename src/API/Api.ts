import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://wordsapiv1.p.rapidapi.com/words/',
    params: {random: 'true', letters: 5},
    headers: {
      'X-RapidAPI-Key': '7fb66625a9msh7ec5bf7c17f472ep1868b3jsn04713ac2c7bd',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

export const getWord = async () => {
    const { data } = await axios.request(options);
    return data.word;
}