import { useRef } from "react"
import axios from "axios"
import UpdateContent from "./updateContent"
import DialogForm from "./dialogForm"



export default function AddContent() {

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
            const response = await axios.post("http://localhost:5000/submit", formData, {
                headers: { "Content-Type": "application/json" },
            });
        
            setMessage(response.data.message);
            setFormData({_id:"", name: "", url: "", description: "", image: "", categories: [] }); // Reset form after submission
            } catch (err) {
                if (err instanceof Error) {
                    setMessage(err.message)
            } else {
                setMessage("Something went wrong");
            }
        }
        dialogRef.current?.close()
        setIsOpen(false)
    };
    

    return(
        <>
            <button onClick={openDialog}>+</button>
            <DialogForm formData={formData} dialogRef={dialogRef} handleSubmit={handleSubmit} handleAddCategory={handleAddCategory} button={"Create"}
            categoryInput={categoryInput} setCategoryInput={setCategoryInput} handleChange={handleChange} handleDelCategory={handleDelCategory} setIsOpen={setIsOpen}/>
        </>
    )
}