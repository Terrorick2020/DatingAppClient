import { JSX, memo, useState, useCallback } from 'react';
import { delay } from '@/funcs/general.funcs';
import type { PropsPhotos, DelDialogState } from '@/types/ui.types';

import PhotosItem from './Item';
import PhotosAddItem from './AddItem';
import PhotosLoadItem from './LoadItem';
import PhotosDelDialog from './DelDialog';


const Photos = memo((props: PropsPhotos): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>('');
  const [delDialogState, setDelDialogState] = useState<DelDialogState>({
    open: false,
    targetId: '',
  });
  
  const handleAdd = useCallback(async (photo: File): Promise<void> => {
    setPhoto(URL.createObjectURL(photo));
    setLoading(true);

    await props.handleAdd(photo);

    setLoading(false);

    await delay(100);

    setPhoto('');
  }, [props.handleAdd]);

  const setOpen = useCallback((open: boolean) => {
    setDelDialogState(prev => ({ ...prev, open }));
  }, []);

  return (
    <>
        <ul className="photos" id="photos">
            {props.photos.map(item => (
                <PhotosItem
                  item={item}
                  key={`photos__item-${item.id}`}
                  setDelDialogState={setDelDialogState}
                />
            ))}

            {props.photos.length < 3 && (
                <>
                    {loading && <PhotosLoadItem photo={photo} />}
                    {!photo && <PhotosAddItem handleAdd={handleAdd} />}
                </>
            )}
        </ul>
        
        <PhotosDelDialog
            id={delDialogState.targetId}
            open={delDialogState.open}
            setOpen={setOpen}
            handleDel={props.handleDel}
        />
    </>
  )
})

export default Photos;
