import "./list.css"
import Get from "../services/api-calls"


export default function List() { 

    const {filteredData, handleTopicClick, error} = Get()
 
    return(
        <div className="list-info">
            <div className="list">
                <h2>EXPLORE</h2>
                <div className="categories">
                    <div className="cat-list">
                        <div className="cat-column">
                            <a className="cat-name" onClick={() => handleTopicClick("Accessibility")} >Accessibility</a> 
                            <a className="cat-name" onClick={() => handleTopicClick("AI")} >AI</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Animation")} >Animation</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Audio")} >Audio</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Blogging")} >Blogging</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Colour")} >Colour</a>
                        </div>
                        <div className="cat-column">
                            <a className="cat-name" onClick={() => handleTopicClick("Collaboration")} >Collaboration</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Design")} >Design</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Development")} >Development</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Editing")} >Editing</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Educational")} >Educational</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Fonts")} >Fonts</a>
                        </div>
                        <div className="cat-column">
                            <a className="cat-name" onClick={() => handleTopicClick("Illustration")} >Illustration</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Inspiration")} >Inspiration</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Icons")} >Icons</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Jobs")} >Jobs</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Miscellaneous")} >Miscellaneous</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Podcasting")} >Podcasting</a>
                        </div>
                        <div className="cat-column">
                            <a className="cat-name" onClick={() => handleTopicClick("Productivity")} >Productivity</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Stock Images")} >Stock Images</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Stock Videos")} >Stock Videos</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Free")} >Free</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Free Trial")} >Free Trial</a>
                            <a className="cat-name" onClick={() => handleTopicClick("Paid")} >Paid</a>
                        </div>
                    </div>
                </div>
            </div>   
            <div className="info"> 
                {error}
                {filteredData.map((resource) => (
                    <a className="card-link" target="_blank" href={resource.url}>
                        <div className="card-image" style={{background: `url(${resource.image})`}}/>
                        <hr/>
                        <h3 className="card-title" >{resource.name}</h3>
                        <p className="card-desc" >{resource.description}</p>
                    </a>
                ))}
            </div>               
        </div>
    )
}