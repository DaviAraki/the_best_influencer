import basicTopic from "./basicTopic";

export default class exposeTopic extends basicTopic {
    constructor() {
        super({
            name: "exposeTopic",
            red: 2,
            green: 1
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new exposeTopic());
        }
        return cards;
    }
}