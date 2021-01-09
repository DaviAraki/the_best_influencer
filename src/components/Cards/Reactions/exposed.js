import basicReaction from "./basicReaction";

export default class exposed extends basicReaction {
    constructor() {
        super({
            name: "Exposed",
            green: { reports: 0, likes: 0 },
            yellow: { reports: 1, likes: 0 },
            red: { reports: 1, likes: 0 },
            use: 5,
            textBox:"Current Player: -🚫🚫 Target player: +🚫" 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new exposed());
        }
        return cards;
    }
}