import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavLinksService {
  private navLinksSubject = new BehaviorSubject<
    { label: string; url: string }[]
  >([]);
  navLinks$ = this.navLinksSubject.asObservable();

  setNavLinks(links: { label: string; url: string }[]) {
    this.navLinksSubject.next(links);
  }
}
