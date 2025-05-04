import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];

const LocationDistrict = () => {
    return (
        <>
            <Autocomplete
                freeSolo
                id="autocomplite-district"
                className="district-input"
                options={top100Films.map((option) => option.title)}
                slotProps={{
                    paper: {
                      sx: {
                        backgroundColor: '#2B2B2B',
                        color: '#FFFFFF',
                        borderRadius: 2,
                      },
                    },
                    listbox: {
                      sx: {
                        '& .MuiAutocomplete-option[aria-selected="true"]': {
                          backgroundColor: '#D7FF81',
                          color: '#121112',
                        },
                        '& .MuiAutocomplete-option': {
                            '&[aria-selected="true"]:hover': {
                              backgroundColor: '#D7FF81',
                              color: '#121112',
                            },
                        },
                        '& .MuiAutocomplete-option:hover': {
                          backgroundColor: '#D7FF81',
                          color: '#121112',
                        },
                      },
                    },
                }}
                renderInput={ (params) =>
                    <TextField
                        {...params}
                        label="Укажите район места встречи"
                        slotProps={{
                            inputLabel: { shrink: false },
                        }}
                    />
                }
            />
        </>
    )
}

export default LocationDistrict;
