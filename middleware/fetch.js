const fetch = require('node-fetch')
const convert = require('xml-js')

class ApiRequest {
  constructor(url) { this.url = url };
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

  async getXML() {
    const response = await fetch(this.url)

    // Get XML and convert to JSON
    if (response.ok) {
      const xml = await response.text()
      return convert.xml2json(xml, { compact: true, spaces: 2, sanitize: false})
    } else {
      throw new Error({ message: 'A server error occurred' })
    }
  }
};

module.exports = { ApiRequest };