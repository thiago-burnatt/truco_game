import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameEngineComponent } from './game-engine/game-engine.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameEngineComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('truco-game');
}
