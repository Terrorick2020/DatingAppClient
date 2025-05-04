import TextField from '@mui/material/TextField';


const PlansDetails = () => {
    return (
        <>
            <TextField
                className="details-input"
                id="plans-textarea"
                multiline
                fullWidth
                minRows={4}
                maxRows={6}
                placeholder="Напишите подробнее о планах"
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

export default PlansDetails;
