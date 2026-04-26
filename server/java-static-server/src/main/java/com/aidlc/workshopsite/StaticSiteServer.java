package com.aidlc.workshopsite;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Executors;

public final class StaticSiteServer {
    private static final int DEFAULT_PORT = 8080;
    private static final String DEFAULT_HOST = "127.0.0.1";
    private static final Path DEFAULT_ROOT = Paths.get("../../website/public");

    private StaticSiteServer() {
    }

    public static void main(String[] args) throws IOException {
        Config config = Config.from(args);
        Path documentRoot = config.root().toAbsolutePath().normalize();

        if (!Files.isDirectory(documentRoot)) {
            throw new IllegalArgumentException("Document root does not exist or is not a directory: " + documentRoot);
        }

        HttpServer server = HttpServer.create(new InetSocketAddress(config.host(), config.port()), 0);
        server.createContext("/", new StaticFileHandler(documentRoot));
        server.setExecutor(Executors.newCachedThreadPool());
        server.start();

        System.out.printf("Serving %s at http://%s:%d/%n", documentRoot, config.host(), config.port());
        System.out.println("Press Ctrl+C to stop.");
    }

    private record Config(String host, int port, Path root) {
        static Config from(String[] args) {
            String host = valueFromEnv("AIDLC_HOST", DEFAULT_HOST);
            int port = parsePort(valueFromEnv("AIDLC_PORT", Integer.toString(DEFAULT_PORT)));
            Path root = Paths.get(valueFromEnv("AIDLC_ROOT", DEFAULT_ROOT.toString()));

            for (int index = 0; index < args.length; index++) {
                String arg = args[index];
                switch (arg) {
                    case "--host" -> host = requireValue(args, ++index, arg);
                    case "--port" -> port = parsePort(requireValue(args, ++index, arg));
                    case "--root" -> root = Paths.get(requireValue(args, ++index, arg));
                    case "--help", "-h" -> {
                        printUsage();
                        System.exit(0);
                    }
                    default -> throw new IllegalArgumentException("Unknown argument: " + arg);
                }
            }

            return new Config(host, port, root);
        }

        private static String valueFromEnv(String name, String fallback) {
            String value = System.getenv(name);
            return value == null || value.isBlank() ? fallback : value;
        }

        private static String requireValue(String[] args, int index, String flag) {
            if (index >= args.length || args[index].startsWith("--")) {
                throw new IllegalArgumentException("Missing value for " + flag);
            }
            return args[index];
        }

        private static int parsePort(String value) {
            try {
                int port = Integer.parseInt(value);
                if (port < 1 || port > 65535) {
                    throw new IllegalArgumentException("Port must be between 1 and 65535: " + value);
                }
                return port;
            } catch (NumberFormatException exception) {
                throw new IllegalArgumentException("Invalid port: " + value, exception);
            }
        }

        private static void printUsage() {
            System.out.println("""
                    Usage: java -jar target/ai-dlc-static-server-1.0.0.jar [options]

                    Options:
                      --root <path>   Document root. Default: ../../website/public
                      --host <host>   Bind host. Default: 127.0.0.1
                      --port <port>   Bind port. Default: 8080

                    Environment variables:
                      AIDLC_ROOT, AIDLC_HOST, AIDLC_PORT
                    """);
        }
    }

    private static final class StaticFileHandler implements HttpHandler {
        private static final byte[] NOT_FOUND = "404 Not Found\n".getBytes(StandardCharsets.UTF_8);
        private static final byte[] FORBIDDEN = "403 Forbidden\n".getBytes(StandardCharsets.UTF_8);
        private static final byte[] METHOD_NOT_ALLOWED = "405 Method Not Allowed\n".getBytes(StandardCharsets.UTF_8);
        private static final Map<String, String> CONTENT_TYPES = contentTypes();
        private final Path root;

        private StaticFileHandler(Path root) {
            this.root = root;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try (exchange) {
                if (!"GET".equals(exchange.getRequestMethod()) && !"HEAD".equals(exchange.getRequestMethod())) {
                    sendBytes(exchange, 405, "text/plain; charset=utf-8", METHOD_NOT_ALLOWED, false);
                    return;
                }

                Path file = resolveRequestPath(exchange.getRequestURI());
                if (file == null) {
                    sendBytes(exchange, 403, "text/plain; charset=utf-8", FORBIDDEN, false);
                    return;
                }

                if (Files.isDirectory(file)) {
                    file = file.resolve("index.html");
                }

                if (!Files.isRegularFile(file)) {
                    sendBytes(exchange, 404, "text/plain; charset=utf-8", NOT_FOUND, false);
                    return;
                }

                byte[] bytes = Files.readAllBytes(file);
                Headers headers = exchange.getResponseHeaders();
                headers.set("Cache-Control", "no-cache");
                headers.set("X-Content-Type-Options", "nosniff");
                sendBytes(exchange, 200, contentType(file), bytes, "HEAD".equals(exchange.getRequestMethod()));
            }
        }

        private Path resolveRequestPath(URI uri) {
            String rawPath = uri.getRawPath();
            String decodedPath = URLDecoder.decode(rawPath, StandardCharsets.UTF_8);
            String relativePath = decodedPath.startsWith("/") ? decodedPath.substring(1) : decodedPath;
            Path candidate = root.resolve(relativePath).normalize();
            return candidate.startsWith(root) ? candidate : null;
        }

        private static void sendBytes(
                HttpExchange exchange,
                int status,
                String contentType,
                byte[] bytes,
                boolean headOnly
        ) throws IOException {
            Headers headers = exchange.getResponseHeaders();
            headers.set("Content-Type", contentType);
            headers.set("Content-Length", Integer.toString(bytes.length));
            exchange.sendResponseHeaders(status, headOnly ? -1 : bytes.length);
            if (!headOnly) {
                try (OutputStream body = exchange.getResponseBody()) {
                    body.write(bytes);
                }
            }
        }

        private static String contentType(Path file) {
            String filename = file.getFileName().toString().toLowerCase(Locale.ROOT);
            int dot = filename.lastIndexOf('.');
            String extension = dot >= 0 ? filename.substring(dot + 1) : "";
            return CONTENT_TYPES.getOrDefault(extension, "application/octet-stream");
        }

        private static Map<String, String> contentTypes() {
            Map<String, String> types = new HashMap<>();
            types.put("html", "text/html; charset=utf-8");
            types.put("css", "text/css; charset=utf-8");
            types.put("js", "text/javascript; charset=utf-8");
            types.put("json", "application/json; charset=utf-8");
            types.put("txt", "text/plain; charset=utf-8");
            types.put("md", "text/markdown; charset=utf-8");
            types.put("svg", "image/svg+xml");
            types.put("png", "image/png");
            types.put("jpg", "image/jpeg");
            types.put("jpeg", "image/jpeg");
            types.put("gif", "image/gif");
            types.put("webp", "image/webp");
            types.put("ico", "image/x-icon");
            types.put("woff", "font/woff");
            types.put("woff2", "font/woff2");
            types.put("ttf", "font/ttf");
            return Map.copyOf(types);
        }
    }
}
