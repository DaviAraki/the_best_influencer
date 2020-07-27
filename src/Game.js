export const iTreta = {
    name: "iTreta",
    setup:() => ({
        players:[
            {
                id: generateUniqueId(),
                hand:[],
                board:{red:[],yellow:[],green:[]},
                likes: 0,
                reports:0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            }
        ],
        offer: {
            topics:[],
            deck:[]
        }
    }),
    moves:{
        playCard,
        pass,
        chooseTopic,
    },

};
function playCard(G, ctx, cardIndex, chosenPlayer){
    if(G.players[ctx.currentPlayer].hand[cardIndex].use=== 1){
        for(let i  =0 ;i< G.players.lenght; i++){
            if(G.players[i].reports>0){
                G.players[i].reports = G.players[i].reports - 1;
            }
        } 
    }
    if(G.players[ctx.currentPlayer].hand[cardIndex].use === 2 ){
        G.players[ctx.chosenPlayer].reports = G.players[chosenPlayer].reports + G.offer.deck[0].red.reports;
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + G.offer.deck[0].red.likes;
        G.players[chosenPlayer].board.red.push(
            G.offer.deck.shift()
        );
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 3) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + G.offer.deck[0].yellow.reports;
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + G.offer.deck[0].yellow.likes;
        G.players[chosenPlayer].board.yellow.push(
            G.offer.deck.shift()
        );
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 4) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + G.offer.deck[0].green.reports;
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + G.offer.deck[0].green.likes;
        G.players[chosenPlayer].board.green.push(
            G.offer.deck.shift()
        );
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 5) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + 1;
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 6) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports - 2;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 7) {
        for (let i = 0; i < G.players.lenght; i++) {
            if (G.players[i].reports > 0) {
                G.players[i].reports = G.players[i].reports - 2;
            }
        }
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 8) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + 2;
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 9) {
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + 3;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 10) {
        for (let i = 0; i < G.players.lenght; i++) {
            if (G.players[i].reports > 0) {
                G.players[i].reports = G.players[i].reports - 1;
            }
        }
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 11) {
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + 2;
    }
    if (G.players[currentPlayer].hand[cardIndex].use === 12) {
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + 4;
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + 1;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 13) {
        for (let i = 0; i < G.players.lenght; i++) {
           G.players[i].likes = G.players[i].likes + 1;          
        }
        G.players[ctx.currentPlayer].likes++
    }
}
function chooseTopic(G, ctx, topicIndex){
    for(let i = 0; i<G.offer.topics[topicIndex].green; i++){
        G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports + G.offer.deck[0].red.reports;
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + G.offer.deck[0].red.likes;
        G.players[ctx.currentPlayer].board.red.push(
            G.offer.deck.shift()
        );
    };
    for (let i = 0; i < G.offer.topics[topicIndex].yellow; i++) {
        G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports + G.offer.deck[0].yellow.reports;
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + G.offer.deck[0].yellow.likes
        G.players[ctx.currentPlayer].board.yellow.push(
            G.offer.deck.shift()
        );
    };
    for (let i = 0; i < G.offer.topics[topicIndex].green; i++) {
        G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports + G.offer.deck[0].green.reports;
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + G.offer.deck[0].green.likes
        G.players[ctx.currentPlayer].board.green.push(
            G.offer.deck.shift()
        );
    }
}
