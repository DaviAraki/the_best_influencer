import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";
import { createContext } from "react";
import lowComent from "../../components/Cards/Reactions/lowComent";


it("When i use lowComent in myself, i place the top card of the offer deck in my yellow board", () => {
    const f = new lowComent();
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
    expect(G.players[0].reports).toEqual(0);
    expect(G.offer.discardPile[0]).toEqual(f);
    expect(G.players[0].board.yellow[0]).toEqual(c)

});
it("When i use lowComent in another, i place the top card of the offer deck in his yellow board", () => {
    const f = new lowComent();
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
                hand: [],
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
    expect(G.players[0].hand.length).toEqual(0);
    expect(G.players[1].likes).toEqual(3);
    expect(G.players[1].reports).toEqual(0);
    expect(G.players[1].board.yellow[0]).toEqual(c);
    expect(G.offer.discardPile[0]).toEqual(f);


});