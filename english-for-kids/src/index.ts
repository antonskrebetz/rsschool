import './styles.scss';
import { Header } from './modules/header/header';
import { Main } from './modules/main/main';
import { Footer } from './modules/footer/footer';

export const header = new Header();
document.body.appendChild(header.element);

export const main = new Main();
document.body.appendChild(main.element);

export const footer = new Footer();
document.body.appendChild(footer.element);
