import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://ad6muye6p4m5njkkl74kgbkvi40qfrkf.lambda-url.us-east-1.on.aws/',
    params: {random: 'true', letters: 5, limit: 100}  
  };

export const getWord = async () => {
    const { data } = await axios.request(options);
    console.log(data);
    return data.word.toUpperCase();
}