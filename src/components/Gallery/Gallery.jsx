import React from 'react';
import './Gallery.css'
import Tile from './Tile';

// This Gallery Can Only Be Used For Displaying Thumbnails

export default function Gallery(props) {
    return (
        <>
            <div className="gallery_box">
                {props.LPC.map(content => 
                    <Tile
                        key={content._id}
                        url={`/blog?_id=${content._id}`}
                        imgURL={content.thumbnailImg}
                        message={content.thumbnailText}
                    />
                )}
            </div>
        </>
    )
}