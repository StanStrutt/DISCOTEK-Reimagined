import "./header.css"

export default function Header() {

    const scrollDown = () => {      //Button in the header to go down to the featured sections
        window.scrollTo({
            top: window.innerHeight + 1,
            left: 0,
            behavior: "smooth"
        })
    }

    const scrollDownFeatured = () => {
        window.scrollTo({
            top: window.innerHeight + window.innerHeight - 50,
            left: 0,
            behavior: "smooth"
        })
    }

    return(
        <div className='header'>
            <div className='banner'>
                <img className='logo' src='https://discotek.net/assets/logo.svg' alt='DISCOTEK'/>
            </div>
            <div className='front-page'>
                <div className='left-text'>
                    <h1>Your digital toolbox, work smarter not harder.</h1>
                    <p>DISCoTek is a website which provides hundreds of resources from all over the web from productivity tools to the latest AI.</p>
                    <p>Run by DISC, a specialist college in Manchester for 16 - 25 year olds, which allows young people to progress their career in the digital sector.</p>
                    <div className='front-buttons'>
                        <a onClick={scrollDownFeatured}>Explored</a>
                        <a onClick={scrollDown}>Featured</a>
                    </div>
                </div>
                <div className='right-gif'>
                    <div className='ball'></div>
                    <div className='stats'>
                        <div className='stat'>
                            <p className='stat-top'>100+</p>
                            <p className='stat-bottom'>Resources</p>
                        </div>
                        <div className='stat'>
                            <p className='stat-top'>20+</p>
                            <p className='stat-bottom'>Categories</p>
                        </div>
                        <div className='stat'>
                            <p className='stat-top'>Unlimited</p>
                            <p className='stat-bottom'>Possibilities</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom-bar'>
            <a>
                <img className='scroll' onClick={scrollDown} /* Application of the scrolldown function and applied to a button */ 
                src='https://discotek.net/assets/scroll.png' alt='scroll button'/>
            </a>
        </div>
      </div>
    )
}
    
    