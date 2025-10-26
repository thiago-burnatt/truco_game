import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Card, CardPlayer, cards, GameStats, Player, Suit, Team } from './cards.const';
import { firstValueFrom, Subject } from 'rxjs';
import { GameState } from './game-state';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-game-engine',
  imports: [NgStyle],
  templateUrl: './game-engine.component.html',
  styleUrl: './game-engine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameEngineComponent implements OnInit {
  protected readonly gameState = inject(GameState);

  private cardsPile: WritableSignal<Card[]> = signal([]);
  protected turnedCard: WritableSignal<Card | null> = signal(null);
  private cutOffCard: WritableSignal<Card | null> = signal(null);
  private gameRound: WritableSignal<number> = signal(1);
  protected cardsOnTable: WritableSignal<CardPlayer[]> = signal([]);
  private playerOrderTurn: WritableSignal<number> = signal(1);
  protected winningCard: WritableSignal<CardPlayer | null> = signal(null);

  protected pickedCard = new Subject<number>();

  async ngOnInit(): Promise<void> {
    this.shuffleCards();
    this.cutCardDeck(10);
    this.setPlayersCards();
    this.turnCard();
    this.setManilha();

    await this.startRound();
  }

  private shuffleCards(): void {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    this.cardsPile.set(cards);
  }

  private turnCard(): void {
    if (this.cardsPile().length > 0) {
      const card: Card = this.cardsPile().pop()!;
      this.turnedCard.set(card);
    }
  }

  private setManilha(): void {
    this.gameState.gameStats.update((currentStats: GameStats): GameStats => {
      return {
        ...currentStats,
        teamsStats: currentStats.teamsStats.map(
          (team: Team): Team => ({
            ...team,
            players: team.players.map((player: Player): Player => {
              const updatedCards: Card[] = player.cards.map((card: Card): Card => {
                if (card.cardType === this.turnedCard()?.manilhaCardType) {
                  return { ...card, isManilha: true, weight: this.setManilhaWeight(card.suit) };
                }
                return { ...card };
              });
              return { ...player, cards: updatedCards };
            }),
          }),
        ),
      };
    });
  }

  private setManilhaWeight(suit: Suit): number {
    switch (suit) {
      case 'diamonds':
        return 11;
      case 'spades':
        return 12;
      case 'hearts':
        return 13;
      case 'clubs':
        return 14;
    }
  }

  private cutCardDeck(index: number): void {
    const splicedCards: Card[] = this.cardsPile().splice(0, index);
    this.cutOffCard.set(splicedCards.pop()!);
    this.cardsPile.update((cards: Card[]): Card[] => [...cards, ...splicedCards]);
  }

  private setPlayersCards(): void {
    for (let round = 0; round < 3; round++) {
      for (let playerOrder = 1; playerOrder <= 4; playerOrder++) {
        this.gameState.gameStats.update((currentStats: GameStats): GameStats => {
          const updatedTeams: Team[] = currentStats.teamsStats.map(
            (team: Team): Team => ({
              ...team,
              players: team.players.map((player: Player): Player => {
                if (player.playOrder === playerOrder) {
                  const card: Card = this.cardsPile().pop()!;
                  if (card) {
                    return {
                      ...player,
                      cards: [...player.cards, card],
                    };
                  }
                }
                return player;
              }),
            }),
          );

          return {
            ...currentStats,
            teamsStats: updatedTeams,
          };
        });
      }
    }
  }

  private async startRound(): Promise<void> {
    this.winningCard.set(null);
    await this.callNextPlayerTurn();
  }

  protected async callNextPlayerTurn(): Promise<void> {
    const player: Player = this.getNextPlayerTurn(this.playerOrderTurn());

    if (player.isHuman) {
      const cardIndex = await firstValueFrom(this.pickedCard);
      const card = player.cards.splice(cardIndex, 1)[0];
      this.cardsOnTable.update((cards: CardPlayer[]): CardPlayer[] => [...cards, { card, player }]);
    } else {
      await this.getCpuPlayerCard(player);
    }

    this.checkRoundWinner();

    this.playerOrderTurn.update((order) => order + 1);
    if (this.playerOrderTurn() <= 4) {
      await this.callNextPlayerTurn();
    } else {
      await this.endRound();
    }
  }

  private getCpuPlayerCard(player: Player): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cardPlayer: CardPlayer = { card: player.cards.pop()!, player };
        this.cardsOnTable.update((cards: CardPlayer[]): CardPlayer[] => [...cards, cardPlayer]);
        resolve();
      }, 2000);
    });
  }

  private async endRound(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.gameRound.update((round) => round + 1);
        this.cardsOnTable.set([]);
        this.playerOrderTurn.set(1);
        this.updatePlayersOrder();
        this.updateScore();
        this.winningCard.set(null);

        if (this.gameRound() <= 3) {
          this.callNextPlayerTurn();
        }
        resolve();
      }, 6000);
    });
  }

  private checkRoundWinner(): void {
    const winningCard = this.cardsOnTable().reduce(
      (highest: CardPlayer, current: CardPlayer): CardPlayer => {
        return current.card.weight > highest.card.weight ? current : highest;
      },
      { card: { weight: 0 } } as CardPlayer,
    );
    this.winningCard.set(winningCard);
  }

  private updateScore(): void {
    this.gameState.gameStats.update((gameStats: GameStats): GameStats => {
      const updatedTeamsScore: Team[] = gameStats.teamsStats.map((team: Team): Team => {
        team.players.map((player: Player): Player => {
          if (player.name === this.winningCard()?.player.name) {
            team.score.roundScore += 1;
          }
          return player;
        });
        return team;
      });
      return {
        ...gameStats,
        teamsStats: updatedTeamsScore,
      };
    });
  }

  private updatePlayersOrder(): void {
    this.gameState.gameStats.update((currentStats): GameStats => {
      return {
        ...currentStats,
        teamsStats: currentStats.teamsStats.map(
          (team): Team => ({
            ...team,
            players: team.players.map((player: Player): Player => {
              const playOrder = player.playOrder === 1 ? 4 : player.playOrder - 1;
              return { ...player, playOrder: playOrder };
            }),
          }),
        ),
      };
    });
  }

  private getNextPlayerTurn(orderTurn: number): Player {
    return this.gameState.getPlayers().find((player: Player) => player.playOrder === orderTurn)!;
  }
}
