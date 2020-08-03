import basicReaction from "./basicReaction";

export default class goodWill extends basicReaction {
    constructor() {
        super({
            name: "Good Will",
            green: { reports: 0, Likes: 1 },
            yellow: { reports: 0, Likes: 3 },
            red: { reports: 0, Likes: 3 },
            use: 9
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new goodWill());
        }
        return cards;
    }
}