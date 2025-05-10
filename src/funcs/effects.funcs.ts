import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initMediaLinkAsync } from '@/store/slices/settingsSlice';
import { warningAlert } from '@/funcs/alert.funcs';
import { LinkPageType } from '@/types/store.types';
import type { RootDispatch } from '@/store';


export const useInitMediaLink = (linkType: LinkPageType): boolean => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    const fetchMediaLink = async () => {
      try {
        const response = await dispatch(initMediaLinkAsync(linkType)).unwrap();
        setIsDisabled(!response);
      } catch (error) {
        setIsDisabled(false);

        warningAlert(
            dispatch,
            'Не удалось загрузить видео'
        );
      }
    };

    fetchMediaLink();
  }, [dispatch, linkType]);

  return isDisabled;
};
