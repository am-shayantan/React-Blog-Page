import React from 'react'

export default function Tile(props) {
    return (
        <li>
            <a href="#0"><img src={`/images/${props.imgURL}`} />
                <div className="box_data">
                    <span>{props.message}</span>
                </div>
            </a>
        </li>
    )
}
