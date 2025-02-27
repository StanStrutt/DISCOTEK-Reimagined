import "./list.css"
import Get from "../services/api-calls"

export default function List() { 

    const {filteredData, handleTopicClick, error} = Get()
 
    return(
        <div className="list-info" id="Explore">
            <div className="list">
                <h2>EXPLORE</h2>
                <div className="categories">
                    <div className="cat-list">
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Accessibility")} >Accessibility</button> 
                            <button className="cat-name" onClick={() => handleTopicClick("AI")} >AI</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Animation")} >Animation</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Audio")} >Audio</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Blogging")} >Blogging</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Colour")} >Colour</button>
                        </div>
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Collaboration")} >Collaboration</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Design")} >Design</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Development")} >Development</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Editing")} >Editing</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Educational")} >Educational</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Fonts")} >Fonts</button>
                        </div>
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Illustration")} >Illustration</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Inspiration")} >Inspiration</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Icons")} >Icons</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Jobs")} >Jobs</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Miscellaneous")} >Miscellaneous</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Podcasting")} >Podcasting</button>
                        </div>
                        <div className="cat-column">
                            <button className="cat-name" onClick={() => handleTopicClick("Productivity")} >Productivity</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Stock Images")} >Stock Images</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Stock Videos")} >Stock Videos</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Free")} >Free</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Free Trial")} >Free Trial</button>
                            <button className="cat-name" onClick={() => handleTopicClick("Paid")} >Paid</button>
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