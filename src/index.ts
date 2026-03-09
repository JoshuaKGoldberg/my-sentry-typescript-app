import * as Sentry from "@sentry/node";

Sentry.init({
	dsn: "https://febc1d5e7543edd06c1d5ad925917e42@o4510958237974528.ingest.us.sentry.io/4510958251409408",

	tracesSampleRate: 1.0, //  Capture 100% of the transactions

	integrations: [
		// send console.log, console.warn, and console.error calls as logs to Sentry
		Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
	],

	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events
	sendDefaultPii: true,
	enableLogs: true,
});

for (let i = 0; i < 10; i += 1) {
	// Sentry.captureEvent({
	// 	message: `Hello, Sentry! ${i}`,
	// });
	Sentry.logger.info("User triggered test log", { action: "test_log" });
}

// // Synchronous example: measures the duration of the 'measureThis()' function
Sentry.startSpan(
	{
		name: "my-span", // A description for the span
		op: "function_execution", // The operation name (e.g., db, http, function)
	},
	(span) => {
		try {
			//   measureThis(); // Your code goes here
			// You can add custom data to the span within the callback
			span.setAttribute("custom_key", "custom_value");
			throw new Error("gotcha");
		} catch (error) {
			// You can also capture errors within the span's context
			Sentry.captureException(error);
		}
	},
);
