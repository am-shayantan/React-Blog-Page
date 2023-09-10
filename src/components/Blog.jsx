import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer/Footer'
import PageNotFound from './PageNotFound'

function Blog() {

    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ blog, setBlog ] = useState({})

    async function getAndSetBlog(_id){

        const response = await fetch(`/api/blog?_id=${_id}`)
        const data = await response.json()

        if(data == []){
            setBlog(null)
        }
        else{
            setBlog(data)
        }
    }

    useEffect( () => {

        getAndSetBlog(searchParams.get('_id'))
    }, [])
    
    if(blog){
        return (
            <>
                <Navbar />
                <h1>{blog.thumbnailText}</h1>
                <img src={`/images/${blog.thumbnailImg}`} style={{height: 300, width: 300}} />
                
                <div>
                    {blog.content?.map((each, i) => (
                        <>
                            {each.header && (<h1 key={i}>{each.header}</h1>)}
                            {each.image && (<img key={i} src={`/images/${each.image}`} />)}
                            {each.paragraph && (<p key={i}>{each.paragraph}</p>)}
                        </>
                    ))}
                </div>
                <Footer />
            </>
        )
    }
    else{
        return(<PageNotFound />)
    }
}

export default Blog