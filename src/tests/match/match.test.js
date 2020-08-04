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
import {playCard, pass, draw, shuffleDeck, shuffleTopic,chooseTopic, endPlayerTurn} from "../../Game"

const iTreta = ProcessGameConfig({
    ssetup: () => ({
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
            deck: [].concat(bigExplanation.create(2), boldClaim.create(2), exposed.create(2), goodWill.create(2), lowComent.create(2), netForgives.create(2), netRage.create(2), pushLimits.create(2), redemption.create(2), socialNetwork.create(2), webForgives.create(2), webRage.create(2)),
            discardPile: [],
            discartedTopics: []
        },
    }),
    endIf: (G, ctx) => {
        if (G.players[ctx.currentPlayer].likes > 15) {
            return { winner: G.players[ctx.currentPlayer] }
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
            moves: { playCard, pass, chooseTopic }
        }
    },
    moves: {
        playCard,
        pass,
        chooseTopic,
    },

});
const safePlayer= (G,ctx) => {
    let moves =[{move:'pass',args:null}];

    for(let i=0; i<G.players[ctx.currentPlayer].hand.length; i++){
        moves.push({move:'playCard', args:[i]});
    }
}