import "./list.css"
import Get from "../services/api-calls"
import UpdateContent from "./updateContent"
import axios from "axios"
import { useRef, useEffect } from "react"
// import { useState, useEffect } from "react"
    

export default function List() { 

    const {filteredData, handleTopicClick, error} = Get()

    const {handleUpdate, handleAddCategory, handleChange, categoryInput,  setCategoryInput, formData, setMessage, setFormData, handleDelCategory} = UpdateContent()

    // const [className, setClassName] = useState<string>()
    
    // useEffect(() => {
    //     if (isOpen) {
    //         setClassName("list-info-blur")
    //     } else {
    //         setClassName("list-info")
    //     }
    // }, [isOpen])
    
    const dialogRef = useRef<HTMLDialogElement | null>(null);

        const closeDialog = () => {
            if (dialogRef.current) {
                dialogRef.current.close();
            }
        }
    
        useEffect(() => {
            const dialog = dialogRef.current;
            if (dialog) {
                dialog.addEventListener("cancel", closeDialog);
                return () => dialog.removeEventListener("cancel", closeDialog)
            }
        }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            
        try {
            const response = await axios.put(`http://localhost:5000/update/${formData._id}`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            
            setMessage(response.data.message);
            setFormData({ _id: "", name: "", url: "", description: "", image: "", categories: [] }); // Reset form after submission
            } catch (err) {
                if (err instanceof Error) {
                    setMessage(err.message)
            } else {
                setMessage("Something went wrong");
            }
          };
          dialogRef.current?.close()
        }

    const handleIdClick = async (value: string) => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            const firstInput = dialogRef.current.querySelector("input");
            firstInput?.focus()
        }
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

    const handleIdDelete = async (value: string) => {
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
        
        const confirmDelete = window.confirm(`Are you sure you want to delete this?`);
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:5000/delete/${value}`)
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

    return(
        <>
            <dialog className="edit-popup" ref={dialogRef}>
                <form onSubmit={handleSubmit} className="Post-form">
                    <button className="close-pop" type="button" onClick={closeDialog}>X</button>
                    <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange}
                    />
                    <input type="text" name="url" placeholder="Enter url" value={formData.url} onChange={handleChange}
                    />
                    <input type="text" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange}
                    />
                    <input type="text" name="image" placeholder="Enter image link" value={formData.image} onChange={handleChange}
                    />
                    <div className="category-section">
                        <select className="categories-select" name="categories" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
                            <option hidden selected value="">Enter Catergories</option>
                            <option value="Accessibility">Accessibility</option>
                            <option value="AI">AI</option>
                            <option value="Animation">Animation</option>
                            <option value="Audio">Audio</option>
                            <option value="Blogging">Blogging</option>
                            <option value="Colour">Colour</option>
                            <option value="Collaboration">Collaboration</option>
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Editing">Editing</option>
                            <option value="Educational">Educational</option>
                            <option value="Fonts">Fonts</option>
                            <option value="Illustration">Illustration</option>
                            <option value="Inspiration">Inspiration</option>
                            <option value="Icons">Icons</option>
                            <option value="Jobs">Jobs</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                            <option value="Podcasting">Podcasting</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Stock Images">Stock Images</option>
                            <option value="Stock Videos">Stock Videos</option>
                            <option value="Free">Free</option>
                            <option value="Free Trial">Free Trial</option>
                            <option value="Paid">Paid</option>
                        </select>
                        <button type="button" onClick={handleAddCategory} className="add-cat">Add</button>
                        <div className="current-cats">
                            {formData.categories.map((categories, index) => (
                                <span className="added-cat" key={index}>
                                    <button className="delete-cat" onClick={() => handleDelCategory(categories)}>X</button>
                                    {categories}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="submit-button">
                        <button type="submit" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </dialog>
            <div className="list-info" id="Explore">
                <div className="list">
                    <h2 className="explore">EXPLORE</h2>
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
                    {filteredData.map((resource) => (
                        <div className="card-holder">
                            <div className="card-buttons">
                                <a className="button-left" onClick={() => handleIdClick(resource._id)}>
                                    <img src="https://static.thenounproject.com/png/3406050-200.png" height="20px"/>
                                </a>
                                <a className="button-right" onClick={() => handleIdDelete(resource._id)}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/484/484662.png" height="20px"/>
                                </a>
                            </div>
                            <a className="card-link" target="_blank" href={resource.url}>
                                <div className="card-image" style={{background: `url(${resource.image})`}}/>
                                <hr/>
                                <h3 className="card-title">{resource.name}</h3>
                                <p className="card-desc">{resource.description}</p>
                            </a>
                        </div>
                    ))}
                </div>               
            </div>
        </>
    )
}