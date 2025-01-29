import "./featured.css"
import { useEffect, useRef, useState } from "react";

interface CursorPosition {
    x: number;
    y: number;
  }


export default function Featured() {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const sliderBound = containerRef.current.getBoundingClientRect();
      const globalCursor = { x: e.clientX, y: e.clientY };
      const sliderCursor = {
        x: globalCursor.x - sliderBound.left,
        y: globalCursor.y - sliderBound.top,
      };

      if (
        sliderCursor.y < window.innerHeight * 0.9 - 25 &&
        sliderCursor.y > 20
      ) {
        setCursorPosition(sliderCursor);
      }
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);


    return(
        <div className="featured">
            <div className="left-featured" ref={containerRef}>
                <img className="slider" src="https://discotek.net/assets/slider.png" style={{ transform: `translateY(${cursorPosition.y - window.innerHeight * 0.02}px)` }}/>
                <div className="over-image" style={{ height: `${cursorPosition.y}px` }}/>
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