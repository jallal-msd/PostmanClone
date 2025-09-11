import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('PostmanClone');
  constructor() { }
  ngOnInit(): void {

  }
  data: any
  url: string = ""


  callHttpRequest() {
    console.log(this.url)
    this.httpRequest(this.url)
  }
  async httpRequest(url: string) {

    try {
      const res = await fetch(url, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Response status : ${res.status}`);
      }
      this.data = await res.json();
      console.log(this.data);
      this.data = JSON.stringify(this.data, null, 4)
    } catch (err: any) {
      console.error(err.message);
    }

  }
}
