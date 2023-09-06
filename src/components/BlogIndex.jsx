import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { PageNotFound } from './PageNotFound'


function BlogIndex() {

    const [thumbnailData, setThumbnailData] = useState([])

    const params = useParams()
    const protagonist = params.protagonist || 'baby'

    async function getThumbnails(of){
        const response = await fetch(`/api/thumbnails?of=${of}`)
        const data = await response.json()
    
        setThumbnailData(data)
    }

    if(['baby', 'mom', 'dad'].indexOf(protagonist) >= 0){
        getThumbnails(protagonist)

        return (
            <>
                {
                    thumbnailData.map((thumbnail, i) => (
                        <div key={thumbnail._id}>
                            <h1>{thumbnail.thumbnailText}</h1>
                            <img src={`images/${thumbnail.thumbnailImg}`}></img>
                        </div>
                    ))
                }
            </>
        )
    }
    else{
        return (
            <>
                <PageNotFound />
            </>
        )
    }
}

export default BlogIndex