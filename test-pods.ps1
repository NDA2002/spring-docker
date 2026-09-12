param (
    [int]$TotalHits = 10,
    [string]$GatewayUrl = "http://localhost:8000/api/pod-info"
)

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Kong Gateway Load Balancing Test (3 React Pods)         " -ForegroundColor Yellow
Write-Host "  Target URL : $GatewayUrl" -ForegroundColor Gray
Write-Host "  Total Hits : $TotalHits" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$podStats = @{}

for ($i = 1; $i -le $TotalHits; $i++) {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $raw = curl.exe -s --connect-timeout 2 $GatewayUrl
        $sw.Stop()
        $json = $raw | ConvertFrom-Json
        $pod = $json.pod
        $ms = $sw.ElapsedMilliseconds

        if (-not $podStats.ContainsKey($pod)) {
            $podStats[$pod] = 0
        }
        $podStats[$pod]++

        $podIdx = [array]::IndexOf([string[]]$podStats.Keys, $pod) + 1

        Write-Host "Hit #$($i.ToString('00')) -> " -NoNewline -ForegroundColor White
        Write-Host "Pod $podIdx [$pod] " -NoNewline -ForegroundColor Cyan
        Write-Host "($ms ms)" -ForegroundColor DarkGray
    }
    catch {
        Write-Host "Hit #$($i.ToString('00')) -> Gateway request failed" -ForegroundColor Red
    }
    Start-Sleep -Milliseconds 150
}

Write-Host ""
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "Traffic Distribution Summary:" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

foreach ($entry in $podStats.GetEnumerator()) {
    $count = $entry.Value
    $pct = [Math]::Round(($count / $TotalHits) * 100)
    $barLength = [Math]::Max(1, [int]($pct / 5))
    $bar = "=" * $barLength
    Write-Host "  $($entry.Key) : $count hits ($pct%) " -NoNewline -ForegroundColor Green
    Write-Host "[$bar]" -ForegroundColor Yellow
}
Write-Host ""
