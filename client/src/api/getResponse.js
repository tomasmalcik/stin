import axios from 'axios';

export default async function getResponse(message) {
    const res = await axios.get("/api/sendCommand/"+message)
    return res.data.message;
}