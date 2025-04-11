import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';


interface PropsFillingQuestMedia {
    show: boolean
}

const FillingQuestMedia = (props: PropsFillingQuestMedia) => {

    return (
        <>
            <div className="video__media">
                <Collapse in={props.show} orientation="vertical">
                    <Collapse in={props.show} orientation="horizontal">
                        <Paper sx={{ width: '100vw', height: '100vh' }} elevation={6}>
                            <div className="container">
                                <h4 className="headline">Для выхода нажмите на экран</h4>
                                <iframe
                                    className="video"
                                    src="https://www.youtube.com/embed/7K2sOZDEZ4A"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </Paper>
                    </Collapse>
                </Collapse>
            </div>
        </>
    )
}

export default FillingQuestMedia;
