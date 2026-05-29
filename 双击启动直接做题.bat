@echo off
chcp 65001 >nul
echo =======================================
echo 正在启动软考题库系统...
echo 请不要关闭此黑色窗口！
echo =======================================

echo 正在自动打开浏览器...
start http://localhost:8080/

echo 正在启动本地服务器以支持 Excel 读取...
python -m http.server 8080
