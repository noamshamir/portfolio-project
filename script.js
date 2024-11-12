let user_coins = 0;
let showing_coins = false;

window.onload = function () {
    if (localStorage.getItem("user_coins") != null) {
        user_coins = localStorage.getItem("user_coins");
    } else {
        user_coins = 20;
    }
    document.getElementById("coin-count").innerText = `$${user_coins}`;
    visualizeCoins();
};

function modifyCoins(change) {
    if (user_coins > change) {
        user_coins += change;
        document.getElementById("coin-count").innerText = `$${user_coins}`;
        visualizeCoins();
        localStorage.setItem("user_coins", user_coins);
        console.log(`+${change}`);
    }
}

function purchase(cost) {
    if (user_coins >= cost) {
        modifyCoins(-cost);
    }
}

function unblurContent(id, cost) {
    const content = document.getElementById(id);
    const button = content.nextElementSibling;

    if (user_coins >= cost) {
        content.style.filter = "blur(0px)";
        button.innerHTML = "";
        purchase(cost);
        localStorage.setItem(id, "unlocked");
    }
}

function getCoinBreakdown() {
    let current_coins = user_coins;
    let thousands = Math.floor(current_coins / 1000);
    current_coins -= thousands * 1000;
    let five_hundreds = Math.floor(current_coins / 500);
    current_coins -= five_hundreds * 500;
    let hundreds = Math.floor(current_coins / 100);
    current_coins -= hundreds * 100;
    let twenties = Math.floor(current_coins / 20);
    current_coins -= twenties * 20;
    let fives = Math.floor(current_coins / 5);
    current_coins -= fives * 5;
    let ones = current_coins;
    return { thousands, five_hundreds, hundreds, twenties, fives, ones };
}

function visualizeCoins() {
    const { thousands, five_hundreds, hundreds, twenties, fives, ones } =
        getCoinBreakdown();

    const visualizeContainer = document.getElementById("visualize-coins");
    visualizeContainer.innerHTML = "";

    function addCoins(denomination, count, image_source) {
        const container = document.createElement("div");
        container.className = "coin-column";
        for (let i = 0; i < count; i++) {
            const img = document.createElement("img");
            img.src = image_source;
            img.alt = `${denomination} coin`;
            img.className = "coin-image";
            container.appendChild(img);
        }
        visualizeContainer.appendChild(container);
    }

    addCoins("thousand", thousands, "1000.png");
    addCoins("five_hundred", five_hundreds, "500.png");
    addCoins("hundred", hundreds, "100.png");
    addCoins("twenty", twenties, "20.png");
    addCoins("fives", fives, "5.png");
    addCoins("one", ones, "1.png");
}

let colorPicker;
const defaultColor = "#141414";

window.addEventListener("load", startup, false);

function startup() {
    colorPicker = document.querySelector("#color-selector");
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", updateFirst, false);
}

function updateFirst(event) {
    const p = document.querySelector("p");
    if (p) {
        p.style.color = event.target.value;
    }
}

function changeColor() {
    document.body.style.backgroundColor = colorPicker.value;
}
