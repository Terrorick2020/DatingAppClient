import { Middleware } from '@reduxjs/toolkit';


const myMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    console.log( storeAPI )

    const result = next(action);

    return result;
}

export default myMiddleware;
