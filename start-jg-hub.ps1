# Keep the JG Hub prototype server running on http://127.0.0.1:4173/
$ErrorActionPreference = 'SilentlyContinue'
$node = 'C:\Users\46198\AppData\Local\Doubao\User Data\sandbox_runtime\bases\772984f6fd3a8ae0ae7d2422cd7c2bfa\node\node.exe'
$wd = 'D:\project-test3\jg-hub'
$outLog = 'D:\project-test3\.build\srv-auto.log'
$errLog = 'D:\project-test3\.build\srv-auto.err.log'

if (-not (Test-Path -LiteralPath $node)) {
  $node = (Get-Command node.exe).Source
}

while ($true) {
  $listening = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue
  if (-not $listening) {
    Start-Process -FilePath $node -ArgumentList 'server.mjs' -WorkingDirectory $wd -WindowStyle Hidden -RedirectStandardOutput $outLog -RedirectStandardError $errLog
  }
  Start-Sleep -Seconds 20
}
