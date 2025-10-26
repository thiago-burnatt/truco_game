import { Card, GameStats, initialState, Player, Score, Team, TeamScore } from './cards.const';
import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  public gameStats: WritableSignal<GameStats> = signal(initialState);

  public getGameStats(): Signal<GameStats> {
    return this.gameStats.asReadonly();
  }

  public getScore: Signal<TeamScore[]> = computed((): TeamScore[] =>
    this.gameStats().teamsStats.map(
      (team: Team): TeamScore => ({ teamName: team.name, score: team.score }),
    ),
  );

  public getPlayer1: Signal<Player> = computed(
    (): Player => this.gameStats().teamsStats[0].players[0],
  );

  public getPlayer2: Signal<Player> = computed(
    (): Player => this.gameStats().teamsStats[1].players[0],
  );

  public getPlayer3: Signal<Player> = computed(
    (): Player => this.gameStats().teamsStats[0].players[1],
  );

  public getPlayer4: Signal<Player> = computed(
    (): Player => this.gameStats().teamsStats[1].players[1],
  );

  public getPlayers: Signal<Player[]> = computed((): Player[] =>
    this.gameStats().teamsStats.flatMap((team: Team): Player[] => team.players),
  );
}
