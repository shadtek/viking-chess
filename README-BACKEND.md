A player is connected to the site. They have enabled "ready to play". This writes their id and rank in a queue array on the db, the next player gets online and has enabled "ready to play". This means there are two players in the queue array. For an MVP we can simply have them exist in the queue array like this. When they are matched they are removed from the queue array.

{
  queue: [
    {pid:1, rank: null},
    {pid:2, rank null}
  ]
}

So then when they start a game we can create a new entry in the games array a game object like this:

{
  games: [
    {
      gameId: 1,
      gameStatus: [
        {
          defencePid: 1,
          turn: true,
          moves: [
            {
              peiceId: null,
              startLocation: [x,y],
              endLocation: [x,y]
            },
          ]
        },
        {
          offencePid: 2,
          turn: false,
          moves: [
            {
              peiceId: null,
              startLocation: [x,y],
              endLocation: [x,y]
            }
          ]
        }
      ]
    }
  ]
}



The registered players database could be as simple as:

{
  players: [
    {
      pid: 1,
      rank: null,
      email: johndoe@gmail.com
    },
    {
      pid: 2,
      rank: null,
      email: foo@gmail.com
    },
  ]
}