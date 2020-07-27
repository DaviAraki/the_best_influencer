import basicReaction from "./basicReaction";

export default class netForgives extends basicReaction {
    constructor() {
        super({
            name: "Net Forgives",
            green: { reports: 0, Likes: 0 },
            yellow: { reports: 1, Likes: 0 },
            red: { reports: 2, Likes: 0 },
            use: 10
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new netForgives());
        }
        return cards;
    }
}