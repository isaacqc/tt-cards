import { Player } from "./player";

export function hasDuplicates(array: any[]) {
  return (new Set(array)).size !== array.length;
}

export const findDuplicates = (arr: any[]) => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
  // JS by default uses a crappy string compare.
  // (we use slice to clone the array so the
  // original array won't be modified)
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] === sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}

export const findDuplicateCards = (players: Player[]) => {
    
  const reducer = (acc: any, player: Player) => { acc.push(player.playedCards); return acc; };
  const allCards = [].concat(...players.reduce(reducer, []));
  // console.log('allCards:', allCards);
  return findDuplicates(allCards);
}