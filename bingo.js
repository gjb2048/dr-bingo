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


/**
 * Bingo class.
 */
class Bingo {
    
    /**
     * @type Array Object array of the saying element data being a state of null
     * if not used or the saying and its said state (boolean) if it is. 
     */
    sayings = null;

    /**
     * @type Array String array of sayings.
     */
    drSayings = null;

    /**
     * @type null|Element The element that shows when all of the sayings have been said.
     */
    bingoMessageElement = null;

    /**
     * @type null|Element The element in the markup that shows the current count of sayings said.
     */
    countElement = null;

    /**
     * @type null|Element The element in the markup that contains the current count of sayings said.
     */
    countContainerElement = null;

    /**
     * @type Number|count Current number of sayings said.
     */
    count = 0;


    /**
     * Initialise.
     * 
     * @param {array} sayings Array of sayings strings.
     * @returns {Bingo} The Bingo instance.
     */
    constructor(sayings) {
        this.drSayings = sayings;
    }

    /**
     * Initialse.
     * 
     * @param {element} element The element which contains the bingo markup.
     */
    init(element) {
        const sayingElements = element.querySelectorAll('.saying');

        this.sayings = new Array(sayingElements.length);

        // Populate.
        for (let index = 0; index < sayingElements.length; index++) { 
            this.sayings[index] = {"state": null};
        }

        this.drSayings.forEach(function(value, index) {
            // Prevent more sayings than we have space for.
            if (index < sayingElements.length) {
                this.sayings[index] = {"saying": value, "state": false};
            }
        }, this);

        // Random locations.
        this.sayings.sort(() => Math.random() - 0.5);

        // Message elements.
        this.bingoMessageElement = document.getElementById('bingo');
        this.countContainerElement = document.getElementById('count-container');
        this.countElement = document.getElementById('count');

        // Update markup and attach event listener.
        this._sayingClicked = this._sayingClicked.bind(this);
        sayingElements.forEach(function(saying) {
            if (this.sayings[saying.dataset.pos -1].state === null) {
                saying.innerText = "";
            } else {
                saying.innerText = this.sayings[saying.dataset.pos -1].saying;
                saying.addEventListener('click', this._sayingClicked);
            }
        }, this);
    }

    /**
     * A saying has been clicked
     * 
     * @param {element} saying Saying element.
     */
    _sayingClicked(saying) {
        // Toggle state.
        this.sayings[saying.target.dataset.pos - 1].state =
            (this.sayings[saying.target.dataset.pos - 1].state !== true);

        if (this.sayings[saying.target.dataset.pos - 1].state === true) {
            saying.target.classList.add('said');

            // Check bingo.
            this._isBingo();
        } else {
            saying.target.classList.remove('said');
            this.bingoMessageElement.classList.add('hidden');
            this.countContainerElement.classList.remove('all-said');
            this.count--;
        }

        this.countElement.innerText = this.count;
    };

    /**
     * Have all of the sayings been said?
     */
    _isBingo() {
        let trueCount = 0;
        this.sayings.forEach(function(saying){
            if (saying.state === true) {
                trueCount++;
            }
        });

        this.count = trueCount;

        if (trueCount === this.drSayings.length) {
            this.bingoMessageElement.classList.remove('hidden');
            this.countContainerElement.classList.add('all-said');
        }
    }
}

/**
 * Construct and initialise.
 */
function drInit() {
    const bingo = new Bingo(drSayings); // The sayings in bingo_data.js.
    bingo.init(document);
}

// Create and initialise when the document object model has loaded.
if (document.readyState !== 'loading') {
    drInit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        drInit();
    });
}
