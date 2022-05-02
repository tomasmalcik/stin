import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Message from '../Message/Message';
import getResponse from '../../api/getResponse';

import './Messanger.css'
import 'react-toastify/dist/ReactToastify.css';

export default function Messanger() {

    const [command, setCommand] = React.useState('');
    const [correspondence, setCorrespondence] = React.useState([{type: "ai", message: "test"}]);

    const sendQuestion = async () => {
        //Check if message is not ''
        if(command === '') {
            toast("Message cannot be empty..");
            return;
        }

        //try contacting api
        const response = await getResponse(command);
        if(response) { //Got some kind of response
            setCorrespondence((prevCorrespondence) => {
                //Save users question
                const userQuestion = {
                    type: "user",
                    message: command
                }
                const aiResponse = {
                    type: "ai",
                    message: response
                }

                //Save them to correspondence
                console.log(prevCorrespondence);
            });
            setCommand('');
            console.log(correspondence)
        } 
    }

    //React.useEffect()

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
                {
                    correspondence?.length > 0 ? 
                    (
                      <div className="message-wrapper" data-testid="message-wrapper">
                          {console.log(correspondence)}
                          <Message data = {correspondence[0]} />
                      </div>  
                    ) : (
                        <div className='begin-conversation' data-testid="test-empty">
                            Start conversation by typing in the text field..
                        </div>
                    )
                }
            </div>
            <div className='message-send'>
                <input
                    placeholder='Send message'
                    value={command}
                    onChange={(e) => { setCommand(e.target.value) }}
                />
                <button onClick={sendQuestion}>
                    Send
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}