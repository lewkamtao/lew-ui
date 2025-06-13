@echo off
chcp 65001 > nul
echo 正在启动文件整理工具...
powershell.exe -ExecutionPolicy Bypass -File "%~dp0FileOrganizer.ps1" 