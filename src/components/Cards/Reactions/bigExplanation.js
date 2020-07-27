import basicReaction from "./basicReaction";

export default class bigExplanation extends basicReaction {
    constructor() {
        super({
            name: "Big Explanation",
            green: { reports: 0, Likes: 0 },
            yellow: { reports: 1, Likes: 0 },
            red: { reports: 2, Likes: 0 },
            use: 4
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new bigExplanation());
        }
        return cards;
    }
}