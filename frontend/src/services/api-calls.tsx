import { useEffect, useState } from "react";
import axios from "axios"

interface Resources {
    _id: string;
    name: string;
    url: string;
    description: string;
    image: string;
    categories: string[];
}

export default function Get() {

    const [data, setData] = useState<Resources[]>([])
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/resources`)
                setData(response.data)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
            } else {
                setError("Something went wrong")
            }
        }}
        fetchData()
    }, [])

    const [topic, setTopic] = useState<string>("")
    const [filteredData, setFilteredData] = useState<Resources[]>(data)

    const handleTopicClick = (value: string) => {
        setTopic(value);
       };

    useEffect(() => {
        if (topic) {
            const filtered = data.filter((resource) =>
            resource.categories.includes(topic)); 
            setFilteredData(filtered)
        } else {
            setFilteredData(data)
        }
      }, [topic, data]);
    
    return {
        filteredData,
        handleTopicClick,
        error,
    }
}