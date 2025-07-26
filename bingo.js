console.log("Bingo");

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

        sayingElements.forEach(function(saying) {
            console.log("Bingo add event listener " + saying.dataset.pos);
            saying.addEventListener('click', bingo._sayingClicked);
        });
        
        this.sayings = new Array(sayingElements.length);
    }

    _sayingClicked(saying) {
        console.log("Saying " + saying.target.dataset.pos + " clicked");
        
        // Toggle value, copes with initial null.
        bingo.sayings[saying.target.dataset.pos - 1] =
            (bingo.sayings[saying.target.dataset.pos - 1] !== true);

        console.log("Saying state " + JSON.stringify(bingo.sayings));
        
        if (bingo.sayings[saying.target.dataset.pos - 1] === true) {
            saying.target.classList.add('said');
        } else {
            saying.target.classList.remove('said');            
        }
    };
}

if (document.readyState !== 'loading') {
    bingo = new Bingo();
    bingo.init(document);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        bingo = new Bingo();
        bingo.init(document);
    });
}
