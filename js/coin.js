document.getElementById("right").addEventListener("mouseover", spinMyHead);
document.getElementById("right").addEventListener("mouseleave", spinMyHead2);

function spinMyHead() {
    console.log("spinning head");
    document.getElementById("meCoin").style.transform = "rotateY(180deg)";
}

function spinMyHead2() {
    document.getElementById("meCoin").style.transform = "rotateY(0deg)";
}