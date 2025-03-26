import { useState } from 'react';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomSelIcon from '@/components/UI/CustomSelIcon';


const districtsList = [
    { id: 0, value: 'piter', label: 'Санкт-Петербург' },
    { id: 1, value: 'moscow', label: 'Москва' },
    { id: 2, value: 'kazan', label: 'Казань' },
    { id: 3, value: 'novosibirsk', label: 'Новосибирск' },
    { id: 4, value: 'ekb', label: 'Екатеринбург' }
];

const FillingQuestInputs = () => {
    const [city, setCity] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCity(event.target.value)
    }

    return (
        <>
            <div className="widgets__inputs">
                <h4>Ваше имя</h4>
                <TextField
                    className="name-input"
                    id="name-input"
                    fullWidth
                    placeholder="Имя"
                />
                <h4>Ваш город</h4>
                <FormControl>
                    <InputLabel className="sel-label" htmlFor="city-input">Выбирите город</InputLabel>
                    <Select
                        IconComponent={(props) => (
                            <CustomSelIcon {...props}/>
                        )}
                        defaultValue=""
                        labelId="city-input"
                        id="city-input"
                        MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: '#2B2B2B',
                                color: '#FFFFFF',
                                borderRadius: 2,
                                '& .MuiMenuItem-root.Mui-selected': {
                                    backgroundColor: '#D7FF81',
                                    color: '#121112',
                                },
                              },
                            },
                        }}
                        value={city}
                        onChange={handleChange}
                    >
                        {districtsList.map(item => (
                            <MenuItem
                                key={`menu-city-item-${item.id}`}
                                value={item.value}
                            >{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default FillingQuestInputs
