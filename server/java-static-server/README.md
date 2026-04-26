# Java Static Server

Small Java 17 static webserver for serving `website/public` from WSL Ubuntu.

## Build With Maven

If Maven reports that `JAVA_HOME` is not defined correctly, set it before running Maven:

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

```bash
cd server/java-static-server
mvn package
```

Run:

```bash
java -jar target/ai-dlc-static-server-1.0.0.jar --root ../../website/public --host 0.0.0.0 --port 8080
```

Open `http://localhost:8080/` from Windows Chrome. If that fails, use the WSL IP fallback described below. In this WSL setup, `http://127.0.0.1:8080/` may fail from Windows Chrome even when `localhost` works.

## Build Without Maven

If Maven is not installed, compile with the JDK directly:

```bash
cd server/java-static-server
mkdir -p target/classes
javac --release 17 -d target/classes src/main/java/com/aidlc/workshopsite/StaticSiteServer.java
jar --create --file target/ai-dlc-static-server-1.0.0.jar --main-class com.aidlc.workshopsite.StaticSiteServer -C target/classes .
java -jar target/ai-dlc-static-server-1.0.0.jar --root ../../website/public --host 0.0.0.0 --port 8080
```

Open:

```text
http://localhost:8080/
```

If `localhost` does not forward from Windows to WSL, find the WSL IP with:

```bash
ip -4 addr show eth0
```

Then open `http://<wsl-ip>:8080/`.

## Options

- `--root <path>`: document root. Default: `../../website/public`
- `--host <host>`: bind host. Default: `127.0.0.1`; use `0.0.0.0` for Windows-to-WSL browser access.
- `--port <port>`: bind port. Default: `8080`

Environment variable equivalents:

- `AIDLC_ROOT`
- `AIDLC_HOST`
- `AIDLC_PORT`
