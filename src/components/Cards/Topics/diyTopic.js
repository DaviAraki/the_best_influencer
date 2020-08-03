import basicTopic from "./basicTopic";

export default class diyTopic extends basicTopic {
    constructor() {
        super({
            name: "diyTopic",
            green: 2,
            red: 1
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new diyTopic());
        }
        return cards;
    }
}