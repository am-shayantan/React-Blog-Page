// import React, { useEffect, useState } from "react"

// function App() {

//     const [backendData, setBackendData] = useState([])

//     async function fetchData(){
//         const response = await fetch("/api")
//         const data = await response.json()

//         setBackendData(data)
//     }

//     useEffect(() => {

//         fetchData()
//     }, [])

//     return (
//         <div className="container">
//             {
//                 // eslint-disable-next-line
//                 backendData.map((data, i) => (
//                     <div key={data._id}>
//                         <p>{data._id}</p>
//                         <h1 key={i}>{data.thumbnailText}</h1>
//                         <img src={'images/' + data.thumbnailImg} />
//                         <hr />
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default App

import './App.css'
import React from 'react'
import PageRoutes from './PageRoutes'

function App() {
    return (
        <div className='container'>
            <PageRoutes />
        </div>
    )
}

export default App