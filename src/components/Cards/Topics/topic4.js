import basicTopic from "./basicTopic";

export default class topic4 extends basicTopic {
    constructor() {
        super({
            name: "topic4",
            yellow: 1,
            red: 1
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new topic4());
        }
        return cards;
    }
}