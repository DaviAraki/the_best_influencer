import bigExplanation from "../components/Cards/Reactions/bigExplanation"
import boldClaim from "../components/Cards/Reactions/boldClaim"
import exposed from "../components/Cards/Reactions/exposed"
import goodWill from "../components/Cards/Reactions/goodWill"
import lowComent from "../components/Cards/Reactions/lowComent"
import netForgives from "../components/Cards/Reactions/netForgives"
import netRage from "../components/Cards/Reactions/netRage"
import pushLimits from "../components/Cards/Reactions/pushLimits"
import redemption from "../components/Cards/Reactions/redemption"
import socialNetwork from "../components/Cards/Reactions/socialNetwork"
import webForgives from "../components/Cards/Reactions/webForgives"
import webRage from "../components/Cards/Reactions/webRage"
import boldMemeTopic from "../components/Cards/Topics/boldMemeTopic"
import diyTopic from "../components/Cards/Topics/diyTopic"
import dogTopic from "../components/Cards/Topics/dogTopic"
import exposeTopic from "../components/Cards/Topics/exposeTopic"
import hotPic from "../components/Cards/Topics/hotPic"
import movieCriticTopic from "../components/Cards/Topics/movieCriticTopic"
import nostalgicTopic from "../components/Cards/Topics/nostalgicTopic"
import oddTopic from "../components/Cards/Topics/oddTopic"
import politicsTopic from "../components/Cards/Topics/politicsTopic"
import topic1 from "../components/Cards/Topics/topic1"
import topic2 from "../components/Cards/Topics/topic2"
import topic3 from "../components/Cards/Topics/topic3"
import topic4 from "../components/Cards/Topics/topic4"
import topic5 from "../components/Cards/Topics/topic5"
import generateUniqueId from "../utils/generateUniqueId"

export default{

    players: [
        {
            name:"Player 1",
            playerID: "0",
            hand: [],
            board: { red: [], yellow: [], green: [] },
            likes: 0,
            reports: 0,
            eliminated: false
        },
        {
            name:"Player 2",
            playerID: "1",
            hand: [],
            board: { red: [], yellow: [], green: [] },
            likes: 0,
            reports: 0,
            eliminated: false
        },
        {
            name:"Player 3",
            playerID: "2",
            hand: [],
            board: { red: [], yellow: [], green: [] },
            likes: 0,
            reports: 0,
            eliminated: false
        },
        {
            name:"Player 4",
            playerID: "3",
            hand: [],
            board: { red: [], yellow: [], green: [] },
            likes: 0,
            reports: 0,
            eliminated: false
        }
    ],
    offer: {
        topics: [].concat(boldMemeTopic.create(2), diyTopic.create(2), dogTopic.create(2), exposeTopic.create(2), hotPic.create(2), movieCriticTopic.create(2), nostalgicTopic.create(2), oddTopic.create(2), politicsTopic.create(2), topic1.create(2), topic2.create(2), topic3.create(2), topic4.create(2), topic5.create(2)),
        deck: [].concat(bigExplanation.create(10), boldClaim.create(10), exposed.create(10), goodWill.create(10), lowComent.create(10), netForgives.create(10), netRage.create(10), pushLimits.create(10), redemption.create(10), socialNetwork.create(10), webForgives.create(10), webRage.create(10)),
        topicsOffer:[],
        discardPile: [],
        discartedTopics:[],
        activePlayers:[0,1,2,3],
        allTopicsCards: [].concat(boldMemeTopic.create(2), diyTopic.create(2), dogTopic.create(2), exposeTopic.create(2), hotPic.create(2), movieCriticTopic.create(2), nostalgicTopic.create(2), oddTopic.create(2), politicsTopic.create(2), topic1.create(2), topic2.create(2), topic3.create(2), topic4.create(2), topic5.create(2)),
        allReactionsCards: [].concat(bigExplanation.create(10), boldClaim.create(10), exposed.create(10), goodWill.create(10), lowComent.create(10), netForgives.create(10), netRage.create(10), pushLimits.create(10), redemption.create(10), socialNetwork.create(10), webForgives.create(10), webRage.create(10)),
    },
    
};