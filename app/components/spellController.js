import SpellService from "./spellService.js";

let _ss = new SpellService()

function drawSpellApi() {
    let template = ''
    _ss.SpellsApi.forEach(s => {
        template += `
        <li onclick="app.controllers.spellController.getDetails('${s.url}')">${s.name}</li>
        `
    })
    document.querySelector('#api-spells').innerHTML = template
}

function drawActiveSpell() {
    let spell = _ss.ActiveSpell
    let button = `<button class="btn btn-success" onclick="app.controllers.spellController.addSpell()">Add to Spellbook</button>`
    let template = spell.getTemplate(button)
    document.querySelector('#active-spell').innerHTML = template
}

function drawSpellbook() {
    let template = ''
    let spells = _ss.MySpellBook
    spells.forEach(s => {
        let button = `<button class="btn btn-danger" onclick="app.controllers.spellController.removeSpell('${s._id}')">Remove</button>`
        template += s.getTemplate(button)
    })
    document.querySelector('#my-spellbook').innerHTML = template
}

export default class SpellController {
    constructor() {
        _ss.addSubscriber('spellsApi', drawSpellApi)
        _ss.addSubscriber('activeSpell', drawActiveSpell)
        _ss.addSubscriber('mySpellBook', drawSpellbook)
        _ss.getSpellData()
        _ss.getMySpellbook()
    }

    getDetails(url) {
        _ss.getDetails(url)
    }

    addSpell() {
        _ss.addSpell()
    }

    removeSpell(id) {
        _ss.removeSpell(id)
    }
}