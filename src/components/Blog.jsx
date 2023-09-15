import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer/Footer'
import PageNotFound from './PageNotFound'

import './Blog.css'

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

    var float = ['left', 'right']
    var padding = [{'padding-left': '20px'}, {'padding-right': '20px'}]
    var pointer = 1
    function getFloat(){
        if(pointer === 1){
            return {float: float[pointer--], paddingLeft: '20px'}
        }
        else{
            return {float: float[pointer++], paddingRight: '20px'}
        }
    }

    useEffect( () => {

        getAndSetBlog(searchParams.get('_id'))
    }, [])
    
    if(blog){
        return (
            <>
                <Navbar />
                
                <div className='blog-content'>
                    <h1>{blog.thumbnailText}</h1>
                    {/* <img src={`/images/${blog.thumbnailImg}`} style={{height: 300, width: 300}} /> */}
                    {blog.content?.map((each, i) => (
                        <div className='wrapper'>
                            {(each.header && each.image && each.paragraph) && (
                                <>
                                    <img 
                                        key={i}
                                        className='display-image' 
                                        style={getFloat()}
                                        src={`/images/${each.image}`}
                                    />
                                    <div className='text-box'>
                                        <h3 key={i}>{each.header}</h3>
                                        <p key={i}>{each.paragraph}</p>
                                    </div>
                                </>
                            ) ||
                            (each.header && each.image) && (
                                <>
                                    <img
                                        key={i}
                                        src={`/images/${each.image}`}
                                    />
                                    <h3 key={i}>{each.header}</h3>
                                </>
                            ) ||
                            (each.image && each.paragraph) && (
                                <>
                                    <img 
                                        key={i}
                                        className='display-image' 
                                        style={getFloat()}
                                        src={`/images/${each.image}`}
                                    />
                                    <div className='text-box'>
                                        <p key={i}>{each.paragraph}</p>
                                    </div>
                                </>
                            ) ||
                            (each.header || each.paragraph) && (
                                <>
                                    {each.header && (<h3 key={i}>{each.header}</h3>)}
                                    {each.paragraph && (<p key={i}>{each.paragraph}</p>)}
                                </>
                            ) || 
                            each.image && (<img 
                                    key={i} 
                                    src={`/images/${each.image}`}
                                />)
                            }

                            {/* {each.header && (<h1 key={i}>{each.header}</h1>)}
                            {each.image && (<img key={i} src={`/images/${each.image}`} />)}
                            {each.paragraph && (<p key={i}>{each.paragraph}</p>)} */}
                        </div>
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