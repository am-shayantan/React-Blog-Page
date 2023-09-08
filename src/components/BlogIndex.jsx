import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from './Header/Header'
import Navbar from './Navbar'
import PageNotFound from './PageNotFound'
import Gallery from './Gallery/Gallery'
import Footer from './Footer/Footer'

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
    }, [protagonist])

    if(thumbnailData){
        return (
            <>
                <Header protagonist={protagonist}/>
                <Navbar />
                <Gallery LPC={thumbnailData} />
                <Footer />
            </>
        )
    }
    else{
        return (<PageNotFound />)
    }
}

export default BlogIndex