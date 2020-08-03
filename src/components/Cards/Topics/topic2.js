import basicTopic from "./basicTopic";

export default class topic2 extends basicTopic {
    constructor() {
        super({
            name: "topic2",
            green: 2
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new topic2());
        }
        return cards;
    }
}