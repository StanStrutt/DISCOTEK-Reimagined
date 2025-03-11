import { FormEventHandler, ChangeEventHandler, MouseEventHandler } from "react"
import Options from "./options"

export default function Popup(props: { handleSubmit: FormEventHandler<HTMLFormElement> | undefined; setIsopen: (arg0: boolean) => void; formData: { name: string | number | readonly string[] | undefined; url: string | number | readonly string[] | undefined; description: string | number | readonly string[] | undefined; image: string | number | readonly string[] | undefined; categories: any[] }; handleChange: ChangeEventHandler<HTMLInputElement> | undefined; categoryInput: string | number | readonly string[] | undefined; setCategoryInput: (arg0: string) => void; handleAddCategory: MouseEventHandler<HTMLButtonElement> | undefined; handleDelCategory: (arg0: any) => void; handleUpdate: MouseEventHandler<HTMLButtonElement> | undefined }) {
    return(
        <div className="edit-popup">
            <form onSubmit={props.handleSubmit} className="Post-form">
                <button className="close-pop" type="button" onClick={() => props.setIsopen(false)}>X</button>
                <input type="text" name="name" placeholder="Enter name" value={props.formData.name} onChange={props.handleChange}
                />
                <input type="text" name="url" placeholder="Enter url" value={props.formData.url} onChange={props.handleChange}
                />
                <input type="text" name="description" placeholder="Enter description" value={props.formData.description} onChange={props.handleChange}
                />
                <input type="text" name="image" placeholder="Enter image link" value={props.formData.image} onChange={props.handleChange}
                />
                <div className="category-section">
                    <select className="categories-select" name="categories" value={props.categoryInput} onChange={(e) => props.setCategoryInput(e.target.value)}>
                        <option hidden selected value="">Enter Catergories</option>
                        <Options/>
                    </select>
                    <button type="button" onClick={props.handleAddCategory} className="add-cat">Add</button>
                    <div className="current-cats">
                        {props.formData.categories.map((categories: string | undefined, index: Key | null | undefined) => (
                            <span className="added-cat" key={index}>
                                <button className="delete-cat" onClick={() => props.handleDelCategory(categories)}>X</button>
                                {categories}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="submit-button">
                    <button type="submit" onClick={props.handleUpdate}>Update</button>
                </div>
            </form>
        </div>
    )
}