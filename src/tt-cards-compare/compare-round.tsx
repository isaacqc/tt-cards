import React, { useState, useEffect } from "react";
import { CompareRound } from "./main-compares";
import { Card } from "./card";
import produce from "immer";
const Hand = require('pokersolver').Hand;


export const CompareHand = (props: { compareRound: CompareRound}) => {

  // const [compareRound, setCompareRound] = useState(props.compareRound);
  // const [deck, setDeck] = useState(props.compareRound.deck);
  const [hands, setHands] = useState(props.compareRound.hands);

  const solveHands = (hands: any[]) => {
    const solvedHands: any[] = [];
    let playerIndex = 1;
    hands.map((hand: any) => {
      console.log(hand);
      const solvedHand = Hand.solve(hand);
      solvedHand.playerId = playerIndex;
      solvedHands.push(solvedHand);
      playerIndex++;
    });
    return solvedHands;
  }

  const determineWinner = (solvedHands: any[]) => {
    
    console.log('solvedHands', solvedHands);

    const winnerHands = Hand.winners(solvedHands);
    const winnerPlayerIds = winnerHands.map((hand: any) => hand.playerId);
    for (const solvedHand of solvedHands) {
      if (winnerPlayerIds.some((winnerPlayerId: any) => winnerPlayerId === solvedHand.playerId)) {
        solvedHand.isWinner = true;
      }
    }
  }

  const printHand = (solvedHand: any, handIndex: number) => {
  
    // const handInCardCode = solvedHand.cards.join(', ');
    
    const winner = solvedHand.isWinner ? <strong> wins! </strong> : '';
  
  
    return (
      <div className="col s5">
        {/* <div>Player { solvedHand.playerId }:</div> */}
        {/* <div>{ handInCardCode}</div> */}
  
        <div className="row">
          <div className={"col s5 player-title " + (solvedHand.isWinner ? 'winner' : '')}>Player {solvedHand.playerId} {winner} </div>
        </div>
        <div className="row">
          <div className="col s5">{ solvedHand.descr }</div>
        </div>
  
        <div className="row">
          {
            hands[handIndex].map((cardCode: any, cardIndex: number) => {
              return (
                <div className="col s2">
                  <Card 
                    handIndex={handIndex}
                    cardIndex={cardIndex}
                    cardCode={cardCode} 
                    setCard={setCard}
                   />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }

  
  const [solvedHands, setSolvedHands] = useState(solveHands(hands));

  const setCard = (handIndex: number, cardIndex: number, cardCode: string) => {
    console.log('hands:',hands);
    console.log('setCard:', handIndex, cardIndex, cardCode);

    const newHands = produce(hands, (hands: any) => {
      hands[handIndex][cardIndex] = cardCode;
    });

    // set the card to hands
    setHands(newHands)

    // solveHands
    const solvedHands = solveHands(newHands);
    
    setSolvedHands(solvedHands);
    // determineWinner
    determineWinner(solvedHands);
  }

  determineWinner(solvedHands);
  

  return (
    <div>
      { solvedHands.map((solvedHand: any, handIndex: number) => printHand(solvedHand, handIndex)) }
    </div>
  );

}