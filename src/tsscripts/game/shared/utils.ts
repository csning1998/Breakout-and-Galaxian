/*
    * Utility functions that can be used throughout the game.
 */

export function getDifficultyFromURL(): string {
    const params = new URLSearchParams(window.location.search);
    const difficulty = params.get('difficulty')?.toString() || 'normal';
    console.log(`Retrieved difficulty from URL: ${difficulty}`);
    return difficulty;
}