import bigExplanation from "./components/Cards/Reactions/bigExplanation"
import boldClaim from "./components/Cards/Reactions/boldClaim"
import exposed from "./components/Cards/Reactions/exposed"
import goodWill from "./components/Cards/Reactions/goodWill"
import lowComent from "./components/Cards/Reactions/lowComent"
import netForgives from "./components/Cards/Reactions/netForgives"
import netRage from "./components/Cards/Reactions/netRage"
import pushLimits from "./components/Cards/Reactions/pushLimits"
import redemption from "./components/Cards/Reactions/redemption"
import socialNetwork from "./components/Cards/Reactions/socialNetwork"
import webForgives from "./components/Cards/Reactions/webForgives"
import webRage from "./components/Cards/Reactions/webRage"
import boldMemeTopic from "./components/Cards/Topics/boldMemeTopic"
import diyTopic from "./components/Cards/Topics/diyTopic"
import dogTopic from "./components/Cards/Topics/dogTopic"
import exposeTopic from "./components/Cards/Topics/exposeTopic"
import hotPic from "./components/Cards/Topics/hotPic"
import movieCriticTopic from "./components/Cards/Topics/movieCriticTopic"
import nostalgicTopic from "./components/Cards/Topics/nostalgicTopic"
import oddTopic from "./components/Cards/Topics/oddTopic"
import politicsTopic from "./components/Cards/Topics/politicsTopic"
import topic1 from "./components/Cards/Topics/topic1"
import topic2 from "./components/Cards/Topics/topic2"
import topic3 from "./components/Cards/Topics/topic3"
import topic4 from "./components/Cards/Topics/topic4"
import topic5 from "./components/Cards/Topics/topic5"
import generateUniqueId from "./utils/generateUniqueId"

export const iTreta = {
    name: "iTreta",
    setup: () => ({
        players: [
            {
                id: "player1",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
            {
                id: "player2",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
            {
                id: "player3",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
            {
                id: "player4",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            }
        ],
        offer: {
            topics: [].concat(boldMemeTopic.create(2), diyTopic.create(2), dogTopic.create(2), exposeTopic.create(2), hotPic.create(2), movieCriticTopic.create(2), nostalgicTopic.create(2), oddTopic.create(2), politicsTopic.create(2), topic1.create(2), topic2.create(2), topic3.create(2), topic4.create(2), topic5.create(2)),
            deck: [].concat(bigExplanation.create(10), boldClaim.create(10), exposed.create(10), goodWill.create(10), lowComent.create(10), netForgives.create(10), netRage.create(10), pushLimits.create(10), redemption.create(10), socialNetwork.create(10), webForgives.create(10), webRage.create(10)),
            topicsOffer:[],
            discardPile: [],
            discartedTopics:[]
        },
        
    }),
    endIf: (G, ctx) => {
        if (G.players[ctx.currentPlayer].likes > 15) {

            ctx.events.endPhase()
            return { winner: ctx.currentPlayer }
        }
        if(G.players.length===1){
            return{ winner: G.players[0].id}
        }
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
                        moves: { chooseTopic },
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

        }
    },
    ai: {
        enumerate : (G, ctx) => {
            let moves = [];

            if (ctx.activePlayers[ctx.currentPlayer] === "topicSelection") {
                for (let i = 0; i < G.offer.topicsOffer.length; i++) {
                    moves.push({ move: 'chooseTopic', args: [i] })
                }
            }
            if (ctx.activePlayers[ctx.currentPlayer] === "playStage") {
                for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
                    moves.push({ move: 'playCard', args: ([i, 0]) });
                }
                moves.push({ move: 'pass', args: null })
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
function endPlayerTurn(G, ctx) {
    for (let i; i < G.players.length; i++) {
        if (G.players[i].reports > 6) {
            G.players.splice(i, 1)
            ctx.numPlayers = ctx.numPlayers - 1
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
}