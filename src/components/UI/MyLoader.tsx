import { JSX } from "react";


const MyLoader = (): JSX.Element => {
    return (
        <div className="my-loader-box"  id="my-loader-box">
            <div className="my-loader-box__container">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>
        </div>
    )
}

export default MyLoader;
