const data = {
  api: {
    stream: {
      port: 3001,
      baseURL: `http://localhost`,
      resource: 'streams',
      getURL() {
        return `${this.baseURL}:${this.port}`
      }
    }
  }
}

export default data;