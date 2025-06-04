import { useState, useEffect } from "react"

import "./DialogForm.css"

// import Get from "../../services/api-calls"
// import axios from "axios"

interface DialogFormProps {
    id: string | null
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>
    description: string
    setDescription: React.Dispatch<React.SetStateAction<string>>
    imageLink: string
    setImageLink: React.Dispatch<React.SetStateAction<string>>
    categories: string[]
    setCategories: React.Dispatch<React.SetStateAction<string[]>>
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    buttonText: "Create" | "Update"
    onSubmit: (e: React.FormEvent) => Promise<void>
}

export default function DialogForm({
    id,
    name,
    setName,
    url,
    setUrl,
    description,
    setDescription,
    imageLink,
    setImageLink,
    categories,
    setCategories,
    visible,
    setVisible,
    buttonText,
    onSubmit,
}: DialogFormProps ) {

    const [categoryInput, setCategoryInput] = useState<string>("");

    const addCategory = () => {
        setCategories((prevCategories) => [
            ...prevCategories,
            categoryInput,
        ])
        setCategoryInput("")
    }

    const deleteCategory = (category: string) => {
        setCategories((prevCategories) => prevCategories.filter((c) => c !== category))
    }

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden"
            document.body.style.pointerEvents = "none"
        } else {
            document.body.style.overflow = "unset"
            document.body.style.pointerEvents = "all"
        }
    }, [visible])

    if (!visible) {
        return null
    }

    return (
        <div className="edit-popup">
            <form onSubmit={onSubmit} className="Post-form">
                <button className="close-pop" type="button" onClick={() => setVisible(false)}>X</button>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    name="url"
                    placeholder="Enter url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    name="imageLink"
                    placeholder="Enter image link"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
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
                    <button type="button" onClick={() => addCategory()} className="add-cat">Add</button>
                    <div className="current-cats">
                        {categories.map((category: string, index: number) => (
                            <span className="added-cat" key={index}>
                                <button type="button" className="delete-cat" onClick={() => deleteCategory(category)}>X</button>
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="submit-button">
                    <button className="submitting-button" type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}
