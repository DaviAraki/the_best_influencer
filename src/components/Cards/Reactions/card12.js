import basicReaction from "./basicReaction";

export default class webRage extends basicReaction {
    constructor() {
        super({
            name: "Web Rage",
            green: { reports: 0, likes: 1 },
            yellow: { reports: 0, likes: 1 },
            red: { reports: 0, likes: 3 },
            use: 8,
            textBox:"Target Player: +🟩 -🚫" ,
            sheet:"🃏👍🚫🟩🟨🟥"
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new webRage());
        }
        return cards;
    }
}