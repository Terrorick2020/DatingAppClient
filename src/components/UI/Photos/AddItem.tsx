import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { infoAlert, warningAlert } from '@/funcs/alert.funcs';
import { validImageTypes, maxImgSize } from '@/constant/ui';
import type { RootDispatch } from '@/store';

import PhotosCropperDialog from './CropperDialog';
import SvgAdd from '@/assets/icon/add.svg';


interface PropsPhotosAddItem {
    handleAdd: (photo: File) => void
}
const PhotosAddItem = (props: PropsPhotosAddItem) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string>('');

    const dispatch = useDispatch<RootDispatch>();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (isProcessing) return;
        
        setIsProcessing(true);

        try {
            const file = event.target.files?.[0];

            if (!file) {
                warningAlert(
                    dispatch,
                    'Фотографи не загрузилась'
                );

                return;
            };
            
            if (!validImageTypes.includes(file.type)) {
                infoAlert(
                    dispatch,
                    'Неправильный формат фотографии'
                );

                return;
            };
            
            if (file.size > maxImgSize) {
                infoAlert(
                    dispatch,
                    'Фотография превышает максимально разрешённый размер',
                );

                return;
            };

            await safeProcessFile(file);

        } catch {
            warningAlert(
                dispatch,
                'Произошла ошибка при обработке файла'
            );
        } finally {
            if (event.target) {
                event.target.value = '';
            };

            setIsProcessing(false);
        }
    };

 // Обновленный метод обработки файла с повторными попытками
    const safeProcessFile = (file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Используем URL.createObjectURL вместо FileReader для более надежной работы
            try {
                const objectUrl = URL.createObjectURL(file);
                const img = new Image();
                
                img.onload = () => {
                    // В URL.createObjectURL нет прямого контента для передачи в Cropper,
                    // поэтому все же создаем dataURL в безопасном режиме
                    createSafeDataUrl(file)
                        .then(dataUrl => {
                            // Освобождаем объектный URL, он больше не нужен
                            URL.revokeObjectURL(objectUrl);
                            
                            // Устанавливаем значения через setTimeout для асинхронности
                            setTimeout(() => {
                                setPhoto(dataUrl);
                                setOpen(true);
                                resolve();
                            }, 50);
                        })
                        .catch(err => {
                            URL.revokeObjectURL(objectUrl);
                            reject(err);
                        });
                };
                
                img.onerror = () => {
                    URL.revokeObjectURL(objectUrl);
                    infoAlert(dispatch, 'Ошибка при загрузке изображения');
                    reject(new Error('Ошибка загрузки изображения'));
                };
                
                // Устанавливаем таймаут для обработки изображения
                const timeout = setTimeout(() => {
                    img.onerror = null;
                    URL.revokeObjectURL(objectUrl);
                    reject(new Error('Таймаут загрузки изображения'));
                }, 10000); // 10 секунд макс
                
                img.onload = () => {
                    clearTimeout(timeout);
                    img.onload = null;
                    
                    // В URL.createObjectURL нет прямого контента для передачи в Cropper,
                    // поэтому все же создаем dataURL в безопасном режиме
                    createSafeDataUrl(file)
                        .then(dataUrl => {
                            // Освобождаем объектный URL, он больше не нужен
                            URL.revokeObjectURL(objectUrl);
                            
                            // Устанавливаем значения через setTimeout для асинхронности
                            setTimeout(() => {
                                setPhoto(dataUrl);
                                setOpen(true);
                                resolve();
                            }, 50);
                        })
                        .catch(err => {
                            URL.revokeObjectURL(objectUrl);
                            reject(err);
                        });
                };
                
                img.src = objectUrl;
            } catch (error) {
                reject(error);
            }
        });
    };

    // Создает dataURL с повторными попытками
    const createSafeDataUrl = (file: File, attempts = 3): Promise<string> => {
        return new Promise((resolve, reject) => {
            let currentAttempt = 0;
            
            const tryReadFile = () => {
                currentAttempt++;
                const reader = new FileReader();
                
                reader.onload = () => {
                    if (reader.result) {
                        resolve(reader.result as string);
                    } else {
                        handleReadError();
                    }
                };
                
                reader.onerror = handleReadError;
                
                function handleReadError() {
                    reader.onload = null;
                    reader.onerror = null;
                    
                    if (currentAttempt < attempts) {
                        console.log(`Повторная попытка чтения файла ${currentAttempt} из ${attempts}`);
                        // Небольшая задержка перед повторной попыткой
                        setTimeout(tryReadFile, 300);
                    } else {
                        reject(new Error(`Не удалось прочитать файл после ${attempts} попыток`));
                    }
                }
                
                // Устанавливаем таймаут
                const timeout = setTimeout(() => {
                    handleReadError();
                }, 3000);
                
                reader.onload = () => {
                    clearTimeout(timeout);
                    if (reader.result) {
                        resolve(reader.result as string);
                    } else {
                        handleReadError();
                    }
                };
                
                try {
                    // Запускаем чтение файла
                    reader.readAsDataURL(file);
                } catch (error) {
                    clearTimeout(timeout);
                    handleReadError();
                }
            };
            
            // Начинаем первую попытку
            tryReadFile();
        });
    };

    return (
        <>
            <li className="photos__item add">
                <input
                    className="btn"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
                <img src={SvgAdd} alt="camera" />
            </li>
            <PhotosCropperDialog
                open={open}
                setOpen={setOpen}
                photo={photo}
                handleAdd={props.handleAdd}
            />
        </>
    )
}

export default PhotosAddItem;
