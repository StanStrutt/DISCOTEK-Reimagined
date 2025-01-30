import { useEffect, useState } from "react"
import "./list.css"
import resources from "../resources.json"

export default function List() { 

    const [topic, setTopic] = useState("")

    const handleTopicClick = (value: string) => {
        setTopic(value);
      };

    // useEffect(() => {
    //     if (topic !== null) {
    //         resources.filter((resource) => {
    //         resource.categories.includes(topic)
    //         })
    //     }  
    // })

    useEffect(() => {
        if (topic) {
            resources.filter((resource) => {
            const topicMatch = resource.categories.includes(topic);
            return topicMatch;
          });
        }
      }, [topic]);

    return(
        <div className="list-info">
            <div className="list">
                <h2>EXPLORE</h2>
                <div className="categories">
                    <div className="cat-list">
                        <div className="cat-column">
                            <a className="cat-name" onClick={() => handleTopicClick("Accessibility")} >Accessibility</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("AI")} >AI</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Animation")} >Animation</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Audio")} >Audio</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Blogging")} >Blogging</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Colour")} >Colour</a>
                        </div>
                        <div className="cat-column">
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Collaboration")} >Collaboration</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Design")} >Design</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Development")} >Development</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Editing")} >Editing</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Educational")} >Educational</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Fonts")} >Fonts</a>
                        </div>
                        <div className="cat-column">
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Illustration")} >Illustration</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Inspiration")} >Inspiration</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Icons")} >Icons</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Jobs")} >Jobs</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Miscellaneous")} >Miscellaneous</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Podcasting")} >Podcasting</a>
                        </div>
                        <div className="cat-column">
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Productivity")} >Productivity</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Stock Images")} >Stock Images</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Stock Videos")} >Stock Videos</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Free")} >Free</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Free Trial")} >Free Trial</a>
                            <a href=" " className="cat-name" onClick={() => handleTopicClick("Paid")} >Paid</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info">
                {topic && (
                    <>
                        {resources.map((resource) => (
                            <a className="card-link" href={resource.url}>
                                <div className="card-image" style={{background: `url(${resource.image})`}}/>
                                <hr/>
                                <h3 className="card-title" >{resource.name}</h3>
                                <p className="card-desc" >{resource.description}</p>
                            </a>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}