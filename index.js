async function httpRequest(url, method) {
  try {
    const res = await fetch(url, {
      method: method,
    });
    if (!res.ok) {
      throw new Error(`Response status : ${res.status}`);
    }

    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
}

let url = "https://api.zippopotam.us/us/33161";
httpRequest(url, "POST");
