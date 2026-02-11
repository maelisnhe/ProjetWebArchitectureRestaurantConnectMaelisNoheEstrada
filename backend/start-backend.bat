@echo off
set JAVA_HOME=C:\Users\maeli\jdk-17.0.16
set PATH=%JAVA_HOME%\bin;%PATH%
cd /d "%~dp0"
call mvnw.cmd spring-boot:run
