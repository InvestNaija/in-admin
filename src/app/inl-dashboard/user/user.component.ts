import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'in-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tabbedPages = [
    { page: 'page', url: '/dashboard/user' },
    { page: 'nok', url: '/dashboard/user/nok' },
    { page: 'password', url: '/dashboard/user/password' },
    { page: 'socials', url: '/dashboard/user/socials' },
    { page: 'documents', url: '/dashboard/user/documents' },
    { page: 'banks', url: '/dashboard/user/banks' }
  ]
  selectedIndex = 0;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe(params => {
      this.selectedIndex = this.tabbedPages.map(p=> p.page).indexOf(params.get('page'));
    })
  }
  setIndex(event) {
    this.router.navigateByUrl(this.tabbedPages[event].url);
  }

}
