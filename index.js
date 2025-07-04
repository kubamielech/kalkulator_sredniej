const btn = document.getElementById('oblicz')
const wyczyscBtn = document.getElementById('wyczysc')

const oblicz_srednia = () => {
	const items = document.querySelectorAll('.item')
	let sumaWazona = 0,
		sumaEcts = 0
	let sumaWazona1 = 0,
		sumaEcts1 = 0
	let sumaWazona2 = 0,
		sumaEcts2 = 0
	let wybranoOcene = false

	items.forEach(item => {
		const ects = parseFloat(item.querySelector('.item__ects').dataset.ects)
		const ocenaInput = item.querySelector('.item__inputs input:checked')
		if (!ocenaInput) return
		wybranoOcene = true
		const ocena = parseFloat(ocenaInput.value)
		sumaWazona += ocena * ects
		sumaEcts += ects

		if (item.classList.contains('semestr-1')) {
			sumaWazona1 += ocena * ects
			sumaEcts1 += ects
		}
		if (item.classList.contains('semestr-2')) {
			sumaWazona2 += ocena * ects
			sumaEcts2 += ects
		}
	})

	const wynikElem = document.getElementById('wynik')
	if (!wybranoOcene) {
		wynikElem.textContent = 'Wybierz ocenę dla przynajmniej jednego przedmiotu!'
	} else {
		const srednia = sumaEcts > 0 ? (sumaWazona / sumaEcts).toFixed(2) : '-'
		const srednia1 = sumaEcts1 > 0 ? (sumaWazona1 / sumaEcts1).toFixed(2) : '-'
		const srednia2 = sumaEcts2 > 0 ? (sumaWazona2 / sumaEcts2).toFixed(2) : '-'
		wynikElem.innerHTML = `
            Średnia cały rok: <b>${srednia}</b><br>
            Średnia I semestr: <b>${srednia1}</b><br>
            Średnia II semestr: <b>${srednia2}</b>
        `
	}
}

const wyczysc = () => {
	document.querySelectorAll('.item__inputs input:checked').forEach(input => {
		input.checked = false
	})
	document.getElementById('wynik').textContent = ''
}

wyczyscBtn.addEventListener('click', wyczysc)
btn.addEventListener('click', oblicz_srednia)

document.querySelectorAll('.item__inputs input').forEach(input => {
	input.addEventListener('change', oblicz_srednia)
})
