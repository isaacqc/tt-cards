## Hong Kong Style Chinese poker 十三張
https://zh.wikipedia.org/wiki/%E5%8D%81%E4%B8%89%E5%BC%B5

This project is written in React and boardgame.io

### TODO list
- [x] diplay cards in 3, 5, 5 format
- [x] swap cards with ["react-beautiful-dnd"]( https://github.com/atlassian/react-beautiful-dnd)
  - [multi hori list](https://react-beautiful-dnd.netlify.app/?path=/story/multiple-horizontal-lists--stress-test)
  - [multi drag](https://react-beautiful-dnd.netlify.app/?path=/story/multi-drag--pattern)
  - [swap](https://github.com/atlassian/react-beautiful-dnd/issues/911)
  - or this? [react-flip-move](https://github.com/joshwcomeau/react-flip-move)
  - or this? [framer motion](https://www.framer.com/motion/). WOW!!!
- [x] 3, 5, 5 with each rack cards attached to the left
- [x] display hand with setCard 
- [x] display hand with reorder 
- [x] display duplicate cards' cardCode
- [x] compare two players
  - compareTop3
  - compareMiddle5/Bottom5
  - computeDuelScore(player, againstPlayer)
	- display the duel results
- [ ] solve Own Goal (擺烏龍)
	- [ ] display if the currently played hands is Own Goal for all players
- [ ] allow player to report Own Goal
	- [ ] if report other player Own Goal
		- Correct: 
			- invalidate the own goal player hand scores
			- treat all the own goal player's hands as losing
			- the reporting player gains 1 point from own goal player
		- Wrong: 
			- the reporting player lose 1 point to the own goal player
- [ ] solve Special Hand
- [ ] ...
- [ ] animate the last extra card to new position
- [ ] highlight the last extra card in dragged over row
- [ ] multi-drag cards to destination index

### Game Data Structure
- Player
	- Name
  - Score

- GameTable
  - GameRound[]
  -  Player[]

- GameRound
  - GameStage
    - StageName
    - RemainingSeconds
  - Players
		- P1/P2/P3/P4: 
      - RoundScore?: int,
      - DealtCards: Card[], 
      - SpecialHand?: SpecialHand
      - Top3?: { 
        - Cards: Cards[],
        - Hand: Hand,
      - Middle5?:
        - Cards: Cards[],
        - Hand: Hand,
      - Bottom5?:{ 
        - Cards: Cards[],
        - Hand: Hand,
  - Duels
    - P1P2/P1P3/P1P4/P2P3/P2P4/P3P4:
      - Top3?: int
      - Middle5?: int
      - Bottom5?: int
      - SpecialHand?: int
      - DuelTotal: int

### using [boardgame.io](https://boardgame.io/)

- Lobby
	- Create Table
		- Table Name
		- Table Settings
			- PlayCard duration
			- Default 60 seconds
		- Allow Spectators?
		- Private?
	- Max 30 tables
- List Tables
	- Table Name
	- Players (2/4)
	- Spectators?
- playerSettings
	- acceptSpectator: bool;
- game
	- setup
		- table
		- secret
			currentRound: 
				same as below
		- players: {
			'0': {
				this can be the dealer? bot controlled in server?
			},
			'1': {
			},
		}
	- table: 
		- roundNum: int // current round number
		- rounds
			- player1/2/3/4: 
				- dealtCards: Card[]
				- confirmedHand: Card[]
				- reportSpecial: bool
				- ownGoal: bool
				- reportOwnGoals: {}[]
					- targetPlayerId: string
					- correct: bool
				- beforeScore: int
				- afterScore: int
		- allPlayers
			- player1/2/3/4
				- acceptSpectator: bool
				- currentScore: int
	- phase:
		- GatheringPlayers
			- render: WaitingScreen
			- endIf: 4 players joined
			- next: DrawCards
			- moves:
				- sitDown
				- standUp
				- leaveTable
				- acceptSpectator
				- spectate(playerId)
				
		- DrawCards
			- render: DrawCardsScreen
			- next: PlayCards
			- system:
				- Shuffle cards and deal 13 cards to each player
		  
		- PlayCards
			- render: PickCardsScreen
			- endif: all players confirm hands, or time runs out - (e.g. 1 min)
			- next: ShowRoundResult
			- moves:
				- openCard
				- swapCard
				- reportSpecial
				- confirmHand
		  
		- ShowRoundResult
			- render: RoundResultScreen
			- endif: all players click ready to continue or time - runs out (e.g. 1 min)
			- system: 
				- compare all the played hands and give verdict. 
				- how?
				- ...
				- calculate the score of the round for each player. how?
			- moves:
				- reportOwnGoal
				- readyToContinue
			- next: DrawCards