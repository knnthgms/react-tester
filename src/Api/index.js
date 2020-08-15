import axios from "axios";
import endPoints from "./Endpoints";

async function getAnimalData() {
  try {
    const response = await axios.get(endPoints.vercelAnimals);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("error: ", error);
  }
}

const Api = { getAnimalData };

export default Api;
