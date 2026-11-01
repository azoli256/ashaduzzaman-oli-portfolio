@echo off
set "PATH=C:\Users\Ashaduzzaman Oli\Downloads\PortableGit\cmd;%PATH%"
cd /d E:\ashaduzzaman-oli-portfolio || (echo Project folder not found. & pause & exit /b 1)

git --version
if errorlevel 1 (
  echo Git was not found.
  pause
  exit /b 1
)

if not exist .git git init
echo upload-to-github.bat>> .git\info\exclude

git config user.name "Ashaduzzaman Oli"
git config user.email "a.zaman25oli@gmail.com"

git add .
git commit -m "Initial portfolio version"
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/azoli256/ashaduzzaman-oli-portfolio.git
git push -u origin main
git checkout -b redesign-futuristic

echo.
echo Done. Check https://github.com/azoli256/ashaduzzaman-oli-portfolio
pause
