import '../commonStyles.scss';
import './footer.scss';
import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
  footerAuthor: BaseComponent;

  footerLogo: BaseComponent;

  constructor() {
    super('footer', ['footer']);

    const container = new BaseComponent('div', ['container'], null, null, null, this.element);
    const footerWrapper = new BaseComponent('div', ['footer_wrapper'], null, null, null, container.element);
    this.footerAuthor = new BaseComponent('a', ['footer_author'],
      'Anton Skrebetz © 2021', 'href', 'https://github.com/antonskrebetz', footerWrapper.element);
    this.footerLogo = new BaseComponent('a', ['footer_logo'],
      null, 'href', 'https://rs.school/js/', footerWrapper.element);
  }
}
