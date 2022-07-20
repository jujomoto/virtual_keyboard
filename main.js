const keys = [
	[
		["1", "!"],
		["2", "@"],
		["3", "#"],
		["4", "$"],
		["5", "%"],
		["6", "&"],
		["7", "/"],
		["8", "("],
		["9", ")"],
		["0", "="],
		["'", "?"],
		["¡", "¿"],
		["<=", "<="]
	], //first row
	[ 
		["q", "Q"],
		["w", "W"],
		["e", "E"],
		["r", "R"],
		["t", "T"],
		["y", "Y"],
		["u", "U"],
		["i", "I"],
		["o", "O"],
		["p", "P"],
		["`", "^"],
		["+", "*"]
	], //second row
	[
		["MAYUS", "MAYUS"],
		["a", "A"],
		["s", "S"],
		["d", "D"],
		["f", "F"],
		["g", "G"],
		["h", "H"],
		["j", "J"],
		["k", "K"],
		["l", "L"],
		["ñ", "Ñ"],
		["¨", "{"],
		["/", "}"]
	], //third row
	[
		["SHIFT", "SHIFT"],
		["<", ">"],
		["z", "Z"],
		["x", "X"],
		["c", "C"],
		["v", "V"],
		["b", "B"],
		["n", "N"],
		["m", "M"],
		[",", ";"],
		[".", ":"],
		["-", "_"]
	], //fourth row
	[
		["SPACE", "SPACE"]
	], //last row
];


let mayus = false,
shift = false,
current = null; 

renderKeyboard();

function renderKeyboard () {
	const keyboardContainer = document.querySelector('#keyboard-container');
	let empty = `<div class="key-empty"></div>`; 

	const layers = keys.map(layer => {
		return layer.map(key => {
			if (key[0] === "SHIFT") {
				return `<button class="key key-shift ${shift ? 'activated' : ''}">${key[0]}</button>`;
			}
			if (key[0] === "MAYUS") {
				return `<button class="key key-mayus ${mayus ? 'activated' : ''}">${key[0]}</button>`;
			}
			if (key[0] === "SPACE") {
				return `<button class="key key-space"></button>`;
			}
			if (key[0] === "<=") {
				return `<button class="key key-back">${key[0]}</button>`;
			}
			return `
				<button class="key key-normal">
					${
						shift
							? key[1]
							: mayus && 
								key[0].toLowerCase().charCodeAt(0) >= 97 &&
								key[0].toLowerCase().charCodeAt(0) <= 122
							? key[1]
							: key[0]
					}
				</button>
			`;
		})
	})

	console.log(layers);
	layers[0].push(empty);
	layers[1].unshift(empty);

	const htmlLayers = layers.map(layer => {
		return layer.join("");
	});
	console.log(htmlLayers);

	keyboardContainer.innerHTML = '';
	htmlLayers.forEach(ele => {
		keyboardContainer.innerHTML += `<div class="layer">${ele}</div>`;
	})

	document.querySelectorAll('.key').forEach(key => {
		key.addEventListener('click', e => {
			if (current) {
				if (key.textContent === "SHIFT") {
					shift = !shift;
				} else if (key.textContent === "MAYUS") {
					mayus = !mayus;
				} else if (key.textContent === "") {
					current.value += " ";
				} else if (key.textContent === "<=") {
					current.value = current.value.slice(0,-1);
				} else {
					current.value += key.textContent.trim();
					if (shift) {
						shift = false;
					}
				}
				renderKeyboard();
				current.focus();
			}
		})
	})
}

document.querySelector('input').addEventListener('focusin', e => {
	console.log(e.target);	
	current = e.target;
})

			