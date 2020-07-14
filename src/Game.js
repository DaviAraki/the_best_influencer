export const TheInfluencer = {
    name: "The Influencer",
    setup:() => ({
        players:[
            {
                id: generateUniqueId(),
                hand:[],
                board:[],
                likes: 0,
                reports:0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: [],
                likes: 0,
                reports: 0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: [],
                likes: 0,
                reports: 0
            },
            {
                id: generateUniqueId(),
                hand: [],
                board: [],
                likes: 0,
                reports: 0
            }
        ],
        offer: {
            posts:[],
            deck:[]
        }
    }),
    moves:{
        playCard,
        pass,
        choosePost,
    }


}