import { useState } from 'react';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


interface InterestsVariant {
    id: number,
    value: string,
    label : string,
}

const variantsList: InterestsVariant[] = [
    { id: 0, value: 'communication', label: 'Общение' },
    { id: 1, value: 'friendship', label: 'Дружба' },
    { id: 2, value: 'sex', label: 'Секс' },
    { id: 3, value: 'love', label: 'Любовь' },
]

const FillingQuestInterests = () => {
    const [value, setValue] = useState<string>(variantsList[0].value);

    return (
        <>
            <div className="widgets__interests">
                <h4 className="headline">Вы хотите найти</h4>
                <ToggleButtonGroup
                    className="select"
                    spacing={ 5 }
                    value={ value }
                    onChange={(_event, newValue) => {
                        if( newValue ) setValue(newValue);
                    }}
                >
                    {variantsList.map( (item: InterestsVariant) => (
                        <IconButton
                            className="select__item"
                            key={`interest__${item.id}`}
                            value={item.value}
                        >
                            {item.label}
                        </IconButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestInterests
