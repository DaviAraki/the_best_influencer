import basicTopic from "./basicTopic";

export default class movieCriticTopic extends basicTopic {
    constructor() {
        super({
            name: "movieCriticTopic",
            yellow: 3
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new movieCriticTopic());
        }
        return cards;
    }
}