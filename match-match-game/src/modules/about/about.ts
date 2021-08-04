import './about.scss';
import { BaseComponent } from '../base-component';

export class About extends BaseComponent {
  about: any;
  constructor() {
    super('div', ['about-frame']);

    this.about = `
      <div class="about">
        <h1>How to play?</h1>
        <div class="about_item">
          <div class="text">
            <div class="num">1</div>
            <p>Register new player in game</p>
          </div>
          <div class="img">
            <img src="img/about/first.png" alt="">
          </div>
        </div>
        <div class="about_item">
          <div class="text">
            <div class="num">2</div>
            <p>Configure your game settings</p>
          </div>
          <div class="img">
            <img src="img/about/second.png" alt="">
          </div>
        </div>
        <div class="about_item">
          <div class="text">
            <div class="num">3</div>
            <p>Start you new game! Remember card positions!</p>
          </div>
          <div class="img">
            <img src="img/about/third.png" alt="">
          </div>
        </div>
      </div>
    `
    this.element.innerHTML = this.about;
  }
}
