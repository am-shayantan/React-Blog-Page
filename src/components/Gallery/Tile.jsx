import React from 'react'

export default function Tile(props) {
    return (
        <div className='li'>
            <a href={props.url}><img src={`/images/${props.imgURL}`} />
                <div className="box_data">
                    <span>{props.message}</span>
                </div>
            </a>
        </div>
    )
}
