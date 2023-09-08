import React from 'react'
import { Routes, Route } from 'react-router-dom'

import BlogIndex from './components/BlogIndex'
import Blog from './components/Blog'
import About from './components/About'

function PageRoutes() {
    return (
        <Routes>
            <Route path='/' element={<BlogIndex />}>
                <Route path=":protagonist" element={<BlogIndex />} />
            </Route>
            <Route path='/about' element={<About />} />

            <Route path='/blog' element={<Blog />} />
        </Routes>
    )
}

export default PageRoutes