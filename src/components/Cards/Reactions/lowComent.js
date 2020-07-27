import basicReaction from "./basicReaction";

export default class lowComent extends basicReaction {
    constructor() {
        super({
            name: "Low Coment ",
            green: { reports: 0, Likes: 1 },
            yellow: { reports: 0, Likes: 3 },
            red: { reports: 0, Likes: 3 },
            use: 3
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new lowComent());
        }
        return cards;
    }
}