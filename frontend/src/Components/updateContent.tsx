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
    }
}