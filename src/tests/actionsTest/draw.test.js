import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw , shuffleDeck } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'


it("When i draw, the top card of my deck goes to my hand", () => {
    const f = new bigExplanation();
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
        offer:{
            deck:[f]
        }
    };
    draw(G, { currentPlayer: "0" });
    expect(G.offer.deck.length).toEqual(0);
    expect(G.players[0].hand.length).toEqual(1);
    expect(G.players[0].hand[0]).toBe(f);
});
it("When i draw, if my deck is empty, the discardPile is shuffled into the deck", () => {
    const f = new bigExplanation();
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
            deck: [],
            discardPile:[f]
        }
    };
    draw(G, { currentPlayer: "0" });
    expect(G.offer.deck.length).toEqual(0);
    expect(G.offer.discardPile.length).toEqual(0);
    expect(G.players[0].hand.length).toEqual(1);
    expect(G.players[0].hand[0]).toBe(f);

});
