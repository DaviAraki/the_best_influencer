import basicTopic from "./basicTopic";

export default class topic5 extends basicTopic {
    constructor() {
        super({
            name: "topic5",
            green:1 ,
            yellow: 1
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new topic5());
        }
        return cards;
    }
}