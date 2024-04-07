import axiosInstance from './service'

// Interface to represent game data
interface GameData {
  total_kills: number
  players: string[]
  kills: Record<string, number>
  kills_by_means: Record<string, number>
}

// Function to process game log and return game data
export async function handleLog(): Promise<Record<string, GameData>> {
  const response = await axiosInstance.get('/')
  const logContent: string = response.data

  // Split log content by line
  const logLines = logContent.split('\n')

  // Initialize object to store game data
  const gameData: Record<string, GameData> = {}

  // Initialize current game index
  let currentGameIndex = 1

  // Iterate over log lines
  logLines.forEach((line) => {
    // Check if line indicates start of a new game
    if (line.includes('InitGame')) {
      // Extract game name
      const gameName = `game_${currentGameIndex}`
      // Initialize game data
      gameData[gameName] = {
        total_kills: 0,
        players: [],
        kills: {},
        kills_by_means: {}
      }
      currentGameIndex++
    }

    // Check if line contains information about a kill
    if (line.includes('Kill')) {
      // Extract data from line
      const matchData = line.match(
        /Kill:\s(\d+)\s(\d+)\s(\d+):\s(.*)\skilled\s(.*)\sby\s(.*)/
      )

      // Check if data was extracted successfully
      if (matchData) {
        // Extract player names and cause of death
        const [, , , , player1Data, player2Data, causeOfDeath] = matchData

        // Extract game name
        const gameName = `game_${currentGameIndex - 1}`

        // Increment total kills in game
        gameData[gameName].total_kills++

        // Extract player names
        const player1 = player1Data.trim()
        const player2 = player2Data.trim()

        // Add players to players list if not already present
        if (
          !gameData[gameName].players.includes(player1) &&
          player1 !== '<world>'
        ) {
          gameData[gameName].players.push(player1)
        }
        if (
          !gameData[gameName].players.includes(player2) &&
          player2 !== '<world>'
        ) {
          gameData[gameName].players.push(player2)
        }

        // Check if player 1 was killed by <world>
        if (player1 === '<world>') {
          // Subtract 1 kill from player 2's score
          if (player2 !== '<world>') {
            gameData[gameName].kills[player2] =
              (gameData[gameName].kills[player2] || 0) - 1
          }
        } else {
          // Check if player 2 was killed by <world>
          if (player2 === '<world>') {
            // Subtract 1 kill from player 1's score
            gameData[gameName].kills[player1] =
              (gameData[gameName].kills[player1] || 0) - 1
          } else {
            // Increment kills for player 1 if not '<world>'
            if (player1 !== '<world>') {
              gameData[gameName].kills[player1] =
                (gameData[gameName].kills[player1] || 0) + 1
            }
          }
        }

        // Increment kills by means
        if (causeOfDeath) {
          gameData[gameName].kills_by_means[causeOfDeath] =
            (gameData[gameName].kills_by_means[causeOfDeath] || 0) + 1
        }
      }
    }
  })

  return gameData
}
