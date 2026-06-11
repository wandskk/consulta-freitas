Option Explicit

Dim shell, fso, appDir, tempDir, scriptPath, script

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

appDir = fso.GetParentFolderName(WScript.ScriptFullName)
tempDir = shell.ExpandEnvironmentStrings("%TEMP%")
scriptPath = fso.BuildPath(tempDir, "consulta-freitas-start.ps1")

script = ""
script = script & "$ErrorActionPreference = 'Continue'" & vbCrLf
script = script & "$Host.UI.RawUI.WindowTitle = 'Consulta Freitas - iniciando servidor'" & vbCrLf
script = script & "$AppDir = " & PowerShellQuote(appDir) & vbCrLf
script = script & "$Port = 3000" & vbCrLf
script = script & "$PidFile = Join-Path $AppDir '.next-start.pid'" & vbCrLf
script = script & "$BuildLog = Join-Path $AppDir '.app-build.log'" & vbCrLf
script = script & "$StartLog = Join-Path $AppDir '.next-start.log'" & vbCrLf
script = script & "$StartErr = Join-Path $AppDir '.next-start.err.log'" & vbCrLf
script = script & "$StatusLog = Join-Path $AppDir '.app-status.log'" & vbCrLf
script = script & "function Write-Status([string]$Message) {" & vbCrLf
script = script & "  $Line = ""[$((Get-Date).ToString('o'))] $Message""" & vbCrLf
script = script & "  Write-Host $Message" & vbCrLf
script = script & "  $Line | Add-Content -LiteralPath $StatusLog -Encoding utf8" & vbCrLf
script = script & "}" & vbCrLf
script = script & "function Stop-ProcessTree([int]$ProcessId) {" & vbCrLf
script = script & "  Get-CimInstance Win32_Process -Filter ""ParentProcessId = $ProcessId"" | ForEach-Object { Stop-ProcessTree ([int]$_.ProcessId) }" & vbCrLf
script = script & "  Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue" & vbCrLf
script = script & "}" & vbCrLf
script = script & "function Test-Port([int]$PortToTest) {" & vbCrLf
script = script & "  $Client = New-Object Net.Sockets.TcpClient" & vbCrLf
script = script & "  try {" & vbCrLf
script = script & "    $Async = $Client.BeginConnect('127.0.0.1', $PortToTest, $null, $null)" & vbCrLf
script = script & "    if (-not $Async.AsyncWaitHandle.WaitOne(500)) { return $false }" & vbCrLf
script = script & "    $Client.EndConnect($Async)" & vbCrLf
script = script & "    return $true" & vbCrLf
script = script & "  } catch {" & vbCrLf
script = script & "    return $false" & vbCrLf
script = script & "  } finally {" & vbCrLf
script = script & "    $Client.Close()" & vbCrLf
script = script & "  }" & vbCrLf
script = script & "}" & vbCrLf
script = script & "try {" & vbCrLf
script = script & "  Set-Location -LiteralPath $AppDir" & vbCrLf
script = script & "  $Npm = (Get-Command npm.cmd -ErrorAction Stop).Source" & vbCrLf
script = script & "  if (Test-Path -LiteralPath $PidFile) {" & vbCrLf
script = script & "    $ExistingPid = Get-Content -LiteralPath $PidFile -ErrorAction SilentlyContinue | Select-Object -First 1" & vbCrLf
script = script & "    if ($ExistingPid -and (Get-Process -Id ([int]$ExistingPid) -ErrorAction SilentlyContinue)) {" & vbCrLf
script = script & "      if (Test-Port $Port) {" & vbCrLf
script = script & "        Write-Status ""Aplicacao ja esta em execucao em http://localhost:$Port. PID: $ExistingPid""" & vbCrLf
script = script & "        Start-Sleep -Seconds 3" & vbCrLf
script = script & "        exit 0" & vbCrLf
script = script & "      }" & vbCrLf
script = script & "      Write-Status ""Processo antigo encontrado, encerrando PID $ExistingPid.""" & vbCrLf
script = script & "      Stop-ProcessTree ([int]$ExistingPid)" & vbCrLf
script = script & "    }" & vbCrLf
script = script & "    Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue" & vbCrLf
script = script & "  }" & vbCrLf
script = script & "  Write-Status 'Gerando build: npm run build'" & vbCrLf
script = script & "  & $env:ComSpec /d /s /c """"""$Npm"""" run build > """"""$BuildLog"""" 2>&1""" & vbCrLf
script = script & "  Get-Content -LiteralPath $BuildLog" & vbCrLf
script = script & "  if ($LASTEXITCODE -ne 0) { throw ""Build falhou com codigo $LASTEXITCODE. Veja .app-build.log"" }" & vbCrLf
script = script & "  Write-Status 'Build finalizado. Iniciando servidor oculto: npm run start'" & vbCrLf
script = script & "  $Process = Start-Process -FilePath $Npm -ArgumentList @('run','start') -WorkingDirectory $AppDir -WindowStyle Hidden -RedirectStandardOutput $StartLog -RedirectStandardError $StartErr -PassThru" & vbCrLf
script = script & "  $Process.Id | Set-Content -LiteralPath $PidFile -Encoding ascii" & vbCrLf
script = script & "  Write-Status ""Aguardando servidor responder em http://localhost:$Port ...""" & vbCrLf
script = script & "  $Deadline = (Get-Date).AddSeconds(90)" & vbCrLf
script = script & "  while ((Get-Date) -lt $Deadline) {" & vbCrLf
script = script & "    if ($Process.HasExited) { throw ""Servidor encerrou antes de iniciar. Veja .next-start.err.log"" }" & vbCrLf
script = script & "    if (Test-Port $Port) {" & vbCrLf
script = script & "      Write-Status ""Servidor iniciado em http://localhost:$Port. A janela sera ocultada.""" & vbCrLf
script = script & "      Start-Sleep -Seconds 3" & vbCrLf
script = script & "      exit 0" & vbCrLf
script = script & "    }" & vbCrLf
script = script & "    Write-Host '.' -NoNewline" & vbCrLf
script = script & "    Start-Sleep -Seconds 1" & vbCrLf
script = script & "  }" & vbCrLf
script = script & "  throw ""Servidor nao respondeu na porta $Port em 90 segundos. Veja .next-start.log e .next-start.err.log""" & vbCrLf
script = script & "} catch {" & vbCrLf
script = script & "  Write-Status ""ERRO: $($_.Exception.Message)""" & vbCrLf
script = script & "  Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue" & vbCrLf
script = script & "  Write-Host ''" & vbCrLf
script = script & "  Read-Host 'Pressione Enter para fechar'" & vbCrLf
script = script & "  exit 1" & vbCrLf
script = script & "}" & vbCrLf

WriteTextFile scriptPath, script
shell.Run "cmd.exe /c powershell.exe -NoProfile -ExecutionPolicy Bypass -File """ & scriptPath & """", 1, False

Function PowerShellQuote(value)
  PowerShellQuote = "'" & Replace(value, "'", "''") & "'"
End Function

Sub WriteTextFile(path, content)
  Dim file
  Set file = fso.CreateTextFile(path, True, False)
  file.Write content
  file.Close
End Sub
