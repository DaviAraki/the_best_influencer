import basicTopic from "./basicTopic";

export default class topic1 extends basicTopic{
    constructor(){
        super({
            name:"topic1",
            yellow:2
        })
    }

    static create(qty){
        let cards = [];
        for (let i = 0; 1<qty; i++){
            cards.push(new topic1());
        }
        return cards;
    }
}