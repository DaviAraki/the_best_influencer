import basicReaction from "./basicReaction";

export default class boldClaim extends basicReaction {
    constructor() {
        super({
            name: "Bold Claim",
            green: { reports: 0, likes: 0 },
            yellow: { reports: 1, likes: 0 },
            red: { reports: 1, likes: 0 },
            use: 11,
            textBox:"Target Player: +🚫👍👍👍" 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new boldClaim());
        }
        return cards;
    }
}