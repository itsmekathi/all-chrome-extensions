import { OnInit, OnDestroy, Component } from '@angular/core';
import { PageLoaderService } from '../../shared/services/page-loader.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private pageLoaderService: PageLoaderService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.pageLoaderService.showPageLoader();
    if (await this.userService.isLogged()) {
      this.router.navigateByUrl(`/passwords`, { skipLocationChange: true });
    } else {
      this.router.navigateByUrl(`/login`, { skipLocationChange: true });
    }
  }
  ngOnDestroy(): void {
    this.pageLoaderService.hidePageLoader();
  }
}
