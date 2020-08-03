import basicTopic from "./basicTopic";

export default class dogTopic extends basicTopic {
    constructor() {
        super({
            name: "dogTopic",
            green: 3, 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new dogTopic());
        }
        return cards;
    }
}