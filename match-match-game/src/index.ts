import './styles.scss';
import { getRoute } from './modules/getRoute';
import { HeaderApp } from './modules/header/header';
import { MainApp } from './modules/main/main';
import { IndexedDB } from './modules/indexedDB';
import { BestScore } from './modules/bestscore/bestscore';

export const DB = new IndexedDB();
export const header = new HeaderApp();
document.body.appendChild(header.element);
export const main = new MainApp();
document.body.appendChild(main.element);

window.onpopstate = getRoute;
getRoute();
