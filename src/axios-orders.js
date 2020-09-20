import Axios from 'axios';

const inst = Axios.create({
  baseURL: "https://burger-59d5e.firebaseio.com/",
});

export default inst;