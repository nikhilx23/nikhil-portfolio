@echo off
setlocal
cd /d "%~dp0"
set "PORTFOLIO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%PORTFOLIO_NODE%" goto ready
set "PORTFOLIO_NODE=node"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js, then reopen this file.
  pause
  exit /b 1
)
:ready
if not exist "node_modules\vite\bin\vite.js" (
  echo Dependencies are missing. Run npm install in this folder first.
  pause
  exit /b 1
)
echo Keep this window open while viewing your portfolio.
echo Your browser will open automatically. Use the Local address printed below.
"%PORTFOLIO_NODE%" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 4175 --open
echo.
echo The preview has stopped. If an error appears above, send a screenshot.
pause
