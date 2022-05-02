import axios from 'axios';
import { Markup } from 'interweave';
export default async function getResponse(message) {
    var ret = "";
    const res = await axios.get("/api/sendCommand/"+message).catch((err) => {
        ret = "Invalid command, try typing help";
    })

    if(ret === "" && isHtml(res.data.message)) { // Handle html
        return <Markup content={res.data.message} />
    }

    return (ret !== "") ? ret : res.data.message;
}

function isHtml(input) {
    return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(input);
}