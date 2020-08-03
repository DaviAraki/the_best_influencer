import bigExplanation from "../../components/Cards/Reactions/bigExplanation";
import { draw, shuffleDeck, playCard } from "../../Game";
import iTreta from "../../Game";
import generateUniqueId from '../../utils/generateUniqueId'
import boldClaim from "../../components/Cards/Reactions/boldClaim";
import goodWill from "../../components/Cards/Reactions/goodWill";
import { createContext } from "react";
import lowComent from "../../components/Cards/Reactions/lowComent";
import netForgives from "../../components/Cards/Reactions/netForgives";
import webForgives from "../../components/Cards/Reactions/webForgives";

it("When i use netForgives, all players have reported subtracted to a minimum of 0", () => {
    const f = new webForgives();
    const c = new goodWill()
    const G = {
        players: [
            {
                id: generateUniqueId(),
                hand: [f],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 4
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
                reports: 2
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: { red: [], yellow: [], green: [] },
                likes: 0,
                reports: 1
            }
        ],
        offer: {
            deck: [c],
            discardPile: []
        }
    };
    playCard(G, { currentPlayer: "0" }, 0, 0);
    expect(G.players[0].reports).toEqual(2);
    expect(G.players[0].hand.length).toEqual(0);
    expect(G.players[1].reports).toEqual(0);
    expect(G.players[2].reports).toEqual(0);
    expect(G.players[3].reports).toEqual(0);
    expect(G.offer.discardPile[0]).toEqual(f);

});