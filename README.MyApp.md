# MyApp Full Stack

## 1) Run SQL Script
1. Open SQL Server Management Studio.
2. Connect to your SQL Server instance.
3. Run: `sql/myapp.sql`.

## 2) Run Backend
```bash
cd backend/MyApp.API
dotnet restore
dotnet run
```
API base URL: `https://localhost:7138`.

## 3) Run Frontend
```bash
cd frontend/myapp-react
npm install
npm run dev
```
Frontend URL: `http://localhost:5173`.

## 4) IIS Publish
```bash
cd backend/MyApp.API
dotnet publish -c Release /p:PublishProfile=IISProfile
```
Published output folder:
`backend/MyApp.API/bin/Release/net8.0/publish/iis/`

## Default Master Admin
- Email: `master@admin.com`
- Password: `Admin@123`
- Role: `MasterAdmin`

On startup, backend auto-seeds MasterAdmin if missing.
