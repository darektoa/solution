class FooterBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `© 2020 dhona.dwi`;
    }
}
customElements.define("footer-bar", FooterBar);