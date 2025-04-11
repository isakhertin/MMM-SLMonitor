Module.register("MMM-SLMonitor", {
  defaults: {
    siteId: "9264", // default: Midsommarkransen
    updateInterval: 30 * 1000, // every 30 seconds
    maxRows: 10 // max number of departures to show
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
    this.config.columns.forEach(col => {
      const th = document.createElement("th");
      th.innerText = this.getColumnLabel(col);
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    this.departures.slice(0, this.config.maxRows).forEach(dep => {
      const row = document.createElement("tr");
    
      this.config.columns.forEach(col => {
        const td = document.createElement("td");
        td.innerText = this.formatColumnValue(dep, col);
        row.appendChild(td);
      });
    
      table.appendChild(row);
    });

    wrapper.appendChild(table);
    return wrapper;
  },
  
  getColumnLabel(col) {
    const map = {
      line: "Line",
      destination: "Destination",
      expected: "Expected",
      direction: "Direction",
      display: "Display"
    };
    return map[col] || col;
  },
  
  formatColumnValue(dep, col) {
    switch (col) {
      case "line":
        return dep.line?.designation || "";
        case "destination":
          return dep.destination || "";
          case "expected":
            if (dep.expected) {
              const time = new Date(dep.expected);
              return time.toLocaleTimeString("sv-SE", { hour12: false });
            }
            return "";
            case "display":
              return dep.display || "";
              case "direction":
                return dep.direction || "";
                default:
                  return "";
                }
              }
  });