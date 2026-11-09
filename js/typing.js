LIKES = [
    "data journalism", 
    "computational linguistics", 
    "sad Russian authors", 
    "Wikipedia rabbit-holes",
    "the Great Basin desert",
    "lemon ricotta pasta",
    "magical realism",
    "meta-fiction",
    "squirrels",
    "jazz-funk",
    "improv comedy (sorry)",
    "word puzzles",
    "the Muppets",
    "color field paintings",
    "blueberry lattes", 
    "green curry",
    "lemongrass chicken",
    "reggaeton",
    "being bad at darts"
];

QUOTE_REWORKS = [
    "awakening one morning to find myself transformed in my bed into a gigantic insect",
    "being 27 with no money and no prospects, a burden to my parents, and frightened",
    "obsessively contemplating an ordinary twenty centavos coin until I forget the universe",
    "being the eyes, and ears, and conscience of the Creator of the Universe, you fool",
    "growing old, horrid, and dreadful while the picture remains always young",
    "post-humously writing my own memoir and dedicating it to the worms"
]


copyLikes = [...LIKES]
copyReworks = [...QUOTE_REWORKS]

let typed = null;

function sampleString() {
    console.log("sampling likes");
    
    let which = Math.random();
    console.log(which);
    let sampleString; 
    if (which > .3) {
        if (copyLikes.length < 3) {
            copyLikes = [...LIKES];
        }
        let sampleOne = copyLikes.splice(Math.floor(Math.random() * copyLikes.length), 1)[0];
        let sampleTwo = copyLikes.splice(Math.floor(Math.random() * copyLikes.length), 1)[0];
        let sampleThree = copyLikes.splice(Math.floor(Math.random() * copyLikes.length), 1)[0];
        sampleString = `<font color=\"#A69343\">${sampleOne}</font>, \
        <font color=\"#A69343\">${sampleTwo}</font>, \
        and <font color=\"#A69343\">${sampleThree}</font>.`;
    }
    else {
        if (copyReworks.length < 1) {
            copyReworks = [...QUOTE_REWORKS];
        }
        let sample = copyReworks.splice(Math.floor(Math.random() * copyReworks.length), 1)[0];
        sampleString = `<font color=\"#86b7b7\">${sample}</font>.`;
    }
    return sampleString;
}

typedCreator = function() {
    
    console.log(typed);
    
    if (typed) {
        typed.stop();
        typed.destroy();
        typed = null;
     }

    let typedString = sampleString();
    console.log(typedString);

    typed = new Typed('#typed', {
        strings: 
          [`${typedString}`],
        typeSpeed: 30,
        backSpeed: 10, 
        showCursor: false,
        onLastStringBackspaced: function() { 
            typedCreator();
        },
        loop: true,
        backDelay: 2500});
}

typedCreator();
