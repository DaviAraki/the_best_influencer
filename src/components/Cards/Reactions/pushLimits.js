import basicReaction from "./basicReaction";

export default class pushLimits extends basicReaction {
    constructor() {
        super({
            name: "Pushing Limits",
            green: { reports: 0, likes: 1 },
            yellow: { reports: 0, likes: 1 },
            red: { reports: 0, likes: 3 },
            use: 2,
            textBox:"Target Player: 🟥"
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new pushLimits());
        }
        return cards;
    }
}