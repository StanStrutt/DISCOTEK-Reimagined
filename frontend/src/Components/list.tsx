import { useEffect, useState } from "react"
import "./list.css"
import resources from "../resources.json"

interface Resources {
    name: string;
    url: string;
    description: string;
    image: string;
    categories: string[];
}

export default function List() { 

    const [topic, setTopic] = useState<string>("")
    const [filtered, setFiltered] = useState<Resources[]>(resources) 

    const handleTopicClick = (value: string) => {
        setTopic(value);
      };
    useEffect(() => {
        if (topic) {
            const filter = resources.filter((resource) => {
            const topicMatch = resource.categories.includes(topic); 
            return topicMatch;
          });

          setFiltered(filter);
        }
      }, [topic]);

    return(
        <div className="list-info">
            <div className="list">
                <h2>EXPLORE</h2>
                <div className="categories">
                    <div className="cat-list">
                        <div className="cat-column">
                            <a className="cat-name" onClick={() => handleTopicClick("Accessibility")} >Accessibility</a> {/* different onclicks for each resource */}
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
                {filtered.map((resource) => (
                    <a className="card-link" href={resource.url}>
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