import { Middleware } from '@reduxjs/toolkit';


const myMiddleware: Middleware = (_storeAPI) => (next) => (action) => {
    const result = next(action);
    return result;
}

export default myMiddleware;
