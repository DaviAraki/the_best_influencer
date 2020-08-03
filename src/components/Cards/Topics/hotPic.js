import basicTopic from "./basicTopic";

export default class hotPic extends basicTopic {
    constructor() {
        super({
            name: "hotPic",
            red: 2,
            yellow: 1,
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new hotPic());
        }
        return cards;
    }
}