import React from 'react'
import './Sidebar.css'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <h1>CHATBOT</h1>
            </div>
            <div className="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar dui non leo vestibulum sodales. Sed at gravida erat, id gravida massa. Quisque nec lacus urna. Curabitur accumsan aliquet libero eget feugiat. Sed viverra diam in ipsum imperdiet fermentum. Nullam eu faucibus ex</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar dui non leo vestibulum sodales. Sed at gravida erat, id gravida massa. Quisque nec lacus urna. Curabitur accumsan aliquet libero eget feugiat. Sed viverra diam in ipsum imperdiet fermentum. Nullam eu faucibus ex</p>
            </div>
            <div className='social-icons'>
                <a href="www.google.com"><i className="fa-brands fa-instagram"></i></a>
                <a href="www.google.com"><i className="fa-brands fa-facebook"></i></a>
            </div>
        </div>
    )
}