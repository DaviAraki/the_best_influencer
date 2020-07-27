import basicReaction from "./basicReaction";

export default class boldClaim extends basicReaction {
    constructor() {
        super({
            name: "Bold Claim",
            green: { reports: 0, Likes: 0 },
            yellow: { reports: 1, Likes: 0 },
            red: { reports: 1, Likes: 0 },
            use: 11
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new boldClaim());
        }
        return cards;
    }
}