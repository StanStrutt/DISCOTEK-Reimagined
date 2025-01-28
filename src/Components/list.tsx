import "./list.css"

export default function List() {
    return(
        <div className="list">
            <h2>EXPLORE</h2>
            <div className="categories">
                <div className="cat-list">
                    <div className="cat-column">
                        <a href=" " className="cat-name">Accessibility</a>
                        <a href=" " className="cat-name">AI</a>
                        <a href=" " className="cat-name">Animation</a>
                        <a href=" " className="cat-name">Audio</a>
                        <a href=" " className="cat-name">Blogging</a>
                        <a href=" " className="cat-name">Colour</a>
                    </div>
                    <div className="cat-column">
                        <a href=" " className="cat-name">Collaboration</a>
                        <a href=" " className="cat-name">Design</a>
                        <a href=" " className="cat-name">Development</a>
                        <a href=" " className="cat-name">Editing</a>
                        <a href=" " className="cat-name">Educational</a>
                        <a href=" " className="cat-name">Fonts</a>
                    </div>
                    <div className="cat-column">
                        <a href=" " className="cat-name">Illustration</a>
                        <a href=" " className="cat-name">Inspiration</a>
                        <a href=" " className="cat-name">Icons</a>
                        <a href=" " className="cat-name">Jobs</a>
                        <a href=" " className="cat-name">Miscellaneous</a>
                        <a href=" " className="cat-name">Podcasting</a>
                    </div>
                    <div className="cat-column">
                        <a href=" " className="cat-name">Productivity</a>
                        <a href=" " className="cat-name">Stock Images</a>
                        <a href=" " className="cat-name">Stock Videos</a>
                        <a href=" " className="cat-name">Free</a>
                        <a href=" " className="cat-name">Free Trial</a>
                        <a href=" " className="cat-name">Paid</a>
                    </div>
                </div>
            </div>
        </div>
    )
}