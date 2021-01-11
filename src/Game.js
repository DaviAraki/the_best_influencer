
import {PlayerView} from 'boardgame.io/core'
import state from './utils/state';
import stripSecrets from './utils/strip-secrets'



export const iTreta = {
    name: "iTreta",  
    setup: () => state,
    endIf: (G, ctx) => {
        if ((G.players[ctx.currentPlayer].likes > 15)&(!G.players[ctx.currentPlayer].eliminated)) {
            ctx.events.endPhase()
            return { winner: ctx.currentPlayer }
        }
        if(G.offer.activePlayers.length<2){
            if(G.offer.activePlayers.length===1){
                return{ winner: G.offer.activePlayers[0]}
            }
            else return{draw : true}
        }
    },
    playerView: (G, ctx, playerID) => {
        return stripSecrets(G, playerID);
    },
    phases: {
        setupPhase: {
            start: true,
            next: 'playPhase',
            onBegin: (G, ctx) => {
                shuffleDeck(G);
                shuffleTopic(G,ctx);
                for (let i = 0; i < G.players.length; i++) {
                    while (G.players[i].hand.length < 5) {
                        G.players[i].hand.push(
                            G.offer.deck.shift()
                        )
                    }
                }
                ctx.events.endPhase()
            }
        },
        playPhase: {
            turn: {
                onBegin: (G, ctx) => {
                    dealTopics(G, ctx)
                },
                activePlayers: {
                    currentPlayer: 'topicSelection',
                },
                stages: {
                    topicSelection: {
                        next: 'playStage',
                        moves: { chooseTopic,skip },
                    },
                    playStage: {
                        moves: { playCard, pass },
                        next: 'topicSelection'
                    }
                }
            }, 
            next: 'finishPhase'
        },
        finishPhase:{

        },

        
    },
    ai: {
        enumerate : (G, ctx) => {
            let moves = [];

            if ((ctx.activePlayers !== null) && (ctx.phase !== null)) {
                if (ctx.activePlayers[ctx.currentPlayer] === "topicSelection" && G.players[ctx.currentPlayer].eliminated === false) {
                    for (let i = 0; i < G.offer.topicsOffer.length; i++) {
                        moves.push({ move: 'chooseTopic', args: [i] })
                    }
                }
                if (ctx.activePlayers[ctx.currentPlayer] === "playStage" && G.players[ctx.currentPlayer].eliminated === false) {
                    for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
                        moves.push({ move: 'playCard', args: ([i, 0]) });
                    }
                    moves.push({ move: 'pass', args: null })
                }
                if (G.players[ctx.currentPlayer].eliminated === true) {
                    moves.push({ move: 'skip', args: null })
                }
            }
            return moves;
            
        }
    },

};
function playCard(G, ctx, cardIndex, chosenPlayer) {
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 1) {
        for (let i = 0; i < G.players.length; i++) {
            G.players[i].reports = G.players[i].reports + 1;
        }
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 2) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + G.offer.deck[0].red.reports;
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + G.offer.deck[0].red.likes;
        G.players[chosenPlayer].board.red.push(
            G.offer.deck.shift()
        );
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 3) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + G.offer.deck[0].yellow.reports;
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + G.offer.deck[0].yellow.likes;
        G.players[chosenPlayer].board.yellow.push(
            G.offer.deck.shift()
        );
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 4) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + G.offer.deck[0].green.reports;
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + G.offer.deck[0].green.likes;
        G.players[chosenPlayer].board.green.push(
            G.offer.deck.shift()
        );
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 5) {
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + 1;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 6) {
        if (G.players[ctx.currentPlayer].reports > 0) {
            G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports - 1;
        }
        if (G.players[ctx.currentPlayer].reports > 0) {
            G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports - 1;
        }
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 7) {
        for (let i = 0; i < G.players.length; i++) {
            if (G.players[i].reports > 0) {
                G.players[i].reports = G.players[i].reports - 1;
            }
            if (G.players[i].reports > 0) {
                G.players[i].reports = G.players[i].reports - 1;
            }
        }
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 8) {
        for (let i = 0; i < G.players.length; i++) {
            G.players[i].reports = G.players[i].reports + 2;
        }
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 9) {
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + 3;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 10) {
        for (let i = 0; i < G.players.length; i++) {
            if (G.players[i].reports > 0) {
                G.players[i].reports = G.players[i].reports - 1;
            }
        }
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 13) {
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + 2;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 11) {
        G.players[chosenPlayer].likes = G.players[chosenPlayer].likes + 4;
        G.players[chosenPlayer].reports = G.players[chosenPlayer].reports + 1;
    }
    if (G.players[ctx.currentPlayer].hand[cardIndex].use === 12) {
        for (let i = 0; i < G.players.length; i++) {
            G.players[i].likes = G.players[i].likes + 1;
        }
        G.players[ctx.currentPlayer].likes++
    }
    G.offer.discardPile.push(
        G.players[ctx.currentPlayer].hand[cardIndex]
    );
    G.players[ctx.currentPlayer].hand.splice(cardIndex, 1)
    
}
function chooseTopic(G, ctx, topicIndex) {
    for (let i = 0; i < G.offer.topicsOffer[topicIndex].red; i++) {
        G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports + G.offer.deck[0].red.reports;
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + G.offer.deck[0].red.likes;
        G.players[ctx.currentPlayer].board.red.push(
            G.offer.deck.shift()
        );
    };
    for (let i = 0; i < G.offer.topicsOffer[topicIndex].yellow; i++) {
        G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports + G.offer.deck[0].yellow.reports;
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + G.offer.deck[0].yellow.likes
        G.players[ctx.currentPlayer].board.yellow.push(
            G.offer.deck.shift()
        );
    };
    for (let i = 0; i < G.offer.topicsOffer[topicIndex].green; i++) {
        G.players[ctx.currentPlayer].reports = G.players[ctx.currentPlayer].reports + G.offer.deck[0].green.reports;
        G.players[ctx.currentPlayer].likes = G.players[ctx.currentPlayer].likes + G.offer.deck[0].green.likes
        G.players[ctx.currentPlayer].board.green.push(
            G.offer.deck.shift()
        );
    }
    G.offer.discartedTopics.push(
        G.offer.topicsOffer[topicIndex]
    )
    G.offer.topicsOffer.splice(topicIndex,1);
    ctx.events.endStage();
}
function draw(G, ctx) {
    if (G.offer.deck.length === 0) {
        G.offer.deck = G.offer.discardPile;
        G.offer.discardPile = [];
        shuffleDeck(G, ctx)
    }
    if (G.offer.deck.length > 0) {
        G.players[ctx.currentPlayer].hand.push(
            G.offer.deck.shift()
        )
    }
}
function shuffleDeck(G) {
    G.offer.deck.sort(() => Math.random() - 0.5);
}
function shuffleTopic(G, ctx) {
    G.offer.topics.sort(() => Math.random() - 0.5);
}
function pass(G, ctx) {
    endPlayerTurn(G, ctx)
    ctx.events.endTurn()
}
function skip(G,ctx){
    ctx.events.endTurn()
}
function endPlayerTurn(G, ctx) {
    for (let i=0 ; i < G.players.length; i++) {
        if (G.players[i].reports > 5) {
            G.players[i].eliminated = true
            for(let o=0; o<G.offer.activePlayers.length; o++){
                if(G.offer.activePlayers[o]===i){
                    G.offer.activePlayers.splice(o,1)
                }
            }
        }
    }
}
function dealTopics(G, ctx){
    while(G.offer.topicsOffer.length<5){
        G.offer.topicsOffer.push(
            G.offer.topics.shift()
        )
    }
}


export {
    draw,
    shuffleDeck,
    shuffleTopic,
    playCard,
    chooseTopic,
    pass,
    endPlayerTurn,
    dealTopics,
    skip,
}