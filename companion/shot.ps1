# Arcana Helper: pictures of the game window, on request.
# Reads one request per line on stdin:  <id> TAB <path.jpg> TAB <maxWidth> [TAB <path.bmp>]
# (with a .bmp path it also saves an uncompressed copy, for the screen reader; the companion deletes it after reading)
# Answers one line per request:          <id> OK <width> <height> <how>   or   <id> ERR <reason>
# Same way as the Vorax Helper: PrintWindow(PW_CLIENTONLY | PW_RENDERFULLCONTENT) gives the window's own picture
# even when something is over it; if that comes back black, the screen area of the window is copied instead
# (only when the game is in front, so nothing else ends up in the picture).
param([string]$Title = '^Torchlight: Infinite\s*$')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class ArcanaWin {
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
  [StructLayout(LayoutKind.Sequential)] public struct POINT { public int X, Y; }
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr h, ref POINT p);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h, IntPtr hdc, uint flags);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
}
"@
[ArcanaWin]::SetProcessDPIAware() | Out-Null
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

function Find-Game {
  Get-Process | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero -and $_.MainWindowTitle -match $Title } | Select-Object -First 1
}
function Is-Black($bmp) {
  $lit = 0
  for ($y = 8; $y -lt $bmp.Height; $y += [Math]::Max(1, [int]($bmp.Height / 24))) {
    for ($x = 8; $x -lt $bmp.Width; $x += [Math]::Max(1, [int]($bmp.Width / 24))) {
      $c = $bmp.GetPixel($x, $y); if ($c.R -gt 8 -or $c.G -gt 8 -or $c.B -gt 8) { $lit++ }
    }
  }
  return $lit -lt 20
}
function Shoot($path, $maxWidth, $bmpPath) {
  $p = Find-Game
  if (-not $p) { return 'ERR game window not found' }
  $h = $p.MainWindowHandle
  if ([ArcanaWin]::IsIconic($h)) { return 'ERR game is minimized' }
  $r = New-Object ArcanaWin+RECT
  [ArcanaWin]::GetClientRect($h, [ref]$r) | Out-Null
  $w = $r.Right - $r.Left; $ht = $r.Bottom - $r.Top
  if ($w -lt 100 -or $ht -lt 100) { return 'ERR game window too small' }
  $bmp = New-Object System.Drawing.Bitmap $w, $ht, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $how = 'printwindow'
  try {
    $hdc = $g.GetHdc()
    $ok = [ArcanaWin]::PrintWindow($h, $hdc, 3)
    $g.ReleaseHdc($hdc)
    if (-not $ok -or (Is-Black $bmp)) {
      if ([ArcanaWin]::GetForegroundWindow() -ne $h) { return 'ERR picture came back black and the game is not in front' }
      $pt = New-Object ArcanaWin+POINT
      [ArcanaWin]::ClientToScreen($h, [ref]$pt) | Out-Null
      $g.CopyFromScreen($pt.X, $pt.Y, 0, 0, (New-Object System.Drawing.Size $w, $ht))
      $how = 'screen'
    }
    $out = $bmp
    if ($maxWidth -gt 0 -and $w -gt $maxWidth) {
      $nh = [int]($ht * $maxWidth / $w)
      $out = New-Object System.Drawing.Bitmap $maxWidth, $nh
      $g2 = [System.Drawing.Graphics]::FromImage($out)
      $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g2.DrawImage($bmp, 0, 0, $maxWidth, $nh)
      $g2.Dispose()
    }
    $dir = Split-Path -Parent $path
    if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    $out.Save($path, $jpeg, $params)
    if ($bmpPath) { $out.Save($bmpPath, [System.Drawing.Imaging.ImageFormat]::Bmp) }
    $res = "OK $($out.Width) $($out.Height) $how"
    if ($out -ne $bmp) { $out.Dispose() }
    return $res
  } finally {
    $g.Dispose(); $bmp.Dispose()
  }
}

[Console]::Out.WriteLine('READY')
[Console]::Out.Flush()
while ($null -ne ($line = [Console]::In.ReadLine())) {
  $parts = $line.Split("`t")
  if ($parts.Length -lt 2) { continue }
  $id = $parts[0]; $path = $parts[1]; $mw = 0; $bp = $null
  if ($parts.Length -ge 3) { $mw = [int]$parts[2] }
  if ($parts.Length -ge 4 -and $parts[3]) { $bp = $parts[3] }
  try { $ans = Shoot $path $mw $bp } catch { $ans = 'ERR ' + ($_.Exception.Message -replace '\s+', ' ') }
  [Console]::Out.WriteLine("$id $ans")
  [Console]::Out.Flush()
}
