@echo off
echo Starting Git deployment process...

echo Step 1: Running 'git add .'
git add .
if %errorlevel% neq 0 (
    echo Error: git add failed!
    pause
    exit /b 1
)

echo Step 2: Running git commit...
git commit -m "Move files to root for Render deployment"
if %errorlevel% neq 0 (
    echo Error: git commit failed!
    pause
    exit /b 1
)

echo Step 3: Pushing to origin main...
git push origin main
if %errorlevel% neq 0 (
    echo Error: git push failed!
    pause
    exit /b 1
)

echo Success: All Git commands executed successfully!
pause