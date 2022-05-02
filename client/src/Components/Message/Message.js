import React from 'react'

export default function Message(props) {
    console.log(props.props);
    return (
        <div className='message-box {props.type}'>
            <div>
                <div className='icon sm icon-{props.type}'></div>
                <span>You</span>
            </div>
            <span>{props.message}</span>
        </div>
    )
}