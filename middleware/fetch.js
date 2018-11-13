const fetch = require('node-fetch');

class ApiRequest {
  constructor(url) { this.url = decodeURI(url) };
  async post(data = {}) {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(JSON.stringify({ message: 'Unable to retrieve data' }));
    }
  };
  async get() {
    const response = await fetch(this.url);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error({ message: 'Unable to retrieve data' });
    }
  };
};

module.exports = { ApiRequest };