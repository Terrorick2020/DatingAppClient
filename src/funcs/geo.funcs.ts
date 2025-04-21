import { type SendGeoData } from '@/types/profile.types';


export async function requestGeolocation(): Promise<SendGeoData | null> {
    if (!('geolocation' in navigator)) {
        console.error('Geolocation не поддерживается браузером')
        return null
    }

    return new Promise((resolve, _) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                resolve({ latitude, longitude, enableGeo: true })
            },
            error => {
                console.warn('Геолокация отклонена или ошибка:', error)
                resolve(null)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    })
}
