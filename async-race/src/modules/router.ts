import {
  carList, control, header, main, winners,
} from '../index';

export function getRoute(): void {
  header.arrLinks.forEach((el) => {
    (location.hash == el.getAttribute('href')) ? el.classList.add('active')
      : el.classList.remove('active');
  });
  if (location.hash == '') header.arrLinks[0].classList.add('active');

  main.element.innerHTML = '';
  const currentRouteName: string = window.location.hash.slice(1);

  const defaultRoute = {
    name: 'garage',
    component: () => {
      main.element.innerHTML = '<h1>RACE</h1>';
      main.element.appendChild(control.element);
      carList.render();
    },
  };

  const routing = [{
    name: 'winners',
    component: () => {
      control.resetCars();
      winners.render();
      main.element.appendChild(winners.element);
    },
  },
  ];

  const currentRoute = routing.find((p) => p.name === currentRouteName);
  (currentRoute || defaultRoute).component();
}
