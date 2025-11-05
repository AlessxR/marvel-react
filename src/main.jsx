import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './components/app/App';

import './style/style.scss';

import MarvelService from './services/MarvelService';

const marvelService = new MarvelService();

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
