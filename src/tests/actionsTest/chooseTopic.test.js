import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard, chooseTopic } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";
import topic1 from "../../components/Cards/Topics/topic1";
import basicTopic from "../../components/Cards/Topics/basicTopic"


it("I choose a topic, check the challenge of the topic, move cards from deck to playerboard, calculate the likes and reports", () => {
    const f = new bigExplanation();
    const c = new goodWill()
    const t = new topic1()
    const G = {
        players: [
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
        ],
        offer: {
            topicsOffer:[t],
            deck: [c,f],
            discardPile: [],
            discartedTopics:[]
        }
    };
    chooseTopic(G, { currentPlayer: "0" }, 0);
    expect(G.players[0].likes).toEqual(3);
    expect(G.players[0].reports).toEqual(1);
    expect(G.players[0].board.yellow.length).toEqual(2);
    expect(G.players[0].board.green.length).toEqual(0);
    expect(G.players[0].board.red.length).toEqual(0);
    expect(G.offer.discartedTopics[0]).toEqual(t);
    expect(G.offer.deck.length).toEqual(0)

});