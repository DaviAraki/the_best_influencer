import basicTopic from "./basicTopic";

export default class boldMemeTopic extends basicTopic {
    constructor() {
        super({
            name: "boldMemeTopic",
            yellow: 2,
            red: 1,
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new boldMemeTopic());
        }
        return cards;
    }
}