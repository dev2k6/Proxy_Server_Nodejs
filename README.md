# 🌐 Proxy Server Node.js

> A lightweight Forward HTTP/HTTPS Proxy Server with built-in authentication and automatic firewall configuration — by **Thai Nguyen IT**.

## ✨ Features

- 🔀 HTTP & HTTPS tunneling proxy (CONNECT method)
- 🔐 Basic Authentication (Username / Password)
- 🛡️ Auto firewall port opening:
  - **Windows** — `netsh advfirewall`
  - **Linux** — `ufw` / `iptables` / `firewall-cmd`
  - **macOS** — System popup prompt
- ⚡ Ultra lightweight — single dependency on [`proxy-chain`](https://www.npmjs.com/package/proxy-chain)

## 📋 Prerequisites

| Component | Version              |
| --------- | -------------------- |
| Node.js   | ≥ 14.x               |
| npm       | Bundled with Node.js |

> **Note:** Run with **Administrator** (Windows) or **root/sudo** (Linux) privileges for automatic firewall configuration to succeed.

## 🚀 Installation & Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/dev2k6/Proxy_Server_Nodejs.git
cd Proxy_Server_Nodejs

# 2. Install dependencies
npm install

# 3. Start the proxy server
node index.js
```

## ⚙️ Configuration

Edit the configuration block at the top of `index.js`:

```javascript
// ================= CONFIGURATION =================
const PORT = 10888; // Proxy server port
const USERNAME = "thainguyen"; // Auth username
const PASSWORD = "your_pass"; // Auth password (change this!)
// ============================================
```

> ⚠️ **Important:** Always change `USERNAME` and `PASSWORD` to your own secure credentials before deploying to a server.

## 📡 Connecting to the Proxy

Once the server is running (e.g., on a VPS with IP `203.0.113.5`), configure your client:

| Field    | Value             |
| -------- | ----------------- |
| Host     | `YOUR_VPS_IP`     |
| Port     | `10888`           |
| Username | _(as configured)_ |
| Password | _(as configured)_ |

### Connection Methods

- **Browser Extension:** Use [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbodaiddknhamobkghodd)
- **System Settings:** Configure proxy under Settings → Network → Proxy
- **Terminal / CLI:**
  ```bash
  export http_proxy=http://username:password@YOUR_IP:10888
  export https_proxy=http://username:password@YOUR_IP:10888
  ```

## 📝 Example Log Output

```
[INFO] Forward Proxy (Standard HTTP/HTTPS) is running on port 10888
[INFO] Authentication: Username=thainguyen
[INFO] Usage: Configure browser or IP changer tool with YOUR_IP:10888
[INFO] Successfully opened port 10888 publicly on Windows Firewall.
```

## 📁 Project Structure

```
Proxy_Server_Nodejs/
├── index.js        # Entry point — all proxy server logic
├── package.json    # Project metadata & dependencies
├── node_modules/   # Installed packages (auto-generated)
└── README.md       # Documentation
```

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Core Library:** [proxy-chain](https://www.npmjs.com/package/proxy-chain) v2.7.1

## 📄 License

ISC © [Thai Nguyen IT](https://github.com/dev2k6)
