Option Explicit

Dim shell, fso, appDir, tempDir, scriptPath, script

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

appDir = fso.GetParentFolderName(WScript.ScriptFullName)
tempDir = shell.ExpandEnvironmentStrings("%TEMP%")
scriptPath = fso.BuildPath(tempDir, "consulta-freitas-stop.ps1")

script = ""
script = script & "$ErrorActionPreference = 'SilentlyContinue'" & vbCrLf
script = script & "$AppDir = " & PowerShellQuote(appDir) & vbCrLf
script = script & "$PidFile = Join-Path $AppDir '.next-start.pid'" & vbCrLf
script = script & "$StatusLog = Join-Path $AppDir '.app-status.log'" & vbCrLf
script = script & "function Write-Status([string]$Message) { ""[$((Get-Date).ToString('o'))] $Message"" | Add-Content -LiteralPath $StatusLog -Encoding utf8 }" & vbCrLf
script = script & "function Stop-ProcessTree([int]$ProcessId) {" & vbCrLf
script = script & "  Get-CimInstance Win32_Process -Filter ""ParentProcessId = $ProcessId"" | ForEach-Object { Stop-ProcessTree ([int]$_.ProcessId) }" & vbCrLf
script = script & "  Stop-Process -Id $ProcessId -Force" & vbCrLf
script = script & "}" & vbCrLf
script = script & "$Stopped = $false" & vbCrLf
script = script & "if (Test-Path -LiteralPath $PidFile) {" & vbCrLf
script = script & "  $SavedPid = Get-Content -LiteralPath $PidFile | Select-Object -First 1" & vbCrLf
script = script & "  if ($SavedPid -and (Get-Process -Id ([int]$SavedPid))) {" & vbCrLf
script = script & "    Stop-ProcessTree ([int]$SavedPid)" & vbCrLf
script = script & "    $Stopped = $true" & vbCrLf
script = script & "    Write-Status ""Aplicacao parada. PID: $SavedPid""" & vbCrLf
script = script & "  }" & vbCrLf
script = script & "  Remove-Item -LiteralPath $PidFile -Force" & vbCrLf
script = script & "}" & vbCrLf
script = script & "if (-not $Stopped) {" & vbCrLf
script = script & "  $AppPattern = [regex]::Escape($AppDir)" & vbCrLf
script = script & "  Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match $AppPattern -and $_.CommandLine -match 'npm|next' } | ForEach-Object {" & vbCrLf
script = script & "    Stop-ProcessTree ([int]$_.ProcessId)" & vbCrLf
script = script & "    $Stopped = $true" & vbCrLf
script = script & "  }" & vbCrLf
script = script & "}" & vbCrLf
script = script & "if ($Stopped) { Write-Status 'Comando de parada concluido.' } else { Write-Status 'Nenhuma aplicacao em execucao foi encontrada.' }" & vbCrLf

WriteTextFile scriptPath, script
shell.Run "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & scriptPath & """", 0, False

Function PowerShellQuote(value)
  PowerShellQuote = "'" & Replace(value, "'", "''") & "'"
End Function

Sub WriteTextFile(path, content)
  Dim file
  Set file = fso.CreateTextFile(path, True, False)
  file.Write content
  file.Close
End Sub
