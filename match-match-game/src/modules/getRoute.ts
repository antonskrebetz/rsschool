import { Settings } from './settings/settings';
import { Game } from './play/play';
import { main } from '../index';
import { userSettings } from './user-settings';
import { About } from './about/about';
import { BestScore } from './bestscore/bestscore';

export function getRoute(): void {
  main.element.innerHTML = '';
  const currentRouteName: string = window.location.hash.slice(1);
  const container: HTMLElement | null = main.element;
  const menuElement: NodeListOf<HTMLElement> = document.querySelectorAll('a');
  if (!container) throw Error('Main not found');
  menuElement.forEach((el: HTMLElement) => {
    el.classList.remove('active');
    const elH: string | null = el.getAttribute('href');
    if (elH?.replace('#', '') === currentRouteName) el.classList.add('active');
  });
  if (currentRouteName === '') menuElement[0].classList.add('active');

  const defaultRoute = {
    name: 'about',
    component: () => {
      const about = new About();
      main.element.appendChild(about.element);
    },
  };
  const routing = [{
    name: 'settings',
    component: () => {
      const settings = new Settings();
      main.element.appendChild(settings.element);
    },
  },
  {
    name: 'bestscore',
    component: () => {
      const bestscore = new BestScore();
      main.element.appendChild(bestscore.element);
    },
  },
  {
    name: 'play',
    component: () => {
      if (userSettings.registered) {
        const abb = new Game('1', '2', '3', userSettings.dificculty, 'def1', userSettings.cardStyle);
      } else main.element.innerHTML = 'You must first register';
    },
  },
  ];

  const currentRoute = routing.find((p) => p.name === currentRouteName);

  (currentRoute || defaultRoute).component();
}
