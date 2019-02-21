export default class Spell {
  constructor(data) {
    this._id = data._id || data.id
    this.name = data.name
    this.description = data.description || data.desc
    this.duration = data.duration
    this.level = data.level
    this.url = data.url
    this.range = data.range
    this.index = data.index
  }
  getTemplate(button) {
    return `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Duration: ${this.duration} -- Range: ${this.range}</h6>
            <h6>Level: ${this.level}</h6>
            <p class="card-text">${this.description}</p>
            ${button}
          </div>
        </div>
        `
  }
}