import { useState, useEffect } from "react"

import axios from "axios"

import "./List.css"

import DialogForm from "../DialogForm"

interface Resources {
    _id: string;
    name: string;
    url: string;
    description: string;
    imageLink: string;
    categories: string[];
}

export default function List({ loginCorrect }: {loginCorrect: boolean} ) { 

    console.log(loginCorrect)

    const VITE_URL = import.meta.env.VITE_API_URL

    const [data, setData] = useState<Resources[]>([])
    const [topic, setTopic] = useState<string>("")
    const [filteredData, setFilteredData] = useState<Resources[]>(data)

    const [id, setId] = useState<string | null>(null)
    const [name, setName] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [imageLink, setImageLink] = useState<string>("")
    const [categories, setCategories] = useState<string[]>([])
    const [categoryInput, setCategoryInput] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<"Create" | "Update">("Create")

    const [errMessage, setErrMessage] = useState<string>("")

    const fetchData = async () => {
        try {
            const response = await axios.get(`${VITE_URL}/resources`)
            setData(response.data)
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage(err.message)
            } else {
                setErrMessage("Something went wrong")
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [VITE_URL])

    useEffect(() => {
        if (topic) {
            const filtered = data.filter((resource) =>
            resource.categories.includes(topic))
            setFilteredData(filtered)
        } else {
            setFilteredData(data)
        }
    }, [topic, data])

    const handleTopicClick = (value: string) => {
        setTopic(value)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
            
        try {
            const response = await axios.put(`${VITE_URL}/update/${id}`, {id, name, url, description, imageLink, categories}, {
                headers: { "Content-Type": "application/json" },
            })
            
            setErrMessage(response.data.message)
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage(err.message)
            } else {
                setErrMessage("Something went wrong")
            }
        }
        fetchData()
        setVisible(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`${VITE_URL}/submit`, {id, name, url, description, imageLink, categories}, {
                headers: { "Content-Type": "application/json" },
            })
        
            setErrMessage(response.data.message)               
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage(err.message)
            } else {
                setErrMessage("Something went wrong")
            }
        }
        fetchData()
        setVisible(false)
    }

    const handleIdClick = async (value: string) => {

        try {
            const response = await axios.get(`${VITE_URL}/get/${value}`)
            setId(response.data._id)
            setName(response.data.name)
            setUrl(response.data.url)
            setDescription(response.data.description)
            setImageLink(response.data.imageLink)
            setCategories(response.data.categories)
            setVisible(true)
            setButtonText("Update")
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage(err.message)
            } else {
                setErrMessage("Something went wrong")
            }
        }
        fetchData()
    }

    const handleIdDelete = async (value: string) => {

        const confirmDelete = window.confirm(`Are you sure you want to delete this?`)
        if (!confirmDelete) return

        try {
            const response = await axios.delete(`${VITE_URL}/delete/${value}`)
            setErrMessage(response.data.message)
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage(err.message)
            } else {
                setErrMessage("Something went wrong")
            }
        }
        fetchData()
    }

    const addContent = () => {
        setName("")
        setUrl("")
        setDescription("")
        setImageLink("")
        setCategories([])
        setCategoryInput("")
        setVisible(true)
        setButtonText("Create")
    }

    console.log(errMessage)

    const onSubmit = (buttonText === "Create") ? handleSubmit : handleUpdate

    return (
        <>  
            <DialogForm
                name={name}
                setName={setName}
                url={url}
                setUrl={setUrl}
                description={description}
                setDescription={setDescription}
                imageLink={imageLink}
                setImageLink={setImageLink}
                categories={categories}
                setCategories={setCategories}
                categoryInput={categoryInput}
                setCategoryInput={setCategoryInput}
                visible={visible}
                setVisible={setVisible}
                buttonText={buttonText}
                onSubmit={onSubmit}
            />
            <div className="list-info" id="explore">
                <div className="list">
                    <div className="add-to-explore">
                        <h2 className="explore">Explore</h2>
                        {
                            loginCorrect && (
                                <button type="button" onClick={() => addContent()}>Create Resource</button>
                            )
                        }
                    </div>
                    <div className="categories">
                        <div className="cat-list">
                            <div className="cat-column">
                                <button className="cat-name" onClick={() => handleTopicClick("Accessibility")}>Accessibility</button>
                                <button className="cat-name" onClick={() => handleTopicClick("AI")}>AI</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Animation")}>Animation</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Audio")}>Audio</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Blogging")}>Blogging</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Colour")}>Colour</button>
                            </div>
                            <div className="cat-column">
                                <button className="cat-name" onClick={() => handleTopicClick("Collaboration")}>Collaboration</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Design")}>Design</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Development")}>Development</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Editing")}>Editing</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Educational")}>Educational</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Fonts")}>Fonts</button>
                            </div>
                            <div className="cat-column">
                                <button className="cat-name" onClick={() => handleTopicClick("Illustration")}>Illustration</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Inspiration")}>Inspiration</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Icons")}>Icons</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Jobs")}>Jobs</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Miscellaneous")}>Miscellaneous</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Podcasting")}>Podcasting</button>
                            </div>
                            <div className="cat-column">
                                <button className="cat-name" onClick={() => handleTopicClick("Productivity")}>Productivity</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Stock Images")}>Stock Images</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Stock Videos")}>Stock Videos</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Free")}>Free</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Free Trial")}>Free Trial</button>
                                <button className="cat-name" onClick={() => handleTopicClick("Paid")}>Paid</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info"> 
                    {
                        filteredData.map((resource) => (
                            <div className="card-holder" key={resource._id}>
                                {
                                    loginCorrect && (
                                        <div className="card-buttons">
                                            <a className="button-left" onClick={() => handleIdClick(resource._id)}>
                                                <img
                                                    className="edit-img"
                                                    src="https://static.thenounproject.com/png/3406050-200.png"
                                                    height="20px"
                                                />
                                            </a>
                                            <a className="button-right" onClick={() => handleIdDelete(resource._id)}>
                                                <img 
                                                    className="delete-img"
                                                    src="https://cdn-icons-png.flaticon.com/512/484/484662.png"
                                                    height="20px"
                                                />
                                            </a>
                                        </div>
                                    )
                                }
                                <a className="card-link" target="_blank" href={resource.url}>
                                    <div className="card-image" style={{background: `url(${resource.imageLink})`}}/>
                                    <hr/>
                                    <h3 className="card-title">{resource.name}</h3>
                                    <p className="card-desc">{resource.description}</p>
                                </a>
                            </div>
                        ))
                    }
                </div>               
            </div>
        </>
    )
}
