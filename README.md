# AI-DLC Workshop Website

Minimal public-facing static site for the AI-DLC workshop series.

The site is served from `website/public/` and can be hosted by any static web server. This repo includes a small Java 17 server for local WSL Ubuntu hosting.

## Quickstart

Build the Java server:

```bash
cd server/java-static-server
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
mvn package
```

Run the site:

```bash
java -jar target/ai-dlc-static-server-1.0.0.jar --root ../../website/public --host 0.0.0.0 --port 8080
```

Open from Windows Chrome:

```text
http://localhost:8080/
```

If localhost forwarding fails, use the WSL IP fallback, for example:

```text
http://<wsl-ip>:8080/
```

## Minimal Repo Layout

```text
website/public/              Static website document root
server/java-static-server/   Java 17 static web server
workshops/                   Extracted workshop reference material
tools/verification/          Local smoke-test helper
```

## Public Pages

- `index.html`
- `setup-instructions.html`
- `task-manager.html`
- `job-application-cdk.html`
- `s3-file-sharing.html`
- `ecommerce-catalog.html`
- `brownfield-ecommerce.html`

## Verify

With the server running:

```bash
node tools/verification/verify-site.mjs http://localhost:8080
```

## Repository Scope

For a minimal public website repository, commit the static website, workshop docs, Java server, and verification helper. Keep crawl mirrors, scratch files, build output, and internal planning notes out of the public repo unless they are intentionally needed for provenance.
