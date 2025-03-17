import "./addContent.css"
import { useState } from "react"
import axios from "axios"

interface AddFormData {
    name: string;
    url: string;
    description: string;
    image: string;
    categories: string[];
}

export default function AddContent() {

    const [formData, setFormData] = useState<AddFormData>({ name: "", url: "", description: "", image: "", categories: [] });
    const [categoryInput, setCategoryInput] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [addOpen, setAddOpen] = useState<boolean>(false)

    const handleAddEntry = () => {
        setAddOpen(!addOpen)
    }
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCategory = () => {
        if (categoryInput.trim() !== "") {
            setFormData({ ...formData, categories: [...formData.categories, categoryInput.trim()] });
            setCategoryInput("")
        }
    }

    const handleDelCategory = (categoryDel: string) => {
        setFormData({
            ...formData,
            categories: formData.categories.filter(category => category !== categoryDel)
        })
    }
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:5000/submit", formData, {
                headers: { "Content-Type": "application/json" },
            });
        
            setMessage(response.data.message);
            setFormData({ name: "", url: "", description: "", image: "", categories: [] }); // Reset form after submission
            } catch (err) {
                if (err instanceof Error) {
                    setMessage(err.message)
            } else {
                setMessage("Something went wrong");
            }
        }
        setAddOpen(false)
    };
    

    return(
        <>
            <button onClick={handleAddEntry}>Add entry</button>
            {addOpen && (
                <div className="edit-content">
                    <form onSubmit={handleSubmit} className="post-form">
                        <button className="close-pop" onClick={() => setAddOpen(false)}>X</button>
                        <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required
                        />
                        <input type="text" name="url" placeholder="Enter url" value={formData.url} onChange={handleChange} required
                        />
                        <input type="text" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} required
                        />
                        <input type="text" name="image" placeholder="Enter image link" value={formData.image} onChange={handleChange} required
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
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            )}
        </>
    )
}