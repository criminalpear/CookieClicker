// js/game.js
class CookieGame {
    constructor() {
        this.cookies = 0;
        this.validCodes = {
            'gimmecookies': 1000,
            'resetgame': 0
        };
    }

    init() {
        // Get DOM elements
        this.cookieBtn = document.getElementById('cookie-btn');
        this.cookieCount = document.getElementById('cookie-count');
        this.codeInput = document.getElementById('code-input');
        this.redeemBtn = document.getElementById('redeem-btn');
        this.resetBtn = document.getElementById('reset-btn');

        // Check for missing elements
        if (!this.cookieBtn || !this.cookieCount || !this.codeInput || !this.redeemBtn || !this.resetBtn) {
            console.error('Missing DOM elements:', {
                cookieBtn: this.cookieBtn,
                cookieCount: this.cookieCount,
                codeInput: this.codeInput,
                redeemBtn: this.redeemBtn,
                resetBtn: this.resetBtn
            });
            return;
        }

        // Add event listeners
        this.cookieBtn.addEventListener('click', () => this.addCookies(1));
        this.redeemBtn.addEventListener('click', () => this.redeemCode());
        this.resetBtn.addEventListener('click', () => this.resetGame());

        // Load saved state
        this.loadGame();
    }

    addCookies(amount) {
        this.cookies += amount;
        this.updateDisplay();
        this.saveGame();
    }

    redeemCode() {
        const code = this.codeInput.value.toLowerCase().trim();
        if (this.validCodes[code] !== undefined) {
            this.addCookies(this.validCodes[code]);
            if (code === 'resetgame') {
                this.cookies = 0; // Ensure reset
            }
            this.codeInput.value = '';
        } else {
            alert('Invalid code!');
        }
    }

    resetGame() {
        this.cookies = 0;
        this.updateDisplay();
        this.saveGame();
    }

    updateDisplay() {
        this.cookieCount.textContent = `${this.cookies} Cookies`;
    }

    saveGame() {
        localStorage.setItem('cookieGameState', JSON.stringify({ cookies: this.cookies }));
    }

    loadGame() {
        const saved = localStorage.getItem('cookieGameState');
        if (saved) {
            const data = JSON.parse(saved);
            this.cookies = data.cookies || 0;
            this.updateDisplay();
        }
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initialized');
    const game = new CookieGame();
    game.init();
});
