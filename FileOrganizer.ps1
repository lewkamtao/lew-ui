# 检查执行策略并请求提升权限
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "正在请求管理员权限..." -ForegroundColor Yellow
    Start-Process powershell.exe -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# 设置执行策略
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Define excluded files and folders
$excludedItems = @(
    "FileOrganizer.ps1",
    "RunScript.bat"
)

# Define file categories and their extensions
$categories = @{
    "Images"      = @('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.heic', '.tiff', '.raw', '.cr2', '.nef', '.arw', '.psd', '.ai', '.eps', '.indd')
    "Videos"      = @('.mp4', '.mkv', '.flv', '.mov', '.avi', '.wmv', '.webm', '.m4v', '.3gp', '.mpeg', '.mpg', '.mts', '.m2ts', '.vob', '.ogv', '.mxf', '.prores')
    "Word"        = @('.doc', '.docx', '.docm', '.dot', '.dotx', '.dotm', '.wbk', '.odt', '.fodt', '.rtf', '.wpd', '.pages')
    "Excel"       = @('.xls', '.xlsx', '.xlsm', '.xlt', '.xltx', '.xltm', '.xlsb', '.xla', '.xlam', '.ods', '.fods', '.csv', '.tsv', '.numbers')
    "PowerPoint"  = @('.ppt', '.pptx', '.pptm', '.pot', '.potx', '.potm', '.pps', '.ppsx', '.ppsm', '.odp', '.fodp', '.key')
    "Access"      = @('.accdb', '.accde', '.accdt', '.accdr', '.mdb', '.mde', '.mdt', '.mdr')
    "Publisher"   = @('.pub', '.pubx', '.pubm')
    "Visio"       = @('.vsd', '.vsdx', '.vsdm', '.vss', '.vssx', '.vssm', '.vst', '.vstx', '.vstm', '.vdw', '.vdx')
    "Project"     = @('.mpp', '.mpt', '.mpx', '.mpd', '.mppx', '.mppz')
    "OneNote"     = @('.one', '.onetoc2', '.onetmp', '.onepkg')
    "Documents"   = @('.pdf', '.txt', '.md', '.xml', '.json', '.yaml', '.yml', '.ini', '.conf', '.config')
    "Archives"    = @('.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.iso', '.dmg', '.pkg', '.deb', '.rpm', '.msi', '.exe', '.app')
    "Audio"       = @('.mp3', '.wav', '.flac', '.aac', '.m4a', '.wma', '.ogg', '.aiff', '.alac', '.ape', '.mid', '.midi')
    "Code"        = @('.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.h', '.cs', '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.scala', '.html', '.css', '.scss', '.sass', '.less', '.vue', '.svelte')
    "Fonts"       = @('.ttf', '.otf', '.woff', '.woff2', '.eot', '.sfnt', '.pfb', '.pfm')
    "Database"    = @('.db', '.sqlite', '.sqlite3', '.dbf', '.sql', '.bak')
    "CAD"         = @('.dwg', '.dxf', '.stl', '.obj', '.3ds', '.max', '.blend', '.skp', '.rvt')
    "Ebooks"      = @('.epub', '.mobi', '.azw3', '.lit', '.fb2', '.ibooks')
    "Others"      = @('*')  # Default for unclassified files
}

# Create category folders
foreach ($folder in $categories.Keys) {
    $targetPath = Join-Path -Path $PWD -ChildPath $folder
    if (-not (Test-Path $targetPath)) {
        New-Item -ItemType Directory -Path $targetPath | Out-Null
        Write-Host "Created folder: $folder"
    }
}

# Get all files in current directory
Get-ChildItem -File | ForEach-Object {
    $file = $_
    
    # Skip excluded files
    if ($excludedItems -contains $file.Name) {
        Write-Host "Skipped excluded file: $($file.Name)" -ForegroundColor Yellow
        return
    }
    
    $moved = $false
    
    # Try to match known categories
    foreach ($category in $categories.GetEnumerator()) {
        if ($category.Value | Where-Object { $file.Extension -eq $_ }) {
            $destDir = Join-Path -Path $PWD -ChildPath $category.Key
            
            # Handle filename conflicts
            $destPath = Join-Path -Path $destDir -ChildPath $file.Name
            if (Test-Path $destPath) {
                $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
                $newName = "{0}_{1}{2}" -f $file.BaseName, $timestamp, $file.Extension
                $destPath = Join-Path -Path $destDir -ChildPath $newName
            }
            
            # Move the file
            Move-Item -Path $file.FullName -Destination $destPath -Force
            Write-Host "Moved: $($file.Name) -> $($category.Key)/"
            $moved = $true
            break
        }
    }
    
    # Unclassified files go to "Others"
    if (-not $moved) {
        $destDir = Join-Path -Path $PWD -ChildPath "Others"
        $destPath = Join-Path -Path $destDir -ChildPath $file.Name
        Move-Item -Path $file.FullName -Destination $destPath -Force
        Write-Host "Moved: $($file.Name) -> Others/"
    }
}

Write-Host "`n文件整理完成！" -ForegroundColor Green
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 