class LoadingBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="preloader">
        <div class="loading">
          <img src="/src/poi.gif" width="80">
          <p>Harap Tunggu</p>
        </div>
        </div>`;
  }
}
customElements.define("loading-bar", LoadingBar);
