import basicReaction from "./basicReaction";

export default class pushLimits extends basicReaction {
    constructor() {
        super({
            name: "Pushing Limits",
            green: { reports: 0, Likes: 1 },
            yellow: { reports: 0, Likes: 1 },
            red: { reports: 0, Likes: 3 },
            use: 2
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