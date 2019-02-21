import Spell from "../models/spell.js";

function formatUrl(url) {
    return '//bcw-getter.herokuapp.com/?url=' + encodeURIComponent(url)
}
let _spellApi = axios.create({
    baseURL: ''
})

let _sandbox = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Clair/spells/'
})

let _state = {
    spellsApi: [],
    activeSpell: {},
    mySpellBook: []
}

let _subscribers = {
    spellsApi: [],
    activeSpell: [],
    mySpellBook: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

export default class SpellService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get SpellsApi() {
        return _state.spellsApi.map(s => new Spell(s))
    }

    get ActiveSpell() {
        return _state.activeSpell
    }

    get MySpellBook() {
        return _state.mySpellBook.map(s => new Spell(s))
    }

    getSpellData() {
        _spellApi.get(formatUrl('http://dnd5eapi.co/api/spells/'))
            .then(res => {
                setState('spellsApi', res.data.results)
            })
    }

    getDetails(url) {
        _spellApi.get(formatUrl(url))
            .then(res => {
                let data = new Spell(res.data)
                setState('activeSpell', data)
            })
    }

    getMySpellbook() {
        _sandbox.get('')
            .then(res => {
                let data = res.data.data.map(d => new Spell(d))
                setState('mySpellBook', data)
            })
    }

    addSpell() {
        let spell = _state.activeSpell
        if (spell) {
            _sandbox.post('', spell)
                .then(res => {
                    this.getMySpellbook()
                })
        }
    }
    removeSpell(id) {
        _sandbox.delete(id)
            .then(res => {
                this.getMySpellbook()
            })
    }
}
