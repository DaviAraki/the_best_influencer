import basicReaction from "./basicReaction";

export default class socialNetwork extends basicReaction {
    constructor() {
        super({
            name: "Social Network",
            green: { reports: 0, likes: 0 },
            yellow: { reports: 2, likes: 0 },
            red: { reports: 2, likes: 0 },
            use: 6
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new socialNetwork());
        }
        return cards;
    }
}