export function sendRequest(
    method,
    url,
    token = null,
    body = null
  ) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open(method, url);
      xhr.setRequestHeader( "Access-Control-Allow-Origin", "*")
      xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")  
      xhr.responseType = "json";
      if (token) {
        xhr.setRequestHeader("authorization", `${token}`);
      }
      if (body !== null)
        xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
  
      xhr.onerror = () => {
        reject(xhr.response);
      };
  
      if(body !== null)
        xhr.send(JSON.stringify(body));
      else 
        xhr.send()
    });
  }