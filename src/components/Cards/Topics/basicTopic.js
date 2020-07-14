import generateUniqueId from "../../../utils/generateUniqueId"

export default class BasicTopic {
    constructor(data){
        this.id = generateUniqueId();
        this.name = data.name;
        this.red = data.red || 0;
        this.yellow = data.yellow || 0;
        this.green = data.green || 0;

    }
}