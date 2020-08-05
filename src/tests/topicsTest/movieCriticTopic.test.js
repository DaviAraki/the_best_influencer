import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard, chooseTopic } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import goodWill from "../../components/Cards/Reactions/goodWill";
import exposed from "../../components/Cards/Reactions/exposed";
import movieCriticTopic from "../../components/Cards/Topics/movieCriticTopic";


it("I choose a topic, check the challenge of the topic, move cards from deck to playerboard, calculate the likes and reports", () => {
    const f = new bigExplanation();
    const c = new goodWill()
    const t = new movieCriticTopic()
    const c2 = new exposed()
    let ctx = { currentPlayer: "0", events: {}, activePlayers: { "1": "topicSelection" } }
    let endStage = jest.fn(() => {
        ctx.activePlayers = { "1": "playPhase" }
    })
    ctx.events.endStage = endStage

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
            topicsOffer: [t],
            deck: [c, f, c2],
            discardPile: [],
            discartedTopics: []
        }
    };
    chooseTopic(G, ctx, 0);
    expect(G.players[0].likes).toEqual(3);
    expect(G.players[0].reports).toEqual(2);
    expect(G.players[0].board.yellow.length).toEqual(3);
    expect(G.players[0].board.green.length).toEqual(0);
    expect(G.players[0].board.red.length).toEqual(0);
    expect(G.offer.discartedTopics[0]).toEqual(t);
    expect(G.offer.deck.length).toEqual(0)

});