# Grafana Faro POC

## Diagram

![image](https://github.com/user-attachments/assets/305dcfb6-c55d-439d-8f0b-605bfb365cf6)


## Overview
This Proof of Concept (POC) demonstrates the integration of **Grafana Faro** for frontend observability. Grafana Faro enables logging, tracing, and metrics collection from frontend applications, helping in performance monitoring and debugging.

## Installation
To set up Grafana Faro in your project, install the following packages:

### 1. Faro React SDK
```sh
npm i @grafana/faro-react
```
**Purpose:**
- Provides React-specific bindings for Grafana Faro.
- Simplifies integrating Faro into React applications.
- Automatically collects and reports frontend logs, errors, and telemetry data.

### 2. Faro Web SDK
```sh
npm i @grafana/faro-web-sdk
```
**Purpose:**
- Core SDK for Grafana Faro, designed for frontend observability.
- Enables logging, tracing, and metrics collection from web applications.
- Can be used in any JavaScript/TypeScript application (not limited to React).

### 3. Faro Web Tracing
```sh
npm i @grafana/faro-web-tracing
```
**Purpose:**
- Provides OpenTelemetry tracing support for Grafana Faro.
- Captures distributed traces and propagates context to backend observability systems like **Tempo**.

## Purpose of Grafana Alloy
Grafana Alloy is used as an agent to collect and forward telemetry data from **Grafana Faro** to backend observability systems. It acts as an intermediary, handling logs, traces, and metrics before sending them to **Loki, Tempo, and VictoriaMetrics**.

## Installation of Grafana Alloy via Helm
To install Grafana Alloy using Helm, follow these steps:

### 1. Add the Grafana Helm Repository
```sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

### 2. Install Grafana Alloy
```sh
helm install grafana-alloy grafana/alloy -n observability 
```

### 3. Verify the Installation
```sh
kubectl get pods -n observability
```
Ensure the Grafana Alloy pod is running successfully.

### 4. Customize the Installation (Optional)
To customize the deployment, create a `values.yaml` file with specific configurations and install Alloy using:

##### Example `values.yaml` File
```sh
yaml

controller:
  type: deployment
  replicaCount: 1

alloy:
  configMap:
    create: false
    name: grafana-alloy-config
    key: config.alloy

  stabilityLevel: "generally-available"
  storagePath: /var/lib/alloy
  listenAddr: 0.0.0.0
  listenPort: 12345
  listenScheme: HTTP
  uiPathPrefix: /
  enableReporting: true

  extraPorts:
    - name: otlp-grpc
      port: 14317
      targetPort: 14317
      protocol: TCP
    - name: otlp-http
      port: 14318
      targetPort: 14318
      protocol: TCP
    - name: otlp-faro  
      port: 8027
      targetPort: 8027
      protocol: TCP

service:
  enabled: true
  type: ClusterIP
```
To customize the deployment, create a `values.yaml` file with specific configurations and install Alloy using:
```sh
helm install grafana-alloy grafana/alloy -n observability -f values.yaml
```

Grafana Alloy is used as an agent to collect and forward telemetry data from **Grafana Faro** to backend observability systems. It acts as an intermediary, handling logs, traces, and metrics before sending them to **Loki, Tempo, and VictoriaMetrics**.
## Usage
1. **Initialize Faro**: Create a separate file (e.g., `faro.js`) to initialize Faro with logging, tracing, and metrics.
2. **Import and use in your application**: Ensure that Faro is initialized at the application's entry point.
3. **Send telemetry data**: Log messages, capture errors, and send traces to your backend observability stack (Grafana Tempo, Loki, and VictoriaMetrics) via Grafana Alloy.

## Next Steps
- Configure Faro to send data to your observability stack.
- Visualize logs, metrics, and traces in **Grafana**.
- Monitor Web Vitals and user interactions to optimize performance.

## References
- [Grafana Faro Documentation](https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/architecture/)
- [Grafana Alloy Documentation](https://grafana.com/docs/alloy/latest/)
- [OpenTelemetry Web Tracing](https://opentelemetry.io/docs/)

---
**Author:** Nikhil Kumbhare

**Email:** nikhil.kumbhare@opstree.com
