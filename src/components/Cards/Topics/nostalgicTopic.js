import basicTopic from "./basicTopic";

export default class nostalgicTopic extends basicTopic {
    constructor() {
        super({
            name: "nostalgicTopic",
            green:2,
            yellow: 1

        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new nostalgicTopic());
        }
        return cards;
    }
}