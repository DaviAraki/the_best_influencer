import basicTopic from "./basicTopic";

export default class politicsTopic extends basicTopic {
    constructor() {
        super({
            name: "politicsTopic",
            red: 3
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new politicsTopic());
        }
        return cards;
    }
}