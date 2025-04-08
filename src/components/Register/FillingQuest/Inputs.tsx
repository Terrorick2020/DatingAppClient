import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { districtsList } from '@/constant/settings';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomSelIcon from '@/components/UI/CustomSelIcon';

import type { IState } from '@/types/store.types';


const FillingQuestInputs = () => {
    const profInfo = useSelector((state: IState) => state.profile.info);
    const regInpErr = useSelector((state: IState) => state.settings.regInpErr);

    const dispatch = useDispatch();

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setInfo({
            ...profInfo,
            name: event.target.value,
        }))
    }

    const handleSelectCity = (event: SelectChangeEvent) => {
        const newValue = event.target.value;

        newValue && dispatch(setInfo({
            ...profInfo,
            city: newValue,
        }))
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
                    value={profInfo.name}
                    onChange={handleChangeName}
                    error={regInpErr.nameErr}
                    helperText={'Поле не может быть пустым'}
                />
                <h4>Ваш город</h4>
                <FormControl>
                    <InputLabel className="sel-label" htmlFor="city-input">Выбирите город</InputLabel>
                    <Select
                        IconComponent={(props) => (
                            <CustomSelIcon {...props} />
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
                        value={profInfo.city  || ''}
                        onChange={handleSelectCity}
                        error={regInpErr.cityErr}
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

export default FillingQuestInputs;
