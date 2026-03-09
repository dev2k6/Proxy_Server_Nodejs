const ProxyChain = require('proxy-chain');
const { exec } = require('child_process');
const os = require('os');

// ================= CONFIGURATION =================
const PORT = 10888;                         // Proxy server port
const USERNAME = 'thainguyen';                   // Username
const PASSWORD = '0333349948';             // Password
// ============================================

const server = new ProxyChain.Server({
    port: PORT,
    host: '0.0.0.0', // Listen on all interfaces/public IPs
    
    // Enable verbose logging (optional)
    verbose: false,

    // Authentication function for each request
    prepareRequestFunction: ({ request, username, password }) => {
        // Check if the request has Auth credentials
        if (username !== USERNAME || password !== PASSWORD) {
            // Reject and require Basic Auth
            return {
                requestAuthentication: true,
                failMsg: 'Invalid proxy username or password',
            };
        }

        // Correct credentials, allow proxy to proceed
        return {
            requestAuthentication: false,
        };
    },
});

server.listen(() => {
    console.log(`[INFO] Forward Proxy (Standard HTTP/HTTPS) is running on port ${PORT}`);
    console.log(`[INFO] Authentication: Username=${USERNAME}`);
    console.log(`[INFO] Usage: Configure browser or IP changer tool with YOUR_IP:${PORT}`);
    
    // Automatically attempt to open port on Firewall based on the OS (Requires Admin/root privileges)
    const platform = os.platform();
    
    if (platform === 'win32') {
        const ruleName = `Nodejs_Proxy_${PORT}`;
        const cmd = `netsh advfirewall firewall add rule name="${ruleName}" dir=in action=allow protocol=TCP localport=${PORT}`;
        exec(cmd, (error) => {
            if (error) {
                console.log(`[WARN] Cannot automatically configure Windows Firewall (Administrator privileges required). Run Terminal as Admin.`);
            } else {
                console.log(`[INFO] Successfully opened port ${PORT} publicly on Windows Firewall.`);
            }
        });
    } else if (platform === 'linux') {
        const cmd = `ufw allow ${PORT}/tcp || iptables -A INPUT -p tcp --dport ${PORT} -j ACCEPT || firewall-cmd --add-port=${PORT}/tcp`;
        exec(cmd, (error) => {
            if (error) {
                console.log(`[WARN] Cannot automatically configure Linux Firewall (root/sudo privileges required, or unsupported firewall tool).`);
            } else {
                console.log(`[INFO] Successfully opened port ${PORT} publicly on Linux Firewall.`);
            }
        });
    } else if (platform === 'darwin') {
        console.log(`[INFO] On macOS, a system popup may ask to allow incoming connections. Please click "Allow".`);
    } else {
        console.log(`[INFO] Using OS: ${platform}. Please ensure port ${PORT} is manually opened in your system firewall.`);
    }
});

// Catch internal proxy errors (optional)
server.on('proxyError', ({ request, error }) => {
    console.error(`[ERROR] Proxy forwarding failed for request ${request.url}:`, error.message);
});
