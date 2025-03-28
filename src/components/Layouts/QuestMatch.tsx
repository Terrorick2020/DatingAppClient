import ChatInput from '@/components/UI/ChatInput';


const QuestMatch = () => {
    return (
        <>
            <div className="match">
                <div className="container">
                    <header className="header">
                        <h3 className="headline">Это мэтч!</h3>
                    </header>
                    <main className="main">
                        <div className="cards">
                            <div className="item male"></div>
                            <div className="item female"></div>
                        </div>
                        <h6 className="text">
                            <span className="caps">Вы</span> и <span className="caps">Виктория</span> понравились друг другу
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
