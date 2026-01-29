hugo mod clean
Remove-Item -Recurse -Force resources
Remove-Item -Recurse -Force public
hugo server --disableFastRender