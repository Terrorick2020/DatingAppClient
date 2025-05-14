import { JSX, memo, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/slices/profileSlice';
import type { BaseVarsItem } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface PropsLocationDistrict {
  districtsVars: BaseVarsItem[]
}
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
    dispatch(setLocation({
      ...location,
      value: newValue || ''
    }));
  };

  return (
      <>
          <Autocomplete
              freeSolo
              id="autocomplite-district"
              className="district-input"
              options={props.districtsVars.map((option) => option.label)}
              inputValue={value}
              onInputChange={handleInputChange}
              onChange={handleChange}
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
                      error={fEPErrors.districtErr.value}
                      helperText={fEPErrors.districtErr.msg}
                  />
              }
          />
      </>
  )
})

export default LocationDistrict;
