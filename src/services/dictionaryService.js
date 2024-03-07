import axios from "axios";
const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const getAll = async (word) => {
  const url = `${baseUrl}${word}`
  try {
    const response = axios.get(url);
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

const ecportedObject = {
  getAll
}

export default ecportedObject