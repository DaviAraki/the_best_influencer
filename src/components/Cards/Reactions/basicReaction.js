import generateUniqueId from "../../../utils/generateUniqueId"

export default class BasicReaction {
    constructor(data) {
        this.id = generateUniqueId();
        this.name = data.name;
        this.red = data.red || {reports:0, likes:0};
        this.yellow = data.yellow || { reports: 0, likes: 0 };
        this.green = data.green || { reports: 0, likes: 0 };
        this.use = data.use || 0;
        this.textBox = data.textBox || " "

    }
}