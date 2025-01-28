import "./featured.css"

export default function Featured() {
    return(
        <div className="featured">
            <div className="left-featured">
                <img className="slider" src="https://discotek.net/assets/slider.png"/>
                <div className="over-image"/>
                <div className="left-featured-text">
                    <h3>Generative Fill</h3>
                    <p>Use Adobe’s new AI tool to change, remove or fill any object from an image in seconds!</p>
                    <a href="https://firefly.adobe.com/" target="_blank">Try it now</a>
                </div>
            </div>
            <div className="right-featured">
                <div className="top-featured">
                    <h3>Text to Image Generation</h3>
                    <p>Use Adobe’s new AI tool to create images from text in seconds, turn your imagination into real life!</p>
                    <a href="https://firefly.adobe.com/" target="_blank">Try it now</a>
                </div>
                <div className="bottom-featured">
                    <h3>Text Effects</h3>
                    <p>Use Adobe’s new AI tool to apply styles or textures onto text with custom prompts!</p>
                    <a href="https://firefly.adobe.com/" target="_blank">Try it now</a>
                </div>
            </div>
        </div>
    )
}