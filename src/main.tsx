import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppInitor from './AppInitor';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppInitor />
  </StrictMode>
);
