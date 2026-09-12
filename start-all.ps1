# 🚀 1-Click Startup & Test Script for React + Kong Gateway + Kubernetes
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting Kubernetes 3-Pod Deployment & Kong Gateway     " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Apply Kubernetes manifests
Write-Host "[1/3] Applying Kubernetes manifests..." -ForegroundColor Green
kubectl apply -f k8s/react-deployment.yaml
kubectl apply -f k8s/kong-ingress.yaml

# 2. Show running pods
Write-Host ""
Write-Host "[2/3] Checking 3 React Pods..." -ForegroundColor Green
kubectl get pods -l app=react-app -o wide

# 3. Check / Start Port-Forward for Kong
Write-Host ""
Write-Host "[3/3] Testing Kong Gateway Connection (Port 8000)..." -ForegroundColor Green
$testPort = Test-NetConnection -ComputerName localhost -Port 8000 -InformationLevel Quiet

if (-not $testPort) {
    Write-Host "Kong Gateway is not forwarded yet on :8000." -ForegroundColor Yellow
    Write-Host "Starting background port-forward on port 8000..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "kubectl port-forward -n kong svc/kong-gateway-proxy 8000:80" -WindowStyle Minimized
    Start-Sleep -Seconds 3
} else {
    Write-Host "Kong Gateway is already ACTIVE on http://localhost:8000!" -ForegroundColor Green
}

# 4. Run Load Balancing Test
Write-Host ""
Write-Host "Running 6 Test Hits across 3 Pods:" -ForegroundColor Yellow
& .\test-pods.ps1 -TotalHits 6

Write-Host ""
Write-Host ">> You can view the Live React App in Browser at: http://localhost:8000/" -ForegroundColor Cyan
Write-Host ""
