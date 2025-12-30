/**
 * Utility function to merge class names
 * Simplified version that doesn't require external dependencies
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

