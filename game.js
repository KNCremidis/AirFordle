const aircraftDB = [ /* your 50 aircraft list here */ ];

let secret = aircraftDB[Math.floor(Math.random() * aircraftDB.length)];

window.onload = () => {
    const list = document.getElementById("aircraftList");
    aircraftDB.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a.name;
        list.appendChild(li);
    });
};

function submitGuess() {
    const input = document.getElementById("guessInput").value.trim();
    const guess = aircraftDB.find(a => a.name.toLowerCase() === input.toLowerCase());

    if (!guess) {
        document.getElementById("feedback").innerHTML = "<p class='wrong'>Invalid aircraft name.</p>";
        return;
    }

    const fb = compare(guess, secret);

    document.getElementById("feedback").innerHTML = `
        <p>Type: <span class="${fb.typeClass}">${fb.type}</span></p>
        <p>Year: <span class="${fb.yearClass}">${fb.year}</span></p>
        <p>Speed: <span class="${fb.speedClass}">${fb.speed}</span></p>
    `;

    if (guess.name === secret.name) {
        alert("🎉 Correct! You solved AirFordle! The aircraft was: " + secret.name);
        location.reload();
    }
}

function compare(guess, secret) {
    let fb = {};

    fb.type = guess.type === secret.type ? "✔" : "✖";
    fb.typeClass = guess.type === secret.type ? "correct" : "wrong";

    fb.year = guess.year === secret.year ? "✔" :
              guess.year < secret.year ? "↑" : "↓";
    fb.yearClass = fb.year === "✔" ? "correct" :
                   fb.year === "↑" ? "higher" : "lower";

    fb.speed = guess.speed === secret.speed ? "✔" :
               guess.speed < secret.speed ? "↑" : "↓";
    fb.speedClass = fb.speed === "✔" ? "correct" :
                    fb.speed === "↑" ? "higher" : "lower";

    return fb;
}
