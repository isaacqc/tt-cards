import React, { useState } from "react";
import { CardCodeFromCard, CardCodeToImage, IsPlayingCard } from "../tt-cards-game/playing-cards";
import { CompareRound } from "./main-compares";
const PokerCard = require('pokersolver').Card;


export const Card = (props: {
  // compareRound: CompareRound,
  handIndex: number,
  cardIndex: number,
  cardCode: any,
  setCard: any,
}) => {

  // const [compareRound, setCompareRound] = useState(props.compareRound);
  const [card, setCard] = useState(props.cardCode);
  const [cardInput, setCardInput] = useState(props.cardCode);

  const changeCard = (event: any) => {
    const newCardCode = event.target.value;
    console.log('newCardCode:', newCardCode);
    
    setCardInput(newCardCode);

    if (IsPlayingCard(newCardCode)) {
      
      setCard(newCardCode)

      props.setCard(props.handIndex, props.cardIndex, newCardCode);
    }
    

    // this.setState(produce(this.state, state => {
    //   const compareIndex = this.state.compares.findIndex(compare => compare === compareRound);
    //   state.compares.splice(compareIndex, 1);

    //   console.log(solvedHand.cardPool);

    //   // change the card in compareRound
    //   // compareRound.hands

    //   state.compares = [
    //     ...state.compares,
    //     compareRound
    //   ]
    // }))
  }

  
  return (
    <div className="playing-card">
      <img alt={card} className="z-depth-2" src={ CardCodeToImage(card) } />
      
      <div className="input-field">
        <input type="text" className="validate"
         onChange={changeCard} 
        value={ cardInput } 
        />
      </div>
    </div>
  );
}