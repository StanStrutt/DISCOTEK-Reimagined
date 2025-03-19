import { useState, useEffect } from "react"


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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen])

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
        
    return{
        handleAddCategory,
        handleChange,
        message,
        categoryInput,
        setCategoryInput,
        formData,
        setFormData,
        setMessage,
        handleDelCategory,
        setIsOpen
    }
}