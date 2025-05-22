import { useRef } from "react"

import axios from "axios"

import Get from "../services/api-calls"
import UpdateContent from "./updateContent"

import DialogForm from "./DialogForm"




export default function AddContent() {
    
    const VITE_URL = import.meta.env.VITE_API_URL;

    const {fetchData} = Get()

    const {handleAddCategory, formData, setMessage, setFormData, categoryInput, setCategoryInput, handleChange, handleDelCategory, setIsOpen} = UpdateContent()

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const openDialog = () => {
        if (dialogRef.current) {
            setIsOpen(true)
            dialogRef.current.showModal();
            const firstInput = dialogRef.current.querySelector("input");
            firstInput?.focus()
        }
    }
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${VITE_URL}/submit`, formData, {
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
        }
        await fetchData()
        dialogRef.current?.close()
        setIsOpen(false)
    }
    
    


    return(
        <>
            <button className="add-button" onClick={openDialog}>+</button>
            <DialogForm formData={formData} dialogRef={dialogRef} handleSubmit={handleSubmit} handleAddCategory={handleAddCategory} button={"Create"}
            categoryInput={categoryInput} setCategoryInput={setCategoryInput} handleChange={handleChange} handleDelCategory={handleDelCategory} setIsOpen={setIsOpen}/>
        </>
    )
}