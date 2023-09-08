import React from 'react'
import './Loading.css'

function Loading() {
    return (
        <div class="container loader-box">
            <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#0096FF" />
                <circle cx="170" cy="170" r="135" stroke="#FFFF00" />
                <circle cx="170" cy="170" r="110" stroke="#00FFFF" />
                <circle cx="170" cy="170" r="85" stroke="#FF70D2" />
            </svg>
        </div>
    )
}

export default Loading