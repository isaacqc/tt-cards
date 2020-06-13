import React from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToe from './tic-tac-toe/game';
import ReactDOM, { render } from 'react-dom';
import Board from './tic-tac-toe/board';
import { Client } from "boardgame.io/react";
import PlayingDeck, { CardCodeToImageFilename, CardCodeToImage, CardCodeFromCard } from './tt-cards-game/playing-cards';
const Hand = require('pokersolver').Hand;


function App() {
  
  const TTTBoard = Client({
    game: TicTacToe,
    board: Board,
    // The number of players.
    numPlayers: 2
  });

  // const deck = new decks.StandardDeck();
  
  let compares: any[] = [];

  const numOfCompares = 5;
  const numOfHandsToCompares = 2;
  const numOfCardsDrawn = 5;

  for (let i = 0; i < numOfCompares; i++) {

    let deck = PlayingDeck();
    let playerIndex = 1;
    let solvedHands = [];

    for (let j = 0; j < numOfHandsToCompares; j++) {
      const hand = deck.draw(numOfCardsDrawn);
      console.log(hand);
      const solvedHand = Hand.solve(hand);
      solvedHand.playerId = playerIndex;
      solvedHands.push(solvedHand);
      playerIndex++;
    }

    const winnerHands = Hand.winners(solvedHands);
    const winnerPlayerIds = winnerHands.map((hand: any) => hand.playerId);
    for (const solvedHand of solvedHands) {
      if (winnerPlayerIds.some((winnerPlayerId: any) => winnerPlayerId == solvedHand.playerId)) {
        solvedHand.isWinner = true;
      }
    }

    compares.push(solvedHands);
  }

  console.log(compares);


  return (
    <div className="App">
      <h1 className="teal-text text-darken-3 center-align">
        Chinese Poker: Thirteen Cards
      </h1>
      <div>
        <div>
          <div>
            <div className="row">
                <div className="col s2">Compare Hands</div>
                {
                  [...Array(numOfHandsToCompares)].map((value, index:any) => {
                    return <div className="col s5">Player {index + 1}</div>
                  })
                }
            </div>
          </div>

          <div>
            { 
              compares.map((solvedHands:any, compareIndex: number) => {
                
                const displayHands = solvedHands.map((solvedHand: any) => {
                  return printHand(solvedHand);
                })

                return (
                  <div className="row">
                    <div className="col s2">
                      #{ compareIndex + 1 }
                    </div>
                    {displayHands}
                  </div>
                  
                );
              })
            }
          </div>
        </div>
        {/* <TTTBoard /> */}
      </div>
    </div>
  );
}

function printHand(solvedHand: any) {

  const handInCardCode = solvedHand.cards.join(', ');
  
  const winner = solvedHand.isWinner ? <div> Is Winner! </div> : '';

  return (
    <div className="col s5">
      {/* <div>Player { solvedHand.playerId }:</div> */}
      <div>{ handInCardCode}</div>
      {
        solvedHand.cards.map((card: any) => {
          // return null;
          return <img src={ CardCodeToImage(CardCodeFromCard(card)) } />
        })
      }
      <div>{ solvedHand.descr }</div>
      { winner }
    </div>
  );

}
export default App;
