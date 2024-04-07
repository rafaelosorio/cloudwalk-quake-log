import axiosInstance from './service'

// Interface to represent the game data
interface GameData {
  total_kills: number
  players: string[]
  kills: Record<string, number>
}

// Function to handle the game log and return the game data
export async function handleLog(): Promise<Record<string, GameData>> {
  const response = await axiosInstance.get('/')
  const logContent: string = response.data

  // Split the log content by line
  const logLines = logContent.split('\n')

  // Initialize the game data object
  const gameData: Record<string, GameData> = {}

  // Initialize the current game index
  let currentGameIndex = 1

  // Iterate over the log lines
  logLines.forEach((line) => {
    // Check if the line is a game start line
    if (line.includes('InitGame')) {
      // Extract the game name
      const gameName = `game_${currentGameIndex}`
      // Initialize the game data object
      gameData[gameName] = {
        total_kills: 0,
        players: [],
        kills: {}
      }
      currentGameIndex++
    }

    // Check if the line is a kill line
    if (line.includes('Kill')) {
      // Extract the match data
      const matchData = line.match(/Kill:\s(.*)\s/)

      // Check if the match data exists
      if (matchData) {
        // Extract the player names
        const [, player1, player2] = matchData[1].split('killed')

        // Extract the game name
        const gameName = `game_${currentGameIndex - 1}`

        // Increment the total kills
        gameData[gameName].total_kills++

        // Extract the player names
        const players = gameData[gameName].players
        if (!players.includes(player1.trim())) {
          players.push(player1.trim())
        }

        // Check if the player1 is 'world'
        if (player1.trim() === '<world>') {
          // Extract the game name
          const gameName = `game_${currentGameIndex - 1}`
          // Decrement the player2 kills
          gameData[gameName].kills[player2.trim()]--
        } else {
          // Increment the player1 kills, based on the history of the player
          gameData[gameName].kills[player1.trim()] =
            (gameData[gameName].kills[player1.trim()] || 0) + 1
        }
      }
    }
  })

  return gameData
}
