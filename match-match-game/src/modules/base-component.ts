export class BaseComponent {
  element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], content?: string) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    if (content) this.element.innerHTML = `${content}`;
  }

  destroy() {
    this.element.remove();
  }

  clear() {
    this.element.innerHTML = '';
  }
}
