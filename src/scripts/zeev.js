import axios from "axios";

const zeev = async (content, zvToken) => {
  try {
    const response = await axios.post(
      'https://terrasabpms.zeev.it/api/2/instances',
      content,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${zvToken}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Erro no servidor:', error.response.data);
    } else {
      console.error('Erro na requisição:', error.message);
    }
    return false;
  }
};

export default zeev;