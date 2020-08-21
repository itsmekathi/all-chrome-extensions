import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services';

@Component({
  selector: 'app-login-success',
  styleUrls: ['./login-success.component.scss'],
  templateUrl: './login-success.component.html',
})
export class LoginSuccessComponent implements OnInit {
  vaultUrl = '';
  constructor(private userService: UserService) {}
  async ngOnInit(): Promise<void> {
    this.vaultUrl = await this.userService.getOrganizationUrl();
  }
}
