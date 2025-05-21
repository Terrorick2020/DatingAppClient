export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const WS_URL   = import.meta.env.VITE_WS_URL;

export const INITIAL_ENDPOINT = import.meta.env.VITE_INITIAL_ENDPOINT;

if(
    !BASE_URL ||
    !WS_URL   ||
    
    !INITIAL_ENDPOINT
) {
    throw Error('Hasn`t someone environments!');
}
