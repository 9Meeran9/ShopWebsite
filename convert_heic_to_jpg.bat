@echo off
REM Batch script to convert all .heic images to .jpg using ImageMagick (magick.exe)
REM Make sure ImageMagick is installed and magick.exe is in your PATH

REM Find all .heic files recursively and convert them to .jpg
for /r %%f in (*.heic) do (
    echo Converting %%f to JPG...
    magick "%%f" "%%~dpnf.jpg"
)

echo Conversion complete.
pause
