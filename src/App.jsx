import React, { useEffect, useState } from "react"

function App() {

    const [backendData, setBackendData] = useState([])

    async function fetchData(){
        const response = await fetch("/api")
        const data = await response.json()

        setBackendData(data)
    }

    useEffect(() => {

        fetchData()
    }, [])

    return (
        <div>
            {
                // eslint-disable-next-line
                backendData.map((data, i) => (
                    <p key={i}>{data.thumbnailText}</p>
                ))
            }
        </div>
    )
}

export default App