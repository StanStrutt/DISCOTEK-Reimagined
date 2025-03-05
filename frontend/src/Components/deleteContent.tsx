import { useState } from "react"
import axios from "axios"

interface DeleteFormData {
    _id: string;
}

export default function DeleteContent() {

    const [formId, setFormId] = useState<DeleteFormData>({ _id: "" });
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormId({ ...formId, [e.target.name]: e.target.value });
    };

    const handleDelete = async () => {
        if (!formId._id) {
            setMessage("Enter the id to delete")
            return
        }
    

        const confirmDelete = window.confirm(`Are you sure you want to delete user ${formId._id}?`);
        if (!confirmDelete) return;


        try {
            const response = await axios.delete(`http://localhost:5000/delete/${formId._id}`)
        
            setMessage(response.data.message);
            setFormId({ _id: "" }); // Reset form after submission
            } catch (err) {
                if (err instanceof Error) {
                    setMessage(err.message)
            } else {
                setMessage("Something went wrong");
            }
          }}
      

    return(
        <div className="Form">
            <div className="editContent">
                <h2>Delete Form</h2>
                <form className="delete-form">
                    <input
                    type="text"
                    name="_id"
                    placeholder="Enter id"
                    value={formId._id}
                    onChange={handleChange}
                    required
                    />
                    <button type="button" onClick={handleDelete}>delete</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}