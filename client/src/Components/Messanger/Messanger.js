import React from 'react'
import './Messanger.css'

export default function Messanger() {

    const [command, setCommand] = React.useState('');
   // const [correspondence, setCorrespondence] = React.useState([]);
   const correspondence = [];

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
                        <div className='message-box user'>
                            <div>
                                <div className='icon sm icon-user'></div>
                                <span>You</span>
                            </div>
                            <span>What is your name?</span>
                        </div>
                        <div className='message-box ai'>
                            <div>
                                <div className='icon sm icon-ai' style={{"margin-left": "15px"}}></div>
                                <span>AI</span>
                            </div>
                            <span>My name is Botterino peperino.</span>
                        </div>
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
                <button>
                    Send
                </button>
            </div>
        </div>
    )
}