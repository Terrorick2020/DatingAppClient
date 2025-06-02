import { ChangeEvent, JSX, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { setInfo } from '@/store/slices/profileSlice';
import { type IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomSelIcon from '@/components/UI/CustomSelIcon';


const FillingQuestInputs = (): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);
    const cityesVarsList = useSelector((state: IState) => state.settings.cityesVars);

    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
        const name: string = event.target.value;

        dispatch(setInfo({
            ...profileInfo,
            name,
        }))

        dispatch(setFQErrors({
            ...fQErrors,
            nameErr: {
                value: !name,
                msg: !name ? EMPTY_INPUT_ERR_MSG : '',
            }
        }))
    }

    const handleChangeCity = (event: SelectChangeEvent): void => {
        dispatch(setInfo({
            ...profileInfo,
            town: event.target.value,
        }))

        dispatch(setFQErrors({
            ...fQErrors,
            cityErr: {
                value: false,
                msg: '',
            }
        }))
    }

    const handleOpenPanel = (): void => setOpen(!open);

    if(!cityesVarsList.length) return(<></>);

    return (
        <div className="widgets__inputs">
            <h4>Ваше имя</h4>
            <TextField
                className="name-input"
                id="name-input"
                fullWidth
                placeholder="Имя"
                value={profileInfo.name}
                onChange={handleChangeName}
                error={fQErrors.nameErr.value}
                helperText={fQErrors.nameErr.msg}
            />
            <h4 className="city-headline">Ваш город</h4>
            <FormControl>
                <InputLabel className="sel-label" htmlFor="city-input" shrink={false}>Выбирите город</InputLabel>
                <Select
                    IconComponent={(props) => (
                        <CustomSelIcon
                            {...props}
                            handleClick={handleOpenPanel}
                        />
                    )}
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
                            '& .MuiMenuItem-root.Mui-selected:hover': {
                                backgroundColor: '#D7FF81',
                                color: '#121112',
                            },
                            },
                        },
                    }}
                    sx={{
                        ...(fQErrors.cityErr.value && {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FF4365',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FF4365',
                            },
                        })
                    }}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    value={profileInfo.town}
                    onChange={handleChangeCity}

                >
                    {cityesVarsList.map(item => (
                        <MenuItem
                            key={`menu-city-item-${item.id}`}
                            value={item.value}
                        >{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {fQErrors.cityErr.value && <p className="city-err">{fQErrors.cityErr.msg}</p>}
        </div>
    )
}

export default FillingQuestInputs;
