import basicReaction from "./basicReaction";

export default class webForgives extends basicReaction {
    constructor() {
        super({
            name: "Web Forgives",
            green: { reports: 0, Likes: 1 },
            yellow: { reports: 0, Likes: 1 },
            red: { reports: 0, Likes: 1 },
            use: 7
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