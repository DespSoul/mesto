export default class Section {
  constructor({ items, renderer }, sectionSelector,) {
    this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  render() {
    this._items.forEach(item => {
      const card = this._renderer(item)
      this.addItem(card);
    });
  }

  addItem(element) {
    this._section.prepend(element);
  }
}
