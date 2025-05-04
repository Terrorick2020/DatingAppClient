import TextField from '@mui/material/TextField';


const LocationDetails = () => {
    return (
        <>
            <TextField
                className="details-input"
                id="location-textarea"
                multiline
                fullWidth
                minRows={4}
                maxRows={6}
                placeholder="Подробнее о месте встречи"
                slotProps={{
                    input: {
                        inputProps: {
                            maxLength: 200,
                        },
                    },
                }}
            />
        </>
    )
}

export default LocationDetails;
