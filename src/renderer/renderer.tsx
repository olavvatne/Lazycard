import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from './components/App';

import "./style.css";
 
ReactDOM.render(
    <MemoryRouter>
        <App />
    </MemoryRouter>,
    document.getElementById('app')
);