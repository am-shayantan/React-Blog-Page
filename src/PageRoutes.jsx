import React from 'react'
import { Routes, Route } from 'react-router-dom'

import BlogIndex from './components/BlogIndex'
import About from './components/About'

function PageRoutes() {
    return (
        <Routes>
            <Route path='/' element={<BlogIndex />}>
                <Route path=":protagonist" element={<BlogIndex />} />
            </Route>
            <Route path='/about' element={<About />} />
        </Routes>
    )
}

export default PageRoutes