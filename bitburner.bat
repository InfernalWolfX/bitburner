:: This batch file is being packaged as an .exe named "bitburner.exe"
:: using iexpress.exe with "cmd /c bitburner.exe" as the install program;
:: The original games .exe has been renamed to "bitburner_real.exe" in order to
:: launch the game and Remote API server simultaneously.
@echo OFF
START CMD /k "cd /D W:\Pulsar\bitburner && npm start"
CD "W:\SteamLibrary\steamapps\common\Bitburner"
START bitburner_real.exe