@echo off
rem Arcana Helper as an app: its own window, no browser. Double-click to start.
rem The first time it installs what it needs (a few minutes, once). Start-Arcana-Helper.bat still opens it in the browser.
title Arcana Helper
cd /d "%~dp0desktop"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Arcana Helper needs Node.js. Install the LTS version from https://nodejs.org
  echo  then double-click this file again.
  echo.
  start "" https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\electron\dist\electron.exe" (
  echo  First start: installing the app's parts. This takes a few minutes, once.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo  The install didn't finish. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

rem Newer npm (11.x) doesn't run packages' install steps unless approved, so Electron's own download of its program
rem can be skipped ("Windows cannot find node_modules\electron\dist\electron.exe"). Fetch it directly.
if not exist "node_modules\electron\dist\electron.exe" (
  echo  Downloading Electron, the program the app runs in. This takes a minute, once.
  call node node_modules\electron\install.js
)
if not exist "node_modules\electron\dist\electron.exe" (
  echo.
  echo  Electron couldn't be downloaded. Check your internet connection, then double-click this file again.
  echo  If it keeps failing, delete the folder desktop\node_modules and try once more.
  pause
  exit /b 1
)

rem start the app on its own and close this window
start "" "node_modules\electron\dist\electron.exe" . %*
exit /b 0
