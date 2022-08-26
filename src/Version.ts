import axios from "axios";

export const logVersion = async (): Promise<void> => {
    const { data } = await axios.get('./VERSION');
    console.log(data);
}