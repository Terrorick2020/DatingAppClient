import ChatInput from '@/components/UI/ChatInput';

import PngFemale from '@/assets/img/female.png';
import PngMale from '@/assets/img/male.png';


const QuestMatch = () => {
    return (
        <>
            <div className="match">
                <div className="container">
                    <header className="header">
                        <h2 className="headline">Это мэтч!</h2>
                    </header>
                    <main className="main">
                        <div className="cards">
                            <div className="item female"
                                style={{
                                    backgroundImage: `url(${PngFemale})`
                                }}
                            />
                            <div className="item male"
                                style={{
                                    backgroundImage: `url(${PngMale})`
                                }}
                            />
                        </div>
                        <h6 className="text">
                            <span className="caps">Вы</span> и <span className="caps">Виктория</span> 
                            <span className="no-wrap">понравились друг другу</span>
                        </h6>
                        <ChatInput isMatch={true} />
                    </main>
                    <footer className="footer"></footer>
                </div>
            </div>
        </>
    )
}

export default QuestMatch
