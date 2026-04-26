# Verification Tools

Helpers for checking the locally served website.

Run the Java server first:

```bash
cd server/java-static-server
java -jar target/ai-dlc-static-server-1.0.0.jar --root ../../website/public --host 0.0.0.0 --port 8080
```

Then verify the primary local URL:

```bash
node tools/verification/verify-site.mjs http://localhost:8080
```

You can also pass the WSL IP fallback:

```bash
node tools/verification/verify-site.mjs http://<wsl-ip>:8080
```
