import './styles.scss';
import { Header } from './modules/header/header';
import { MainApp } from './modules/main/main';
import { getRoute } from './modules/router';
import { ModelApp } from './modules/model';
import { ControlPanel } from './modules/toolbar/toolbar';
import { CarList } from './modules/carsList/carsList';
import { Winners } from './modules/winners/winners';
import { Modal } from './modules/raceResult/raceResult';

export const BASE_HOST = 'http://127.0.0.1:3000';

export const model = new ModelApp();
export const header = new Header();
export const main = new MainApp();
export const control = new ControlPanel();
export const carList = new CarList();
export const winners = new Winners();
export const modal = new Modal();

window.onpopstate = getRoute;
getRoute();
