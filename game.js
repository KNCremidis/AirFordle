console.log("AirFordle JS loaded!");

const aircraftDB = [
    {name:"F-22 Raptor", type:"Fighter", year:2005, speed:2.25},
    {name:"F-35 Lightning II", type:"Multirole", year:2015, speed:1.6},
    {name:"F-15 Eagle", type:"Fighter", year:1976, speed:2.5},
    {name:"F-16 Falcon", type:"Fighter", year:1978, speed:2.0},
    {name:"A-10 Thunderbolt II", type:"Attack", year:1977, speed:0.56},
    {name:"F-14 Tomcat", type:"Fighter", year:1974, speed:2.34},
    {name:"F/A-18 Hornet", type:"Multirole", year:1983, speed:1.8},
    {name:"F/A-18 Super Hornet", type:"Multirole", year:1999, speed:1.6},
    {name:"F-4 Phantom II", type:"Fighter", year:1960, speed:2.23},
    {name:"F-5 Tiger II", type:"Fighter", year:1964, speed:1.63},
    {name:"F-100 Super Sabre", type:"Fighter", year:1954, speed:1.3},
    {name:"F-104 Starfighter", type:"Fighter", year:1958, speed:2.0},
    {name:"F-111 Aardvark", type:"Attack", year:1967, speed:2.5},
    {name:"F-117 Nighthawk", type:"Attack", year:1983, speed:0.92},
    {name:"B-52 Stratofortress", type:"Bomber", year:1955, speed:0.86},
    {name:"B-1 Lancer", type:"Bomber", year:1986, speed:1.25},
    {name:"B-2 Spirit", type:"Bomber", year:1997, speed:0.95},
    {name:"B-21 Raider", type:"Bomber", year:2023, speed:0.95},
    {name:"C-130 Hercules", type:"Transport", year:1956, speed:0.59},
    {name:"C-17 Globemaster III", type:"Transport", year:1995, speed:0.74},
    {name:"C-5 Galaxy", type:"Transport", year:1970, speed:0.79},
    {name:"KC-135 Stratotanker", type:"Tanker", year:1957, speed:0.86},
    {name:"KC-10 Extender", type:"Tanker", year:1981, speed:0.89},
    {name:"KC-46 Pegasus", type:"Tanker", year:2019, speed:0.86},
    {name:"E-3 Sentry", type:"AWACS", year:1977, speed:0.75},
    {name:"E-8 JSTARS", type:"Recon", year:1997, speed:0.84},
    {name:"RQ-4 Global Hawk", type:"Recon", year:2001, speed:0.6},
    {name:"MQ-9 Reaper", type:"Recon", year:2007, speed:0.44},
    {name:"U-2 Dragon Lady", type:"Recon", year:1956, speed:0.72},
    {name:"SR-71 Blackbird", type:"Recon", year:1966, speed:3.3},
    {name:"T-38 Talon", type:"Trainer", year:1961, speed:1.3},
    {name:"T-6 Texan II", type:"Trainer", year:2001, speed:0.67},
    {name:"T-7 Red Hawk", type:"Trainer", year:2024, speed:1.2},
    {name:"HH-60 Pave Hawk", type:"Helicopter", year:1982, speed:0.33},
    {name:"UH-1 Huey", type:"Helicopter", year:1959, speed:0.28},
    {name:"AH-64 Apache", type:"Helicopter", year:1986, speed:0.37},
    {name:"CH-47 Chinook", type:"Helicopter", year:1962, speed:0.3},
    {name:"V-22 Osprey", type:"Transport", year:2007, speed:0.83},
    {name:"F-8 Crusader", type:"Fighter", year:1957, speed:1.86},
    {name:"F-6 Skyray", type:"Fighter", year:1956, speed:1.17},
    {name:"F-3 Demon", type:"Fighter", year:1956, speed:0.93},
    {name:"F-2 Viper Zero", type:"Multirole", year:2000, speed:2.0},
    {name:"F-21 Kfir", type:"Fighter", year:1975, speed:2.0},
    {name:"F-7 Airguard", type:"Fighter", year:1965, speed:1.8},
    {name:"F-20 Tigershark", type:"Fighter", year:1982, speed:2.0},
    {name:"F-13 Super Sabre", type:"Fighter", year:1955, speed:1.3},
    {name:"F-9 Cougar", type:"Fighter", year:1952, speed:0.9},
    {name:"F-86 Sabre", type:"Fighter", year:1949, speed:0.9},
    {name:"F-80 Shooting Star", type:"Fighter", year:1945, speed:0.8}
];

let secret = aircraftDB[Math.floor(Math.random() * aircraftDB.length)];

window.onload = () => {
    console.log("AirFordle loaded. Secret aircraft:", secret.name);
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
        document.getElementById("feedback").innerHTML =
            "<p class='wrong'>Invalid aircraft name.</p>";
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
