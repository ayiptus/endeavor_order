"use client"

import { useSearchParams } from "next/navigation"

/**
 * Hook to check if test mode is enabled via URL query param
 */
export function useTestMode(): boolean {
  const searchParams = useSearchParams()
  return searchParams.get("mode") === "test"
}

/**
 * Build a URL path that preserves mode=test if currently active
 */
export function buildHrefWithMode(basePath: string, isTestMode: boolean): string {
  if (!isTestMode) return basePath
  
  // Handle paths that already have query params
  const separator = basePath.includes("?") ? "&" : "?"
  return `${basePath}${separator}mode=test`
}

/**
 * Get the mode query string for API calls
 */
export function getModeQueryString(isTestMode: boolean): string {
  return isTestMode ? "?mode=test" : ""
}
