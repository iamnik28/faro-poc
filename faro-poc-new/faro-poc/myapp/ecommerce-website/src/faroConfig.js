import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

// Initialize Grafana Faro
export const faro = initializeFaro({
   url: `${window.location.origin}/collect`, // ✅ Fixed string interpolation
//  apiKey: env.faro.apiKey,
  app: {
    name: "ecommerce-app",
    version: "1.0.0",
    environment: "non-prod",
  },
  instrumentations: [
    ...getWebInstrumentations({
      captureConsole: true, // Capture console logs
    }),
    new TracingInstrumentation(), // Enable tracing
  ],
});

// Function to Log Events
export const logEvent = (eventName, eventData = {}) => {
  if (faro?.api) {
    const span = faro.api.trace?.startSpan(eventName);
    faro.api.pushEvent(eventName, eventData);
    faro.api.pushLog(['Event: ${eventName}', JSON.stringify(eventData)]);
    span?.end();
  } else {
    console.warn("⚠️ Faro is not initialized properly!");
  }
};

// Function to Push Custom Metrics (Web Vitals)
export const pushMetric = (name, value) => {
  faro?.api?.pushMeasurement({
    type: "web-vitals",
    values: { [name]: value },
  });
};

// Global Error Tracking
window.onerror = (message, source, lineno, colno, error) => {
  faro?.api?.pushError(error || new Error(message));
};

window.addEventListener("unhandledrejection", (event) => {
  faro?.api?.pushError(event.reason);
});

console.log("🚀 Faro Initialized: Logs, Traces, Metrics Enabled!");

