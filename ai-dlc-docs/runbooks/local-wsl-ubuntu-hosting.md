# Local WSL Ubuntu Hosting

## Purpose

Serve the reconstructed AI-DLC workshop website from WSL Ubuntu using the Java static server.

## Prerequisites

- WSL Ubuntu shell from the repository root.
- Java 17 or newer.
- Maven, if you want to use the Maven build path.

The server has no third-party runtime dependencies.

## Build With Maven

If Maven reports that `JAVA_HOME` is not defined correctly, set it before running Maven:

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

```bash
cd server/java-static-server
mvn package
```

## Build Without Maven

Use this fallback when Maven is not installed:

```bash
cd server/java-static-server
mkdir -p target/classes
javac --release 17 -d target/classes src/main/java/com/aidlc/workshopsite/StaticSiteServer.java
jar --create --file target/ai-dlc-static-server-1.0.0.jar --main-class com.aidlc.workshopsite.StaticSiteServer -C target/classes .
```

## Run

```bash
cd server/java-static-server
java -jar target/ai-dlc-static-server-1.0.0.jar --root ../../website/public --host 0.0.0.0 --port 8080
```

Then open:

```text
http://localhost:8080/
```

Use `localhost` as the primary Windows Chrome URL. In this WSL setup, `http://127.0.0.1:8080/` may fail from Windows Chrome even when `http://localhost:8080/` works.

If localhost forwarding fails, find the WSL IP:

```bash
ip -4 addr show eth0
```

Open `http://<wsl-ip>:8080/` from Windows Chrome.

## Configuration

Command-line options:

- `--root <path>`: document root. Default: `../../website/public`
- `--host <host>`: bind host. Default: `127.0.0.1`; use `0.0.0.0` for Windows-to-WSL browser access.
- `--port <port>`: bind port. Default: `8080`

Environment variables:

- `AIDLC_ROOT`
- `AIDLC_HOST`
- `AIDLC_PORT`

## Smoke Test

With the server running:

```bash
curl -I http://localhost:8080/
curl -I http://localhost:8080/assets/css/styles.css
curl -I http://localhost:8080/task-manager.html
```

Expected result: each command returns `HTTP/1.1 200 OK`.

Run the broader verification script from the repository root:

```bash
node tools/verification/verify-site.mjs http://localhost:8080
```
