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
  data: [any] = [""]
  url: string = ""
  selectedMethod: string = ""
  file: any
  call: any
  calls: [any] = [[]]

  fileChanged(e: any) {
    this.file = e.target.files[0]
    this.uploadFile(this.file)
  }

  uploadFile(file: any) {
    let fr = new FileReader();
    fr.onload = (e) => {
      console.log("result", fr.result)
      this.readFile(fr.result)
    }
    fr.readAsText(file)
  }

  readFile(file: any) {
    let line = file.split('\n')
    console.log("line", line)

    line.forEach((ln: any) => {
      this.call = ln.split("|")
      this.calls.push(this.call)
    })
    console.log("here", this.calls)

  }
  callHttpRequest() {
    // for (let j = 0; j < this.call.length; j++) {
    //   this.url = this.call[1].trim()
    //   this.selectedMethod = this.call[0].trim()
    // }
    this.calls.forEach((call) => {
      if (call.length > 1) {
        console.log("here i am ", call)
        this.url = call[1].trim()
        this.selectedMethod = call[0].trim()
        console.log(this.url)
        console.log(this.selectedMethod)
        this.httpRequest(this.url, this.selectedMethod)

        this.data = [""]
        this.calls = [[]]
      }
      // this.url = call[1].trim()
      // this.selectedMethod = call[0].trim()
      //
      // console.log(this.url)
      // console.log(this.selectedMethod)
    })

    console.log(this.url)
    console.log(this.selectedMethod)
    // this.httpRequest(this.url, this.selectedMethod)
  }
  async httpRequest(url: string, method: string) {

    try {
      const res = await fetch(url, {
        method: method,
      });
      if (!res.ok) {
        // this.status = "Response status :" + res.status
        throw new Error(`Response status : ${res.status}`);
      }
      let data = await res.json();
      console.log(data);
      this.data.push(JSON.stringify(data, null, 4))
      console.log(this.data)

    } catch (err: any) {
      console.error(err.message);
    }
  }
}
