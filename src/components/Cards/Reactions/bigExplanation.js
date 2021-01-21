import basicReaction from "./basicReaction";

export default class bigExplanation extends basicReaction {
    constructor() {
        super({
            name: "Big Explanation",
            green: { reports: 0, likes: 0 },
            yellow: { reports: 1, likes: 0 },
            red: { reports: 2, likes: 0 },
            use: 4,
            textBox:"Target Player: Gets a Green Reaction 🟩" 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new bigExplanation());
        }
        return cards;
    }
}