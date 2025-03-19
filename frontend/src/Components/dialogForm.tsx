import "./dialogForm.css"
import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function DialogForm(props) {

    const formdata = props.formData

    const dialogref = props.dialogRef

    const setisopen = props.setIsOpen
    
            const closeDialog = () => {
                if (dialogref.current) {
                    setisopen(false)
                    dialogref.current.close();
                }
            }
        
            useEffect(() => {
                const dialog = dialogref.current;
                if (dialog) {
                    dialog.addEventListener("cancel", closeDialog);
                    return () => dialog.removeEventListener("cancel", closeDialog)
                }
            }, );

    return(
        <dialog className="edit-popup" ref={props.dialogRef}>
            <form onSubmit={props.handleSubmit} className="Post-form">
                <button className="close-pop" type="button" onClick={closeDialog}>X</button>
                <input type="text" name="name" placeholder="Enter name" value={formdata.name} onChange={props.handleChange}
                />
                <input type="text" name="url" placeholder="Enter url" value={formdata.url} onChange={props.handleChange}
                />
                <input type="text" name="description" placeholder="Enter description" value={formdata.description} onChange={props.handleChange}
                />
                <input type="text" name="image" placeholder="Enter image link" value={formdata.image} onChange={props.handleChange}
                />
                <div className="category-section">
                    <select className="categories-select" name="categories" value={props.categoryInput} onChange={(e) => props.setCategoryInput(e.target.value)}>
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
                    <button type="button" onClick={props.handleAddCategory} className="add-cat">Add</button>
                    <div className="current-cats">
                        {formdata.categories.map((categories: string, index: string) => (
                            <span className="added-cat" key={index}>
                                <button className="delete-cat" onClick={() => props.handleDelCategory(categories)}>X</button>
                                {categories}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="submit-button">
                    <button type="submit">{props.button}</button>
                </div>
            </form>
        </dialog>
    )
}