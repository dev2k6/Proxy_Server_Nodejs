# Node.js Forward Proxy Server

A lightweight, cross-platform Forward HTTP/HTTPS Proxy server written in Node.js using `proxy-chain`.

It supports Basic Authentication (Username/Password) and automatically attempts to configure system firewalls (Windows, Linux, macOS) to open the proxy port for incoming connections, making it easy to deploy on VPS or share with others over a network.

## Features

- **HTTP/HTTPS Proxy**: Forwards HTTP and HTTPS tunneling requests.
- **Basic Authentication**: Built-in credential checks to restrict access.
- **Cross-Platform Firewall Auto-config**: Automatically attempts to open ports dynamically on:
  - Windows (`netsh advfirewall`)
  - Linux (`ufw`, `iptables`, `firewall-cmd`)
  - macOS (Triggers system popup)
- **Extremely Lightweight**: Built on top of the robust `proxy-chain` library without heavy dependencies.

## Prerequisites

- **Node.js**: v14 or newer.
- **Administrative Privileges**: Recommended to run the server as Administrator (Windows) or Root (Linux) to allow the automatic firewall configuration steps to succeed.

## Installation

1. Clone or download this project.
2. Install dependencies:

```bash
npm install
```

## Configuration

Editing proxy parameters can be done entirely at the top of the `index.js` file:

```javascript
// ================= CONFIGURATION =================
const PORT = 10888; // Proxy server port
const USERNAME = "thainguyen"; // Username
const PASSWORD = "password123"; // Password
// ============================================
```

_(Make sure to change the credentials to your own secure username & password)._

## Usage

Start the proxy server using Node.js:

```bash
node index.js
```

The console will display log messages indicating the successful startup and whether the firewall was successfully updated.

**Example log output:**

```
[INFO] Forward Proxy (Standard HTTP/HTTPS) is running on port 10888
[INFO] Authentication: Username=thainguyen
[INFO] Usage: Configure browser or IP changer tool with YOUR_IP:10888
[INFO] Successfully opened port 10888 publicly on Windows Firewall.
```

## Connecting to the Proxy

Once the server is running on a machine (e.g., your VPS with IP `203.0.113.5`), you can connect to it from another machine/browser:

- **Host / IP**: `203.0.113.5`
- **Port**: `10888`
- **Username**: `thainguyen`
- **Password**: `password123`

You can use standard OS proxy settings, or browser extensions like [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbodaiddknhamobkghodd) to easily set this up.

## License

ISC
