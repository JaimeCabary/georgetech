#!/bin/bash
echo "Installing frontend dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "Installing backend dependencies..."
cd backend
npm install
cd ..
This setup will work perfectly for Render deployment. The build script will install both frontend and backend dependencies separately.

