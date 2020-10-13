// const alamatImage = 'apa aja';

class ImgBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  //     <div class="caption center-align orange-text text-darken-4">
  //     <h3>Data Master</h3>
  //     <h5 class="light">Mencatat dan mengarsikan database secara maksimal.</h5>
  //   </div>
  render() {
    this.innerHTML = `
        <div class="slider">
        <ul class="slides">
          <li>
            <img src="https://crests.football-data.org/62.svg"> <!-- random image -->

          </li>
          <li>
            <img src="https://crests.football-data.org/58.svg"> <!-- random image -->
            
          </li>
          <li>
            <img src="https://crests.football-data.org/338.svg"> <!-- random image -->
            
          </li>
        </ul>
      </div>`

  }
}
customElements.define("img-bar", ImgBar);