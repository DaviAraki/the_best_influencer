import basicReaction from "./basicReaction";

export default class webForgives extends basicReaction {
    constructor() {
        super({
            name: "Web Forgives",
            green: { reports: 0, likes: 1 },
            yellow: { reports: 0, likes: 1 },
            red: { reports: 0, likes: 1 },
            use: 7,
            textBox:"All players: -🚫🚫" 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new webForgives());
        }
        return cards;
    }
}