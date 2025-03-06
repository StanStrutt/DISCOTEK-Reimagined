import "./list.css"
import Get from "../services/api-calls"
import UpdateContent from "./updateContent"
import Options from "./options"
import { useState } from "react"
import axios from "axios"

export default function List() { 

    const {filteredData, handleTopicClick, error} = Get()

    const { handleUpdate, handleSubmit, handleAddCategory, handleChange, categoryInput,  setCategoryInput, formData, setMessage, setFormData, handleDelCategory } = UpdateContent()

    const [isOpen, setIsOpen] = useState(false)
    
    const handleIdClick = async (value: string) => {
        setIsOpen(!isOpen)
        try {
            const response = await axios.get(`http://localhost:5000/get/${value}`)
                setFormData(response.data)
                setMessage(response.data.message)
            } catch (err) {
                if (err instanceof Error) {
                    setMessage(err.message)
                } else {
                    setMessage("Something went wrong")
                }
        }
    };

    //    useEffect(() => {
    //     if (!id) {
    //         try {
    //             const response = axios.get(`http://localhost:5000/get/${formData._id}`)
    //             setFormData(response.data)
    //             setMessage(response.data.message)
    //         } catch (err) {
    //             if (err instanceof Error) {
    //             setMessage(err.message)
    //             } else {
    //                 setMessage("Something went wrong")
    //             }
    //         }}
    //    })

    // const handleGet = async () => {
    //     if (!formData._id) {
    //         setMessage("Please enter id to get the information")
    //         return
    //     }
    //     try {
    //         const response = await axios.get(`http://localhost:5000/get/${formData._id}`)
    //         setFormData(response.data)
    //         setMessage(response.data.message)
    //     } catch (err) {
    //         if (err instanceof Error) {
    //             setMessage(err.message)
    //         } else {
    //             setMessage("Something went wrong")
    //         }
    //     }
    // }
 
    return(
        <div className="list-info" id="Explore">
            <div className="list">
                <h2>EXPLORE</h2>
                <div className="categories">
                    <div className="cat-list">
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Accessibility")} >Accessibility</button> 
                            <button className="cat-name" onClick={() => handleTopicClick("AI")} >AI</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Animation")} >Animation</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Audio")} >Audio</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Blogging")} >Blogging</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Colour")} >Colour</button>
                        </div>
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Collaboration")} >Collaboration</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Design")} >Design</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Development")} >Development</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Editing")} >Editing</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Educational")} >Educational</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Fonts")} >Fonts</button>
                        </div>
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Illustration")} >Illustration</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Inspiration")} >Inspiration</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Icons")} >Icons</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Jobs")} >Jobs</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Miscellaneous")} >Miscellaneous</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Podcasting")} >Podcasting</button>
                        </div>
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Productivity")} >Productivity</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Stock Images")} >Stock Images</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Stock Videos")} >Stock Videos</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Free")} >Free</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Free Trial")} >Free Trial</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Paid")} >Paid</button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="edit-popup">
                    <form onSubmit={handleSubmit} className="Post-form">
                        <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange}
                        />
                        <input type="text" name="url" placeholder="Enter url" value={formData.url} onChange={handleChange}
                        />
                        <input type="text" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange}
                        />
                        <input type="text" name="image" placeholder="Enter image link" value={formData.image} onChange={handleChange}
                        />
                        <select name="categories" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
                            <option hidden selected value="">Enter Catergories</option>
                            <Options/>
                        </select>
                        <button type="button" onClick={handleAddCategory} className="add-cat">Add</button>
                        {formData.categories.map((categories, index) => (
                            <span className="added-cat" key={index}>
                                <button onClick={() => handleDelCategory(categories)}>X</button>
                                {categories}
                            </span>
                        ))}
                        <button type="submit" onClick={handleUpdate}>Update</button>
                    </form>
                </div>
            )}
            <div className="info"> 
                {error}
                {filteredData.map((resource) => (
                    <div className="card-holder">
                        <button onClick={() => handleIdClick(resource._id)}>edit</button>
                        <button>delete</button>
                        <a className="card-link" target="_blank" href={resource.url}>
                            <div className="card-image" style={{background: `url(${resource.image})`}}/>
                            <hr/>
                            <h3 className="card-title" >{resource.name}</h3>
                            <p className="card-desc" >{resource.description}</p>                           
                        </a>
                    </div>
                ))}
            </div>               
        </div>
    )
}