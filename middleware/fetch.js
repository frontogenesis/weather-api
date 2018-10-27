const fetch = require('node-fetch');

// class ApiRequest {
//   post(url = ``, data = {}) {
//     return fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json' },
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Something went bad');
//       }
//     })
//     .catch(console.error)
//   };
//   get(url = ``) {
//     return fetch(url)
//       .then(response => response.json())
//   };
// }

class ApiRequest {
  async post(url = ``, data = {}) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      return response.json();
    } catch(error) {
      throw new Error('Send 400 error back');
    }
  };
  async get(url = ``) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch(error) {
      throw new Error('Send 400 error back')
    }
  };
}

module.exports = { ApiRequest };