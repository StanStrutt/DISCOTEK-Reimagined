import { useEffect, useState, useReducer } from "react";
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

    const VITE_URL = import.meta.env.VITE_API_URL;

    const [data, setData] = useState<Resources[]>([])
    const [error, setError] = useState<string>("")

    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${VITE_URL}/resources`)
                setData(response.data)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
            } else {
                setError("Something went wrong")
            }
        }}
        fetchData()
    }, [reducerValue])

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
        forceUpdate,
    }
}