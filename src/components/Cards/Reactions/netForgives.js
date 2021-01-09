import basicReaction from "./basicReaction";

export default class netForgives extends basicReaction {
    constructor() {
        super({
            name: "Net Forgives",
            green: { reports: 0, likes: 0 },
            yellow: { reports: 1, likes: 0 },
            red: { reports: 2, likes: 0 },
            use: 10,
            textBox:"All players: -🚫" 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new netForgives());
        }
        return cards;
    }
}