import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";
import exposed from "../../components/Cards/Reactions/exposed";

it("When i use boldClaim in other, i add 4 likes and a report on the target", () => {
    const f = new exposed();
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
    playCard(G, { currentPlayer: "0" }, 0, 1);
    expect(G.players[0].likes).toEqual(0);
    expect(G.players[1].likes).toEqual(0);
    expect(G.players[1].reports).toEqual(1)
    expect(G.offer.discardPile[0]).toEqual[f]

});