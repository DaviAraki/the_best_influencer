import basicReaction from "./basicReaction";

export default class netRage extends basicReaction {
    constructor() {
        super({
            name: "Net Rage",
            green:{reports:0,likes:1},
            yellow: { reports: 0, likes:1 },
            red: { reports: 0, likes:1 },
            use:1,
            textBox:"All players: +🚫" 
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; i < qty; i++) {
            cards.push(new netRage());
        }
        return cards;
    }
}