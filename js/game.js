// js/game.js
class CookieGame {
    constructor() {
        this.cookies = 0;
        this.validCodes = {
            'gimmecookies': 1000,
            'resetgame': 0
        };
        console.log('CookieGame initialized');
    }

    init() {
        this.cookieBtn = document.getElementById('cookie-btn');
        this.cookieCount = document.getElementById('cookie-count');
        this.codeInput = document.getElementById('code-input');
        this.redeemBtn = document.getElementById('redeem-btn');
        this.resetBtn = document.getElementById('reset-btn');

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

        this.cookieBtn.addEventListener('click', () => {
            this.addCookies(1);
            console.log('Cookie clicked, cookies:', this.cookies);
        });
        this.redeemBtn.addEventListener('click', () => this.redeemCode());
        this.resetBtn.addEventListener('click', () => this.resetGame());

        this.loadGame();
        console.log('Game initialized, starting cookies:', this.cookies);
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
            if (code === 'resetgame') this.cookies = 0;
            this.codeInput.value = '';
            console.log('Code redeemed:', code, 'cookies:', this.cookies);
        } else {
            alert('Invalid code!');
            console.log('Invalid code attempted:', code);
        }
    }

    resetGame() {
        this.cookies = 0;
        this.updateDisplay();
        this.saveGame();
        console.log('Game reset, cookies:', this.cookies);
    }

    updateDisplay() {
        this.cookieCount.textContent = `${this.cookies} Cookies`;
    }

    saveGame() {
        try {
            localStorage.setItem('cookieGameState', JSON.stringify({ cookies: this.cookies }));
            console.log('Game saved, cookies:', this.cookies);
        } catch (e) {
            console.error('Save failed:', e);
        }
    }

    loadGame() {
        try {
            const saved = localStorage.getItem('cookieGameState');
            if (saved) {
                const data = JSON.parse(saved);
                this.cookies = data.cookies || 0;
                console.log('Game loaded, cookies:', this.cookies);
            }
        } catch (e) {
            console.error('Load failed:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game');
    const game = new CookieGame();
    game.init();
});
