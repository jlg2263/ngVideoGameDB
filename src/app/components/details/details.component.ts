import { HttpService } from './../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Subscriber } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit, OnDestroy
{
  game: Game;
  gameId: string;
  gameRating = 0;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void 
  {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getColor(value: number):string
  {
    if (value > 75)
    {
      return '#5ee432';
    }
    else if (value > 50)
    {
      return '#fffa50';
    }
    else if (value > 30)
    {
      return '#f7aa38';
    }
    else
    {
      return '#ef4655';
    }
  }

  getGameDetails(id: string):void 
  {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameRs: Game) =>
    { 
      this.game = gameRs;

      setTimeout(() => 
      {
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
  }

  ngOnDestroy(): void
  {
    if (this.gameSub)
    {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub)
    {
      this.routeSub.unsubscribe();
    }
  }
}
