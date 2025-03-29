import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';


interface PropsFillingQuestMedia {
    show: boolean
}

const FillingQuestMedia = (props: PropsFillingQuestMedia) => {

    return (
        <>
            <div className="video__media">
                <Collapse in={props.show}>
                    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
                        <svg>
                            <Box
                                component="polygon"
                                points="0,100 50,00, 100,100"
                                sx={(theme) => ({
                                    fill: theme.palette.common.white,
                                    stroke: theme.palette.divider,
                                    strokeWidth: 1,
                                })}
                            />
                        </svg>
                    </Paper>
                </Collapse>
            </div>
        </>
    )
}

export default FillingQuestMedia
