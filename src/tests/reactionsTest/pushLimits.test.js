import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";
import pushLimits from "../../components/Cards/Reactions/pushLimits";


it("When i draw, the top card of my deck goes to my hand", () => {
    const f = new pushLimits();
    const c = new goodWill()
    const G = {
        players: [
            {
                id: generateUniqueId(),
                hand: [f],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 0
            },
        ],
        offer: {
            deck: [c],
            discardPile: []
        }
    };
    playCard(G, { currentPlayer: "0" }, 0, 0);
    expect(G.players[0].likes).toEqual(3);
    expect(G.players[0].board.red[0]).toEqual(c);
    expect(G.offer.discardPile[0]).toEqual[f]

});