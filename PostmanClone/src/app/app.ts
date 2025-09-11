import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('PostmanClone');
  constructor() { }
  ngOnInit(): void {

  }
  data: any
  async httpRequest() {
    console.log("I am here")
    try {
      const res = await fetch("https://api.zippopotam.us/us/33161", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Response status : ${res.status}`);
      }

      this.data = await res.json();
      console.log(this.data);
      this.data = JSON.stringify(this.data)
    } catch (err: any) {
      console.error(err.message);
    }

  }
}
