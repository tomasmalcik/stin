import React from 'react'

export default function Message({data}) {
    return (
        <div className={`message-box ${data.type}`}>
            <div>
                <div className={`icon sm icon-${data.type}`}></div>
                <span data-testid="message-span">{data.type === 'ai' ? 'Bot' : 'You'}</span>
            </div>
            <span>{data.message}</span>
        </div>
    )
}