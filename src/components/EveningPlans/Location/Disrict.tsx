import { JSX, memo, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/slices/profileSlice';
import { setEPErrors } from '@/store/slices/settingsSlice';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import type { PropsLocationDistrict } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const LocationDistrict = memo((props: PropsLocationDistrict): JSX.Element => {
  const location = useSelector((state: IState) => state.profile.eveningPlans.location);
  const fEPErrors = useSelector((state: IState) => state.settings.fEPErrors);

  const [ value, setValue ] = useState<string>('');

  const dispatch = useDispatch<RootDispatch>();

  const handleInputChange = (_: SyntheticEvent, newInputValue: string): void => {
    setValue(newInputValue);
  };

  const handleChange = (_: SyntheticEvent, newValue: string | null): void => {
    setValue(newValue || '');

    const stateValue = props.districtsVars.find(item => item.label === newValue);

    dispatch(setLocation({
      ...location,
      value: newValue && stateValue !== undefined ? stateValue.value : '',
    }));

    dispatch(setEPErrors({
      ...fEPErrors,
      districtErr: {
        value: !newValue,
        msg: !newValue ? EMPTY_INPUT_ERR_MSG : '',
      }
    }));
  };

  useEffect(
    () => {
      if(location.value) {

        const targetValue = props.districtsVars.find(
          item => item.value === location.value
        );

        setValue(targetValue?.label || '');
      }
    },
    [props.districtsVars]
  );

  return (
    <Autocomplete
      id="autocomplite-district"
      className="district-input"
      options={props.districtsVars.map((option) => option.label)}
      inputValue={value}
      value={value || null}
      onInputChange={handleInputChange}
      onChange={handleChange}
      noOptionsText="Ничего не найдено"
      popupIcon={null}
      slotProps={{
        popupIndicator: {
          sx: {
            display: 'none',
          }
        },
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
        }
      }}
      renderInput={ (params) =>
          <TextField
              {...params}
              label="Укажите район места встречи"
              slotProps={{
                  inputLabel: { shrink: false },
              }}
              error={fEPErrors.districtErr.value}
              helperText={fEPErrors.districtErr.msg}
          />
      }
    />
  )
})

export default LocationDistrict;
