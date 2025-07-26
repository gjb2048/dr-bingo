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

const drSayings = [
    "Drive it like you stole it",
    "See it, say it, sort it",
    "Tea and biscuits", 
    "Come back tomorrow, we'll do it properly",
    "Brake step three",
    "Mum rail",
    "Lets play Locomotive Livery Location"
];

let bingo = null;

class Bingo {
    
    sayings = null;
    
    // Init.
    constructor() {
        console.log("Bingo constructor");
    }

    init(element) {
        console.log("Bingo init");

        const sayingElements = element.querySelectorAll('.saying');

        this.sayings = new Array(sayingElements.length);

        // Populate.
        for (let index = 0; index < sayingElements.length; index++) { 
            this.sayings[index] = {"state": null};
        }
        console.log("Init Saying state " + JSON.stringify(bingo.sayings));
        
        drSayings.forEach(function(value, index) {
            bingo.sayings[index] = {"saying": value, "state": false};
        });

        // Random locations.
        console.log("Init Saying state pre sort " + JSON.stringify(bingo.sayings));
        this.sayings.sort(() => Math.random() - 0.5);
        console.log("Init Saying state post sort" + JSON.stringify(bingo.sayings));
        
        // Update markup and attach event listener.
        sayingElements.forEach(function(saying) {
            if (bingo.sayings[saying.dataset.pos -1].state === null) {
                saying.innerText = "";
            } else {
                saying.innerText = bingo.sayings[saying.dataset.pos -1].saying;
                console.log("Element add event listener " + saying.dataset.pos);
                saying.addEventListener('click', bingo._sayingClicked);
            }
        });
    }

    _sayingClicked(saying) {
        console.log("Saying " + saying.target.dataset.pos + " clicked");
        
        // Toggle value.
        bingo.sayings[saying.target.dataset.pos - 1].state =
            (bingo.sayings[saying.target.dataset.pos - 1].state !== true);

        console.log("Clicked Saying state " + JSON.stringify(bingo.sayings));
        
        if (bingo.sayings[saying.target.dataset.pos - 1].state === true) {
            saying.target.classList.add('said');
            
            // Check bingo.
            bingo._isBingo();
        } else {
            console.log("Not bingo :(");
            saying.target.classList.remove('said');            
            document.getElementById('bingo').classList.add('hidden');
        }
    };

    _isBingo() {
        console.log("isBingo");
        let trueCount = 0;
        bingo.sayings.forEach(function(saying){
            if (saying.state === true) {
                trueCount++;
            }
        });
        if (trueCount === drSayings.length) {
            document.getElementById('bingo').classList.remove('hidden');
            console.log("Bingo!");
        }
    }
}

function drInit() {
    bingo = new Bingo();
    bingo.init(document);
}

if (document.readyState !== 'loading') {
    drInit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        drInit();
    });
}
