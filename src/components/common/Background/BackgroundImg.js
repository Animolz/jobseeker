import React from "react"
import './css/BackgroundImg.scss'

const BackgroundImg = (props) => {
    const { url, content } = props;

    return (
        <React.Fragment>
            <section className="background" style={{backgroundImage: `url(${url})`}}>
                {content}
            </section>
        </React.Fragment>   
    )
}

export default BackgroundImg