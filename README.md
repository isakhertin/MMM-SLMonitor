# MMM-SLDepartures

A MagicMirror² module that shows live metro departures using SL’s public transport API.

## 🔧 Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/yourusername/MMM-SLDepartures.git
cd MMM-SLDepartures
npm install node-fetch@2
```

## 📋 Configuration

Add the module to your `config.js`:

```js
{
  module: "MMM-SLDepartures",
  position: "top_left",
  config: {
    siteId: "9264",         // SL Site ID for your metro station
    updateInterval: 60000   // Update frequency in milliseconds (default: 60 seconds)
  }
}
```

## 🧭 SL Site IDs (Examples)

| Station Name        | Site ID |
|---------------------|---------|
| Midsommarkransen    | 9264    |
| Slussen             | 9105    |
| T-Centralen         | 9300    |
| Fridhemsplan        | 9322    |
| Odenplan            | 9320    |
| Gullmarsplan        | 9327    |
| Skanstull           | 9326    |
| Zinkensdamm         | 9266    |
| Hornstull           | 9265    |
| Liljeholmen         | 9263    |
| Fruängen            | 9283    |
| Mörby Centrum       | 9231    |

You can find more site IDs by using SL’s API or network inspector on their real-time departure tools.

## 📦 Output Format

The module displays a table with the following columns:
- **Line** – Metro line number
- **Destination** – Where the train is going
- **Expected** – Expected departure time (e.g., `18:13:35`)
- **Direction** – Direction label from SL API

## ✅ To Do

- [ ] Color-coded lines (red, green, blue)
- [ ] Countdown mode (e.g., “in 3 min”)
- [ ] Show platform numbers
- [ ] Add icons for line directions

---
Made for Stockholm metro ❤️
