import axios from "axios";
import endPoints from "./Endpoints";

async function getAnimalData() {
  try {
    const responseData = await axios.get(endPoints.vercelAnimals);
    const data = await responseData.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const Api = { getAnimalData };

export default Api;
