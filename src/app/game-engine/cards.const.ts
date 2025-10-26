export type Type = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | 'Q' | 'J' | 'K';
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface Card {
  id: number;
  cardType: Type;
  suit: Suit;
  weight: number;
  manilhaCardType: Type;
  isManilha?: boolean;
}

export interface Player {
  name: string;
  playOrder: number;
  cards: Card[];
  isHuman?: boolean;
}

export interface CardPlayer {
  card: Card;
  player: Player;
}

export interface Team {
  name: string;
  players: Player[];
  score: Score;
}

export interface Score {
  roundScore: number;
  matchScore: number;
}

export interface TeamScore {
  teamName: string;
  score: Score;
}

export interface GameStats {
  teamsStats: Team[];
}

export const initialState: GameStats = {
  teamsStats: [
    {
      name: 'team1',
      players: [
        {
          name: 'player1',
          playOrder: 1,
          cards: [],
          isHuman: true,
        },
        {
          name: 'player3',
          playOrder: 3,
          cards: [],
        },
      ],
      score: { roundScore: 0, matchScore: 0 },
    },
    {
      name: 'team2',
      players: [
        {
          name: 'player2',
          playOrder: 2,
          cards: [],
        },
        {
          name: 'player4',
          playOrder: 4,
          cards: [],
        },
      ],
      score: { roundScore: 0, matchScore: 0 },
    },
  ],
};

export const cards: Card[] = [
  // Hearts
  { id: 1, cardType: 'A', suit: 'hearts', weight: 8, manilhaCardType: '2' },
  { id: 2, cardType: '2', suit: 'hearts', weight: 9, manilhaCardType: '3' },
  { id: 3, cardType: '3', suit: 'hearts', weight: 10, manilhaCardType: '4' },
  { id: 4, cardType: '4', suit: 'hearts', weight: 1, manilhaCardType: '5' },
  { id: 5, cardType: '5', suit: 'hearts', weight: 2, manilhaCardType: '6' },
  { id: 6, cardType: '6', suit: 'hearts', weight: 3, manilhaCardType: '7' },
  { id: 7, cardType: '7', suit: 'hearts', weight: 4, manilhaCardType: 'Q' },
  { id: 8, cardType: 'Q', suit: 'hearts', weight: 5, manilhaCardType: 'J' },
  { id: 9, cardType: 'J', suit: 'hearts', weight: 6, manilhaCardType: 'K' },
  { id: 10, cardType: 'K', suit: 'hearts', weight: 7, manilhaCardType: 'A' },

  // Diamonds
  { id: 11, cardType: 'A', suit: 'diamonds', weight: 8, manilhaCardType: '2' },
  { id: 12, cardType: '2', suit: 'diamonds', weight: 9, manilhaCardType: '3' },
  { id: 13, cardType: '3', suit: 'diamonds', weight: 10, manilhaCardType: '4' },
  { id: 14, cardType: '4', suit: 'diamonds', weight: 1, manilhaCardType: '5' },
  { id: 15, cardType: '5', suit: 'diamonds', weight: 2, manilhaCardType: '6' },
  { id: 16, cardType: '6', suit: 'diamonds', weight: 3, manilhaCardType: '7' },
  { id: 17, cardType: '7', suit: 'diamonds', weight: 4, manilhaCardType: 'Q' },
  { id: 18, cardType: 'Q', suit: 'diamonds', weight: 5, manilhaCardType: 'J' },
  { id: 19, cardType: 'J', suit: 'diamonds', weight: 6, manilhaCardType: 'K' },
  { id: 20, cardType: 'K', suit: 'diamonds', weight: 7, manilhaCardType: 'A' },

  // Clubs
  { id: 21, cardType: 'A', suit: 'clubs', weight: 8, manilhaCardType: '2' },
  { id: 22, cardType: '2', suit: 'clubs', weight: 9, manilhaCardType: '3' },
  { id: 23, cardType: '3', suit: 'clubs', weight: 10, manilhaCardType: '4' },
  { id: 24, cardType: '4', suit: 'clubs', weight: 1, manilhaCardType: '5' },
  { id: 25, cardType: '5', suit: 'clubs', weight: 2, manilhaCardType: '6' },
  { id: 26, cardType: '6', suit: 'clubs', weight: 3, manilhaCardType: '7' },
  { id: 27, cardType: '7', suit: 'clubs', weight: 4, manilhaCardType: 'Q' },
  { id: 28, cardType: 'Q', suit: 'clubs', weight: 5, manilhaCardType: 'J' },
  { id: 29, cardType: 'J', suit: 'clubs', weight: 6, manilhaCardType: 'K' },
  { id: 30, cardType: 'K', suit: 'clubs', weight: 7, manilhaCardType: 'A' },

  // Spades
  { id: 31, cardType: 'A', suit: 'spades', weight: 8, manilhaCardType: '2' },
  { id: 32, cardType: '2', suit: 'spades', weight: 9, manilhaCardType: '3' },
  { id: 33, cardType: '3', suit: 'spades', weight: 10, manilhaCardType: '4' },
  { id: 34, cardType: '4', suit: 'spades', weight: 1, manilhaCardType: '5' },
  { id: 35, cardType: '5', suit: 'spades', weight: 2, manilhaCardType: '6' },
  { id: 36, cardType: '6', suit: 'spades', weight: 3, manilhaCardType: '7' },
  { id: 37, cardType: '7', suit: 'spades', weight: 4, manilhaCardType: 'Q' },
  { id: 38, cardType: 'Q', suit: 'spades', weight: 5, manilhaCardType: 'J' },
  { id: 39, cardType: 'J', suit: 'spades', weight: 6, manilhaCardType: 'K' },
  { id: 40, cardType: 'K', suit: 'spades', weight: 7, manilhaCardType: 'A' },
];
