// Custom JavaScript for dashboard interactivity

console.log('Project Tracker Dashboard loaded');

// Add any custom event listeners or interactions here
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized');

    // Example: Log when HTMX updates content
    document.body.addEventListener('htmx:afterSwap', function(event) {
        console.log('Content updated:', event.detail.target);
    });
});
