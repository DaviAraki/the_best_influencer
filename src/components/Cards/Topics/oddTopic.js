import basicTopic from "./basicTopic";

export default class oddTopic extends basicTopic {
    constructor() {
        super({
            name: "oddTopic",
            green: 1,
            yellow: 1,
            red: 1
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new oddTopic());
        }
        return cards;
    }
}