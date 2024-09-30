/*
    * Manages player-related data and functions, such as `score`, `lives`, and `updatePlayerStatus`.
 */

export class Player {
    public score: number;
    public lives: number;

    constructor() {
        this.score = 0;
        this.lives = 3;
    }

    // Update the player's lives and score display in the HTML
    public updatePlayerStatus(): void {
        const livesCount = document.getElementById('lives-count') as HTMLElement | null;
        if (!livesCount) {
            console.error("Lives count element not found.");
            return;
        }
        const currentScore = document.getElementById('current-score') as HTMLElement | null;
        if (!currentScore) {
            console.error("Score element not found.");
            return;
        }

        // Update the display of lives and score
        livesCount.textContent = this.lives.toString();
        currentScore.textContent = this.score.toString();
    }
}
