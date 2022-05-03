import React, { useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Message from '../Message/Message';
import {getResponse} from '../../api/getResponse'

import './Messanger.css'
import 'react-toastify/dist/ReactToastify.css';

function Messanger() {

    const [command, setCommand] = React.useState('');
    const [correspondence, setCorrespondence] = React.useState([]);

    return (
        <div className="messanger">
            <div className='navbar'>
                <div>
                    <div className='icon icon-ai' style={{ "margin-right": "15px" }}></div>
                   <p>Chat with artifitial intelligence</p> 
                </div>
                <ul>
                    <li>Report issue</li>
                    <li>Rate</li>
                </ul>
            </div>
            <div className='message-content' data-testid="content">
                <div className="message-wrapper" data-testid="message-wrapper">
                    {correspondence?.length > 0 && correspondence.map((corr) => {
                        
                        return <Message data={corr} />
                    })}

                    {correspondence?.length == 0 && (
                        <div data-testid="data-empty">
                            Start conversation by typing something in text field
                        </div>
                    )}
                </div>  
            </div>
            <div className='message-send'>
                <input
                    placeholder='Send message'
                    value={command}
                    onChange={(e) => { setCommand(e.target.value) }}
                    data-testid="command"
                />
                <button data-testid="send" onClick={() => { sendQuestion(command, setCorrespondence, setCommand) }}>
                    Send
                </button>
            </div>
            <ToastContainer data-testid="toast" />
            <div data-testid="state" id="state" style={{"display": "none"}}></div>
        </div>
    )
}



function sendQuestion(command, setCorrespondence, setCommand) {
    //Check if message is not ''
    if(command === '') {
        toast("Message cannot be empty..");
        setCommand("help");
        return;
    }

    const userQuestion = {
        type: "user",
        message: command
    }

    setCorrespondence((current) => [... current, userQuestion]); //Add users question

    setTimeout(async () => {
        //try contacting api
        const response = await getResponse(command);
        if(response) { //Got some kind of response
            const aiResponse = {
                type: "ai",
                message: response
            }
            setCorrespondence((current) => [... current, aiResponse] );
            setCommand('');
        } 
    }, 1000); //Delay

}



export default Messanger