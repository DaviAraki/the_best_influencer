import basicTopic from "./basicTopic";

export default class topic3 extends basicTopic {
    constructor() {
        super({
            name: "topic3",
            red: 2
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new topic3());
        }
        return cards;
    }
}