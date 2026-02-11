@echo off
set JAVA_HOME=C:\Users\maeli\jdk-17.0.16
set PATH=%JAVA_HOME%\bin;%PATH%
call mvnw.cmd spring-boot:run
