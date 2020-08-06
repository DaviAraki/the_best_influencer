import bigExplanation from "../../components/Cards/Reactions/bigExplanation"
import boldClaim from "../../components/Cards/Reactions/boldClaim"
import exposed from "../../components/Cards/Reactions/exposed"
import goodWill from "../../components/Cards/Reactions/goodWill"
import lowComent from "../../components/Cards/Reactions/lowComent"
import netForgives from "../../components/Cards/Reactions/netForgives"
import netRage from "../../components/Cards/Reactions/netRage"
import pushLimits from "../../components/Cards/Reactions/pushLimits"
import redemption from "../../components/Cards/Reactions/redemption"
import socialNetwork from "../../components/Cards/Reactions/socialNetwork"
import webForgives from "../../components/Cards/Reactions/webForgives"
import webRage from "../../components/Cards/Reactions/webRage"
import boldMemeTopic from "../../components/Cards/Topics/boldMemeTopic"
import diyTopic from "../../components/Cards/Topics/diyTopic"
import dogTopic from "../../components/Cards/Topics/dogTopic"
import exposeTopic from "../../components/Cards/Topics/exposeTopic"
import hotPic from "../../components/Cards/Topics/hotPic"
import movieCriticTopic from "../../components/Cards/Topics/movieCriticTopic"
import nostalgicTopic from "../../components/Cards/Topics/nostalgicTopic"
import oddTopic from "../../components/Cards/Topics/oddTopic"
import politicsTopic from "../../components/Cards/Topics/politicsTopic"
import topic1 from "../../components/Cards/Topics/topic1"
import topic2 from "../../components/Cards/Topics/topic2"
import topic3 from "../../components/Cards/Topics/topic3"
import topic4 from "../../components/Cards/Topics/topic4"
import topic5 from "../../components/Cards/Topics/topic5"
import generateUniqueId from "../../utils/generateUniqueId"
import { Simulate } from 'boardgame.io/ai'
import { ProcessGameConfig } from 'boardgame.io/dist/cjs/internal'
import { RandomBot, MCTSBot } from 'boardgame.io/ai';
import { InitializeGame, CreateGameReducer } from 'boardgame.io/dist/cjs/internal';
import {playCard, pass, draw, shuffleDeck, shuffleTopic,chooseTopic,dealTopics, endPlayerTurn} from "../../Game"
import { Async } from "boardgame.io/dist/cjs/base-bdd9c13b"
const fs = require('fs');

const iTreta = ProcessGameConfig({
    setup: () => ({
        players: [
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
            topics: [].concat(boldMemeTopic.create(2), diyTopic.create(2), dogTopic.create(2), exposeTopic.create(2), hotPic.create(2), movieCriticTopic.create(2), nostalgicTopic.create(2), oddTopic.create(2), politicsTopic.create(2), topic1.create(2), topic2.create(2), topic3.create(2), topic4.create(2), topic5.create(2)),
            deck: [].concat(bigExplanation.create(5), boldClaim.create(5), exposed.create(5), goodWill.create(5), lowComent.create(5), netForgives.create(5), netRage.create(5), pushLimits.create(5), redemption.create(5), socialNetwork.create(5), webForgives.create(5), webRage.create(5)),
            discardPile: [],
            discartedTopics: [],
            topicsOffer: [],
        },
    }),
    endIf: (G, ctx) => {
        if (G.players[ctx.currentPlayer].likes > 15) {
            return { winner: G.players[ctx.currentPlayer] }
        }
        if(G.players.length < 2){
            return {winner: G.players[0]}
        }
    },

    phases: {
        setupPhase: {
            start: true,
            next: 'playPhase',
            onBegin: (G, ctx) => {
                shuffleDeck(G);
                shuffleTopic(G, ctx);
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
        finishPhase: {

        }
    },

});

const safePlayer= (G,ctx) => {
    let moves =[];

    if(ctx.activePlayers[ctx.currentPlayer]==="topicSelection"){ 
        let safeChoice = {red:0, yellow:0, green:0, index:0}
        for(let i=0; i<G.offer.topicsOffer.length ; i++){
            if(G.offer.topicsOffer[i].green>safeChoice.green){
                safeChoice.green = G.offer.topicsOffer[i].green
                safeChoice.yellow = G.offer.topicsOffer[i].yellow
                safeChoice.red = G.offer.topicsOffer[i].red
                safeChoice.index = i
            }
            else if (G.offer.topicsOffer[i].green === safeChoice.green){
                if (G.offer.topicsOffer[i].yellow < safeChoice.yellow){
                    safeChoice.green = G.offer.topicsOffer[i].green
                    safeChoice.yellow = G.offer.topicsOffer[i].yellow
                    safeChoice.red = G.offer.topicsOffer[i].red
                    safeChoice.index = i
                } else if (G.offer.topicsOffer[i].yellow === safeChoice.yellow){
                    if (G.offer.topicsOffer[i].red < safeChoice.red) {
                        safeChoice.green = G.offer.topicsOffer[i].green
                        safeChoice.yellow = G.offer.topicsOffer[i].yellow
                        safeChoice.red = G.offer.topicsOffer[i].red
                        safeChoice.index = i
                    }
                }
            }
        moves.push({move:'chooseTopic', args:[safeChoice.index]})    
        }
    }
    if(ctx.activePlayers[ctx.currentPlayer]==="playStage"){
        for(let i=0; i<G.players[ctx.currentPlayer].hand.length; i++){
            moves.push({move:'playCard', args:([i,0])});
        }
        moves.push({move:'pass', args:null})
    }
    return moves;
}
const balancedPlayer = (G, ctx) => {
    let moves = [];

    if (ctx.activePlayers[ctx.currentPlayer] === "topicSelection") {
        let balancedChoice = { red: 0, yellow: 0, green: 0, index: 0 }
        for (let i = 0; i < G.offer.topicsOffer.length; i++) {
            if (G.offer.topicsOffer[i].yellow > balancedChoice.yellow) {
                balancedChoice.green = G.offer.topicsOffer[i].green
                balancedChoice.yellow = G.offer.topicsOffer[i].yellow
                balancedChoice.red = G.offer.topicsOffer[i].red
                balancedChoice.index = i
            }
            else if (G.offer.topicsOffer[i].yellow === balancedChoice.yellow) {
                if (G.offer.topicsOffer[i].green > balancedChoice.green) {
                    balancedChoice.green = G.offer.topicsOffer[i].green
                    balancedChoice.yellow = G.offer.topicsOffer[i].yellow
                    balancedChoice.red = G.offer.topicsOffer[i].red
                    balancedChoice.index = i
                } else if (G.offer.topicsOffer[i].green === balancedChoice.green) {
                    if (G.offer.topicsOffer[i].red < balancedChoice.red) {
                        balancedChoice.green = G.offer.topicsOffer[i].green
                        balancedChoice.yellow = G.offer.topicsOffer[i].yellow
                        balancedChoice.red = G.offer.topicsOffer[i].red
                        balancedChoice.index = i
                    }
                }
            }
            moves.push({ move: 'chooseTopic', args: [balancedChoice.index] })
        }
    }
    if (ctx.activePlayers[ctx.currentPlayer] === "playStage") {
        for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
            moves.push({ move: 'playCard', args: ([i,0]) });
        }
        moves.push({ move: 'pass', args: null })
    }
    return moves;
}
const boldPlayer = (G, ctx) => {
    let moves = [];

    if (ctx.activePlayers[ctx.currentPlayer] === "topicSelection") {
        let boldChoice = { red: 0, yellow: 0, green: 0, index: 0 }
        for (let i = 0; i < G.offer.topicsOffer.length; i++) {
            if (G.offer.topicsOffer[i].red > boldChoice.red) {
                boldChoice.green = G.offer.topicsOffer[i].green
                boldChoice.yellow = G.offer.topicsOffer[i].yellow
                boldChoice.red = G.offer.topicsOffer[i].red
                boldChoice.index = i
            }
            else if (G.offer.topicsOffer[i].red === boldChoice.red) {
                if (G.offer.topicsOffer[i].yellow > boldChoice.yellow) {
                    boldChoice.green = G.offer.topicsOffer[i].green
                    boldChoice.yellow = G.offer.topicsOffer[i].yellow
                    boldChoice.red = G.offer.topicsOffer[i].red
                    boldChoice.index = i
                } else if (G.offer.topicsOffer[i].yellow === boldChoice.yellow) {
                    if (G.offer.topicsOffer[i].green > boldChoice.green) {
                        boldChoice.green = G.offer.topicsOffer[i].green
                        boldChoice.yellow = G.offer.topicsOffer[i].yellow
                        boldChoice.red = G.offer.topicsOffer[i].red
                        boldChoice.index = i
                    }
                }
            }
            moves.push({ move: 'chooseTopic', args: [boldChoice.index] })
        }
    }
    if (ctx.activePlayers[ctx.currentPlayer] === "playStage") {
        for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
            moves.push({ move: 'playCard', args: ([i,0]) });
        }
        moves.push({ move: 'pass', args: null })
    }
    return moves;
}
const enumerate = (G, ctx) => {
    let moves = [];

    if (ctx.activePlayers[ctx.currentPlayer] === "topicSelection") {
        for (let i = 0; i < G.offer.topicsOffer.length; i++) {
           moves.push({ move: 'chooseTopic', args: [i] })
        }
    }
    if (ctx.activePlayers[ctx.currentPlayer] === "playStage") {
        for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
            moves.push({ move: 'playCard', args: ([i,0]) });
        }
        moves.push({ move: 'pass', args: null })
    }
    return moves;
}
const bots = {
    '0' : new RandomBot({ 'seed': 'test', game: iTreta, enumerate:safePlayer}),
    '1' : new RandomBot({ 'seed': 'test', game: iTreta, enumerate:balancedPlayer}),
    '2' : new RandomBot({ 'seed': 'test', game: iTreta,enumerate:boldPlayer}),
    '3' : new MCTSBot({ 'seed': 'test', game: iTreta, enumerate, iterations: 200 }),
}
it('should run', async() => {

    expect(typeof Simulate).toBe('function');
    const state = InitializeGame({ game: iTreta, numPlayers: 4 });
    const { state: endState } = await Simulate({ game: iTreta, bots, state });
    expect(endState.ctx.gameover).not.toBeUndefined();

    var data =  await JSON.stringify(endState); 
    fs.writeFile("./public/teste.json", data, (err) => {
        if (err) throw err;
    });
    expect(data).not.toBeUndefined
});