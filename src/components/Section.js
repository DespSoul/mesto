export default class Section {
  constructor({ renderer }, sectionSelector) {
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems(data) {
    const arrayCards = data.reverse()
    arrayCards.forEach((item) => {
      const card = this._renderer(item);
      this.addItem(card);
    });
  }

  addItem(element) {
    this._section.prepend(element);
  }
}
