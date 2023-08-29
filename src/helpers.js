export function convertToSlug(input) {
    return input
        .toLowerCase()                   // Convert to lowercase
        .replace(/[^\w\s-]/g, '')         // Remove special characters
        .replace(/\s+/g, '-')            // Replace spaces with hyphens
        .replace(/-+/g, '-')             // Replace consecutive hyphens with a single hyphen
        .trim();                         // Trim any leading/trailing spaces
}