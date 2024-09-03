import axios from "axios";

const terrasa = async (phone, notify, trToken) => {
  try {
    const dados = { numero: phone, mensagem: notify }
    const response = await axios.post(
      'https://devterrasa.com/api/bot',
      dados,
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://devterrasa.com",
          "Authorization": `Bearer ${trToken}`,
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

export default terrasa