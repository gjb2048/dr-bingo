console.log("Bingo");

const drSayings = [
    "Drive it like you stole it",
    "See it, say it, sort it",
    "Tea and biscuits", 
    "Come back tomorrow, we'll do it properly"
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
            this.sayings[index] = {"saying": "", "state": null};
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
        
        // Toggle value, copes with initial null.
        bingo.sayings[saying.target.dataset.pos - 1] =
            (bingo.sayings[saying.target.dataset.pos - 1] !== true);

        console.log("Clicked Saying state " + JSON.stringify(bingo.sayings));
        
        if (bingo.sayings[saying.target.dataset.pos - 1] === true) {
            saying.target.classList.add('said');
        } else {
            saying.target.classList.remove('said');            
        }
    };
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
