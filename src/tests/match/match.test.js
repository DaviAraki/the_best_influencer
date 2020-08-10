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
import {playCard, pass, draw, shuffleDeck, shuffleTopic,chooseTopic,dealTopics, endPlayerTurn, skip} from "../../Game"
const fs = require('fs');

const iTreta = ProcessGameConfig({
    setup: () => ({
        players: [
            {
                id: "safePlayer",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0,
                eliminated: false
            },
            {
                id: "balancedPlayer",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0,
                eliminated: false
            },
            {
                id: "boldPlayer",
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0,
                eliminated: false
            },
            // {
            //     id: "MCTS",
            //     hand: [],
            //     board: { red: [], yellow: [], green: [] },
            //     likes: 0,
            //     reports: 0,
            //     eliminated: false
            // }
        ],
        offer: {
            topics: [].concat(boldMemeTopic.create(2), diyTopic.create(2), dogTopic.create(2), exposeTopic.create(2), hotPic.create(2), movieCriticTopic.create(2), nostalgicTopic.create(2), oddTopic.create(2), politicsTopic.create(2), topic1.create(2), topic2.create(2), topic3.create(2), topic4.create(2), topic5.create(2)),
            deck: [].concat(bigExplanation.create(10), boldClaim.create(10), exposed.create(10), goodWill.create(10), lowComent.create(10), netForgives.create(10), netRage.create(10), pushLimits.create(10), redemption.create(10), socialNetwork.create(10), webForgives.create(10), webRage.create(10)),
            discardPile: [],
            discartedTopics: [],
            topicsOffer: [],
            activePlayers: [0, 1, 2]
        },
    }),
    endIf: (G, ctx) => {
        if ((G.players[ctx.currentPlayer].likes > 10) && (!G.players[ctx.currentPlayer].eliminated)) {
            ctx.events.endPhase()
            return { winner: ctx.currentPlayer,
                     P0Likes: G.players[0].likes,
                     P0Reports: G.players[0].reports, 
                     P1Likes: G.players[1].likes,
                     P1Reports: G.players[1].reports,
                     P2Likes: G.players[2].likes,
                     P2Reports: G.players[2].reports
                    }
        }
        if (G.offer.activePlayers.length < 2) {
            if (G.offer.activePlayers.length === 1) {
                return { winner: G.offer.activePlayers[0],
                        P0Likes: G.players[0].likes,
                        P0Reports: G.players[0].reports,
                        P1Likes: G.players[1].likes,
                        P1Reports: G.players[1].reports,
                        P2Likes: G.players[2].likes,
                        P2Reports: G.players[2].reports }
            }
            else return { draw: true }
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
                        moves: { chooseTopic, skip },
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
    if (ctx.phase !== null) {
        if (G.players[ctx.currentPlayer].eliminated === true) {
            moves.push({ move: 'skip', args: null })
        } else
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
            // for(let i=0; i<G.players[ctx.currentPlayer].hand.length; i++){
            //     moves.push({move:'playCard', args:([i,0])});
            // }
            moves.push({move:'pass', args:null})
        }
    }
    return moves;
}
const balancedPlayer = (G, ctx) => {
    let moves = [];
    if (ctx.phase !== null) {
        if (G.players[ctx.currentPlayer].eliminated === true) {
            moves.push({ move: 'skip', args: null })
        } else
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
            // for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
            //     moves.push({ move: 'playCard', args: ([i,0]) });
            // }
            moves.push({ move: 'pass', args: null })
        }
    }
    return moves;
}
const boldPlayer = (G, ctx) => {
    let moves = [];

    if(ctx.phase !== null){
        if(G.players[ctx.currentPlayer].eliminated===true){
            moves.push({ move: 'skip', args: null })
        }else
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
            // for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
            //     moves.push({ move: 'playCard', args: ([i,0]) });
            // }
            moves.push({ move: 'pass', args: null })
        }
    }
    return moves;
}
const enumerate = (G, ctx) => {
    let moves = [];
    if (ctx.phase !== null) {
        if (ctx.activePlayers[ctx.currentPlayer] === "topicSelection") {
            for (let i = 0; i < G.offer.topicsOffer.length; i++) {
            moves.push({ move: 'chooseTopic', args: [i] })
            }
        }
        if (ctx.activePlayers[ctx.currentPlayer] === "playStage") {
            // for (let i = 0; i < G.players[ctx.currentPlayer].hand.length; i++) {
            //     moves.push({ move: 'playCard', args: ([i,0]) });
            // }
            moves.push({ move: 'pass', args: null })
        }
    }
    return moves;
}
const bots = {
    '0' : new RandomBot({ 'seed': 'test', game: iTreta, enumerate:safePlayer}),
    '1' : new RandomBot({ 'seed': 'test', game: iTreta, enumerate:balancedPlayer}),
    '2' : new RandomBot({ 'seed': 'test', game: iTreta, enumerate:boldPlayer}),
    //'3' : new MCTSBot({ 'seed': 'test', game: iTreta, enumerate, iterations: 20 }),
}


it('should run', async () => {
    let P0Reports, P0Likes, P0Wins, P1Reports, P1Likes, P1Wins, P2Reports, P2Likes, P2Wins
    P0Wins = 0;
    P1Wins = 0;
    P2Wins = 0;
    P0Reports = 0;
    P0Likes = 0;
    P1Reports = 0;
    P1Likes = 0;
    P2Reports = 0;
    P2Likes = 0
    for (let i = 0; i < 500; i++) {
        expect(typeof Simulate).toBe('function');
        const state = InitializeGame({ game: iTreta, numPlayers: 3 });
        const { state: endState } = await Simulate({ game: iTreta, bots, state });
        expect(endState.ctx.gameover).not.toBeUndefined();
        if (endState.ctx.gameover.winner === 0 || endState.ctx.gameover.winner === "0" ){
            P0Wins = P0Wins +1
        } else if (endState.ctx.gameover.winner === 1 || endState.ctx.gameover.winner === "1" ){
            P1Wins = P1Wins +1
        }else{
            P2Wins = P2Wins +1
        }
        P0Reports = P0Reports + endState.ctx.gameover.P0Reports
        P1Reports = P1Reports + endState.ctx.gameover.P1Reports
        P2Reports = P2Reports + endState.ctx.gameover.P2Reports
        P0Likes = P0Likes + endState.ctx.gameover.P0Likes
        P1Likes = P1Likes + endState.ctx.gameover.P1Likes
        P2Likes = P2Likes + endState.ctx.gameover.P2Likes

        var data = await JSON.stringify(endState.ctx.gameover);
        expect(data).not.toBeUndefined
        fs.writeFile(("./public/match10l6r" + i + ".json"), data, (err) => {
            if (err) throw err;
        });
    }

    var resume = { P0Reports, P0Likes, P0Wins, P1Reports, P1Likes, P1Wins, P2Reports, P2Likes, P2Wins}
    var data2 = JSON.stringify(resume)
    expect(data2).not.toBeUndefined 
    fs.writeFile(("./public/resumes/match10l6rResume.json"), data2, (err) => {
        if (err) throw err;
    });
 
});