import basicReaction from "./basicReaction";

export default class redemption extends basicReaction {
    constructor() {
        super({
            name: "Redemption",
            green: { reports: 0, Likes: 0 },
            yellow: { reports: 2, Likes: 0 },
            red: { reports: 2, Likes: 0 },
            use: 6
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new redemption());
        }
        return cards;
    }
}