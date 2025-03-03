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
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCategory = () => {
        if (categoryInput.trim() !== "") {
            setFormData({ ...formData, categories: [...formData.categories, categoryInput.trim()] });
            setCategoryInput("")
        }
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
          }};
      

    return(
        <div className="Form">
            <div className="editContent">
                <h2>Submit Form</h2>
                <form onSubmit={handleSubmit} className="Post-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Enter image link"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="categories"
                        placeholder="Enter categories"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddCategory} className="add-cat">Add</button>
                    <div>
                        {formData.categories.map((categories, index) => (
                            <span className="Added-cat" key={index}>
                            {categories}
                            </span>
                        ))}
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}