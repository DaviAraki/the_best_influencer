import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";


it("When i draw, the top card of my deck goes to my hand", () => {
    const f = new bigExplanation();
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
            discardPile:[]
        }
    };
    playCard(G, { currentPlayer: "0" },0,0);
    expect(G.players[0].likes).toEqual(1);
    expect(G.players[0].board.green[0]).toEqual(c);
    expect(G.offer.discardPile[0]).toEqual[f]

});
// it("When i draw, if my deck is empty, the discardPile is shuffled into the deck", () => {
//     const f = new bigExplanation();
//     const G = {
//         players: [
//             {
//                 id: generateUniqueId(),
//                 hand: [],
//                 board: { red: [], yellow: [], green: [] },
//                 likes: 0,
//                 reports: 0
//             },
//         ],
//         offer: {
//             deck: [],
//             discardPile: [f]
//         }
//     };
//     draw(G, { currentPlayer: "0" });
//     expect(G.offer.deck.length).toEqual(0);
//     expect(G.offer.discardPile.length).toEqual(0);
//     expect(G.players[0].hand.length).toEqual(1);
//     expect(G.players[0].hand[0]).toBe(f);

// });
