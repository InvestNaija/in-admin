import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Kunle Coker', points: 3925 },
  { position: 2, name: 'Nengi Hampson', points: 3243 },
  { position: 3, name: 'Benson Idashosa', points: 2945 },
  { position: 4, name: 'Doja Kabiru', points: 2546 },
  { position: 5, name: 'Sylvester Ayodele', points: 1982 },
  { position: 6, name: 'Linda Pedro', points: 847 },
  // { position: 1, name: 'Kunle Coker', points: 3925 },
  // { position: 2, name: 'Nengi Hampson', points: 3243 },
  // { position: 3, name: 'Benson Idashosa', points: 2945 },
  // { position: 4, name: 'Doja Kabiru', points: 2546 },
  // { position: 1, name: 'Kunle Coker', points: 3925 },
  // { position: 2, name: 'Nengi Hampson', points: 3243 },
  // { position: 3, name: 'Benson Idashosa', points: 2945 },
  // { position: 4, name: 'Doja Kabiru', points: 2546 },
  // { position: 1, name: 'Kunle Coker', points: 3925 },
  // { position: 2, name: 'Nengi Hampson', points: 3243 },
  // { position: 3, name: 'Benson Idashosa', points: 2945 },
  // { position: 4, name: 'Doja Kabiru', points: 2546 },
];
@Component({
  selector: 'in-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})

export class LeaderboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'points'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
}
