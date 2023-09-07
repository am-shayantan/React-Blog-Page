import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PageNotFound from './PageNotFound'
import Navbar from './Navbar'


function BlogIndex() {

    const [thumbnailData, setThumbnailData] = useState([])

    const params = useParams()
    const protagonist = params.protagonist || 'baby'

    async function getThumbnails(of){
        const response = await fetch(`/api/thumbnails?of=${of}`)
        const data = await response.json()
    
        setThumbnailData(data)
    }

    useEffect(() => {

        getThumbnails(protagonist)
    }, [])

    if(thumbnailData){
        return (
            <>
                <Navbar />
                {
                    thumbnailData.map((thumbnail, i) => (
                        <div key={thumbnail._id}>
                            <hr />
                            <a href='#'><h1>{thumbnail.thumbnailText}</h1></a>
                            <img src={`images/${thumbnail.thumbnailImg}`}></img>
                        </div>
                    ))
                }
            </>
        )
    }
    else{
        return (<PageNotFound />)
    }
}

export default BlogIndex