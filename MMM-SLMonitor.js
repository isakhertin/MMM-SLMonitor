Module.register("MMM-SLMonitor", {
  defaults: {
    apiUrl: "https://transport.integration.sl.se/v1/sites/9264/departures",
    updateInterval: 60 * 1000 // every 60 seconds
  },

  start() {
    this.departures = [];
    this.getData();
    this.scheduleUpdate();
  },

  scheduleUpdate() {
    setInterval(() => {
      this.getData();
    }, this.config.updateInterval);
  },

  getData() {
    this.sendSocketNotification("GET_SL_DATA", this.config.apiUrl);
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "SL_DATA") {
      this.departures = payload.departures || [];
      this.updateDom();
    }
  },

  getStyles() {
    return ["MMM-SLMonitor.css"];
  },

  getDom() {
    const wrapper = document.createElement("div");

    const table = document.createElement("table");
    table.className = "small sl-table";

    const headerRow = document.createElement("tr");
    ["Line", "Destination", "Display", "Direction","Expected"].forEach(header => {
      const th = document.createElement("th");
      th.innerText = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    this.departures.forEach(dep => {
      const row = document.createElement("tr");

      const line = dep.line?.designation || "";
      const destination = dep.destination || "";
      const display = dep.display || "";
      const direction = dep.direction || "";
      const expected = dep.expected || "";

      [line, destination, display, direction, expected].forEach(text => {
        const td = document.createElement("td");
        td.innerText = text;
        row.appendChild(td);
      });

      table.appendChild(row);
    });

    wrapper.appendChild(table);
    return wrapper;
  }
});