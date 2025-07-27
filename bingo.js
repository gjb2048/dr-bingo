/*
    Copyright (C) 2025 G J Barnard

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see https://www.gnu.org/licenses/.
*/

console.log("Bingo");

class Bingo {
    
    sayings = null;
    drSayings = null;

    bingoMessageElement = null;
    countMessageElement = null;
    count = 0;

    // Init.
    constructor(sayings) {
        console.log("Bingo constructor");

        this.drSayings = sayings;
    }

    init(element) {
        console.log("Bingo init");

        const sayingElements = element.querySelectorAll('.saying');

        this.sayings = new Array(sayingElements.length);

        // Populate.
        for (let index = 0; index < sayingElements.length; index++) { 
            this.sayings[index] = {"state": null};
        }
        console.log("Init Saying state " + JSON.stringify(this.sayings));

        this.drSayings.forEach(function(value, index) {
            // Prevent more sayings than we have space for.
            if (index < sayingElements.length) {
                this.sayings[index] = {"saying": value, "state": false};
            }
        }, this);

        // Random locations.
        console.log("Init Saying state pre sort " + JSON.stringify(this.sayings));
        this.sayings.sort(() => Math.random() - 0.5);
        console.log("Init Saying state post sort" + JSON.stringify(this.sayings));

        // Message elements.
        this.bingoMessageElement = document.getElementById('bingo');
        this.countMessageElement = document.getElementById('count');

        // Update markup and attach event listener.
        this._sayingClicked = this._sayingClicked.bind(this);
        sayingElements.forEach(function(saying) {
            if (this.sayings[saying.dataset.pos -1].state === null) {
                saying.innerText = "";
            } else {
                saying.innerText = this.sayings[saying.dataset.pos -1].saying;
                console.log("Element add event listener " + saying.dataset.pos);
                saying.addEventListener('click', this._sayingClicked);
            }
        }, this);
    }

    _sayingClicked(saying) {
        console.log("Saying " + saying.target.dataset.pos + " clicked");

        // Toggle state.
        this.sayings[saying.target.dataset.pos - 1].state =
            (this.sayings[saying.target.dataset.pos - 1].state !== true);

        console.log("Clicked Saying state " + JSON.stringify(this.sayings));

        if (this.sayings[saying.target.dataset.pos - 1].state === true) {
            saying.target.classList.add('said');

            // Check bingo.
            this._isBingo();
        } else {
            console.log("Not bingo :(");
            saying.target.classList.remove('said');
            this.bingoMessageElement.classList.add('hidden');
            this.count--;
        }

        this.countMessageElement.innerText = this.count;
    };

    _isBingo() {
        console.log("isBingo");
        let trueCount = 0;
        this.sayings.forEach(function(saying){
            if (saying.state === true) {
                trueCount++;
            }
        });

        this.count = trueCount;

        if (trueCount === this.drSayings.length) {
            this.bingoMessageElement.classList.remove('hidden');
            console.log("Bingo!");
        }
    }
}

async function drInit() {
    const bingo = new Bingo(drSayings); // The sayings in bingo_data.js.
    bingo.init(document);
}

if (document.readyState !== 'loading') {
    drInit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        drInit();
    });
}
