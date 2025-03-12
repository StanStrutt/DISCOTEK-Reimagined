import { useState } from "react"
import axios from "axios"


interface AddFormData {
    _id: string;
    name: string;
    url: string;
    description: string;
    image: string;
    categories: string[];
}

export default function UpdateContent() {

    const [formData, setFormData] = useState<AddFormData>({ _id: "", name: "", url: "", description: "", image: "", categories: [] });
    const [categoryInput, setCategoryInput] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false)
  
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
        }
        
    const handleUpdate = async () => {
        if (!formData._id) {
            setMessage("Please enter an id to update the user.");
            return;
        }
        
        try {
            const response = await axios.put(`http://localhost:5000/update/${formData._id}`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            
              setMessage(response.data.message);
            }catch (err) {
                if (err instanceof Error) {
                    setMessage(err.message)
            } else {
                setMessage("Something went wrong");
            }
          };
          setIsOpen(false)
        }
        
    return{
        handleUpdate,
        handleSubmit,
        handleAddCategory,
        handleChange,
        message,
        categoryInput,
        setCategoryInput,
        formData,
        setFormData,
        setMessage,
        handleDelCategory,
        isOpen,
        setIsOpen
        
        
        
        // <div className="Form">
        //     <div className="editContent">
        //         <h2>update Form</h2>
        //         <form onSubmit={handleSubmit} className="Post-form">
        //             <input
        //                 type="text"
        //                 name="_id"
        //                 placeholder="Enter id"
        //                 value={formData._id}
        //                 onChange={handleChange}
        //                 required/>
        //                 <button type="button">GET</button>
        //             <input
        //                 type="text"
        //                 name="name"
        //                 placeholder="Enter name"
        //                 value={formData.name}
        //                 onChange={handleChange}
        //             />
        //             <input
        //                 type="text"
        //                 name="url"
        //                 placeholder="Enter url"
        //                 value={formData.url}
        //                 onChange={handleChange}
        //             />
        //             <input
        //                 type="text"
        //                 name="description"
        //                 placeholder="Enter description"
        //                 value={formData.description}
        //                 onChange={handleChange}
        //             />
        //             <input
        //                 type="text"
        //                 name="image"
        //                 placeholder="Enter image link"
        //                 value={formData.image}
        //                 onChange={handleChange}
        //             />
        //             <input
        //                 type="text"
        //                 name="categories"
        //                 placeholder="Enter categories"
        //                 value={categoryInput}
        //                 onChange={(e) => setCategoryInput(e.target.value)}
        //             />
        //             <button type="button" onClick={handleAddCategory} className="add-cat">Add</button>
        //             <div>
        //                 {formData.categories.map((categories, index) => (
        //                     <span className="Added-cat" key={index}>
        //                     {categories}
        //                     </span>
        //                 ))}
        //             </div>
        //             <button type="submit" onClick={handleUpdate}>Update</button>
        //         </form>
        //         {message && <p>{message}</p>}
        //     </div>
        // </div>
    }
}