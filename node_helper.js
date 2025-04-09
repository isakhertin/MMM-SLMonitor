const NodeHelper = require("node_helper");
const fetch = require("node-fetch"); // node-fetch@2 works with require

module.exports = NodeHelper.create({
  start() {
    console.log("NodeHelper for MMM-SLDepartures started");
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "GET_SL_DATA") {
      fetch(payload)
        .then(res => res.json())
        .then(data => {
          this.sendSocketNotification("SL_DATA", data);
        })
        .catch(err => {
          console.error("SL API error:", err);
        });
    }
  }
});