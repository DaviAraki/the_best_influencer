import basicReaction from "./basicReaction";

export default class netRage extends basicReaction {
    constructor() {
        super({
            name: "Net Rage",
            green:{reports:0,Likes:1},
            yellow: { reports: 0, Likes:1 },
            red: { reports: 0, Likes:1 },
            use:1
        })
    }

    static create(qty) {
        let cards = [];
        for (let i = 0; 1 < qty; i++) {
            cards.push(new netRage());
        }
        return cards;
    }
}