Module.register("MMM-SLMonitor", {
  defaults: {
    siteId: "9264", // default: Midsommarkransen
    updateInterval: 30 * 1000 // every 30 seconds
  },

  start() {
    this.departures = [];
    this.stopName = "";
    this.getData();
    this.scheduleUpdate();
    
  },

  scheduleUpdate() {
    setInterval(() => {
      this.getData();
    }, this.config.updateInterval);
  },

  getData() {
    const apiUrl = `https://transport.integration.sl.se/v1/sites/${this.config.siteId}/departures`;
    this.sendSocketNotification("GET_SL_DATA", apiUrl);
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "SL_DATA") {
      this.departures = payload.departures || [];
      this.stopName = this.departures[0]?.stop_area?.name || "";
      this.updateDom();
    }
  },

  getStyles() {
    return ["MMM-SLMonitor.css"];
  },

  getDom() {
    const wrapper = document.createElement("div");

    if (this.stopName) {
      const title = document.createElement("div");
      title.className = "bright medium sl-stop-name";
      title.innerText = this.stopName;
      wrapper.appendChild(title);
    }

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

      const time = new Date(dep.expected);
      const expected = time.toLocaleTimeString("sv-SE", { hour12: false });


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