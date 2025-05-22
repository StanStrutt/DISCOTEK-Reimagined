import { useRef } from "react"

import axios from "axios"

import "./List.css"

import Get from "../../services/api-calls"
import UpdateContent from "../updateContent"

import DialogForm from "../DialogForm"
import AddContent from "../addContent"

export default function List() { 

    const VITE_URL = import.meta.env.VITE_API_URL

    const {filteredData, handleTopicClick, error, fetchData} = Get()

    const {
        handleAddCategory,
        formData,
        setMessage,
        setFormData,
        categoryInput,
        setCategoryInput,
        handleChange,
        handleDelCategory,
        setIsOpen,
        } = UpdateContent()
    
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
            
        try {
            const response = await axios.put(`${VITE_URL}/update/${formData._id}`, formData, {
                headers: { "Content-Type": "application/json" },
            })
            
            setMessage(response.data.message)
            // Reset form after submission
            setFormData({ _id: "", name: "", url: "", description: "", image: "", categories: [] })
        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message)
            } else {
                setMessage("Something went wrong")
            }
        }
        fetchData()
        dialogRef.current?.close()
        setIsOpen(false)
    }

    const handleIdClick = async (value: string) => {

        try {
            const response = await axios.get(`${VITE_URL}/get/${value}`)
                setFormData(response.data)
                setMessage(response.data.message)
                if (dialogRef.current) {
                    setIsOpen(true)
                    dialogRef.current.showModal()
                    const firstInput = dialogRef.current.querySelector("input")
                    firstInput?.focus()
                }
        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message)
            } else {
                setMessage("Something went wrong")
            }
        }
    }

    const handleIdDelete = async (value: string) => {
        try {
            const response = await axios.get(`${VITE_URL}/get/${value}`)
                setFormData(response.data)
                setMessage(response.data.message)
        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message)
            } else {
                setMessage("Something went wrong")
            }
        }
        
        const confirmDelete = window.confirm(`Are you sure you want to delete this?`)
        if (!confirmDelete) return

        try {
            const response = await axios.delete(`${VITE_URL}/delete/${value}`)
                setFormData(response.data)
                setMessage(response.data.message)
        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message)
            } else {
                setMessage("Something went wrong")
            }
        }
    }

    return (
        <>  
            <DialogForm
                formData={formData}
                dialogRef={dialogRef}
                handleSubmit={handleSubmit}
                handleAddCategory={handleAddCategory}
                button={"Update"}
                categoryInput={categoryInput}
                setCategoryInput={setCategoryInput}
                handleChange={handleChange}
                handleDelCategory={handleDelCategory}
                setIsOpen={setIsOpen}
            />
            <div className="list-info" id="explore">
                <div className="list">
                    <div className="add-to-explore">
                        <h2 className="explore">Explore</h2>
                        <AddContent/>
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
                    {error}
                    {
                        filteredData.map((resource) => (
                            <div className="card-holder" key={resource._id}>
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
                                <a className="card-link" target="_blank" href={resource.url}>
                                    <div className="card-image" style={{background: `url(${resource.image})`}}/>
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
