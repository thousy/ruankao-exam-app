# Antigravity 终端代理配置脚本
# 代理地址: SOCKS5 127.0.0.1:1080

$proxyAddr = "socks5://127.0.0.1:1080"

$env:HTTP_PROXY = $proxyAddr
$env:HTTPS_PROXY = $proxyAddr
$env:ALL_PROXY = $proxyAddr

Write-Host "已为当前 Antigravity 会话配置代理: $proxyAddr" -ForegroundColor Cyan
