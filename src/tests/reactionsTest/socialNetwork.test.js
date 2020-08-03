import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";
import { createContext } from "react";
import lowComent from "../../components/Cards/Reactions/lowComent";
import netForgives from "../../components/Cards/Reactions/netForgives";
import socialNetwork from "../../components/Cards/Reactions/socialNetwork";

it("When i use netForgives, all players have reported subtracted to a minimum of 0", () => {
    const f = new socialNetwork();
    const c = new goodWill()
    const G = {
        players: [
            {
                id: generateUniqueId(),
                hand: [f],
                board: { red: [], yellow: [], green: [] },
                likes: 4,
                reports: 4
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 2,
                reports: 0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 6,
                reports: 2
            },
        ],
        offer: {
            deck: [c],
            discardPile: []
        }
    };
    playCard(G, { currentPlayer: "0" }, 0, 0);
    expect(G.players[0].likes).toEqual(6);
    expect(G.players[0].hand.length).toEqual(0);
    expect(G.players[1].likes).toEqual(3);
    expect(G.players[2].likes).toEqual(7);
    expect(G.offer.discardPile[0]).toEqual(f);


});