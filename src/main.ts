import { Actor, CollisionType, Color, Engine, vec, Font, Label, FontUnit, Sound, Loader, } from "excalibur"

const game = new Engine({
	width: 800,
	height: 600
})

const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 200,
	height: 20,
	color: Color.Chartreuse
})

barra.body.collisionType = CollisionType.Fixed



game.add(barra)

game.input.pointers.primary.on("move", (event) => {
	barra.pos.x = event.worldPos.x

})

const bolinha = new Actor({
	x: 100,
	y: 300,
	radius: 10,
	color: Color.White
})

bolinha.body.collisionType = CollisionType.Passive

let coresbolinhas = [
	Color.Green, 
	Color.Yellow, 
	Color.Violet, 
	Color.Red,	
	Color.Blue,
	Color.Black,
	Color.Rose,
	Color.DarkGray,
	Color.Orange,
	Color.Magenta,
	Color.Gray,

]


const velocidadedaBolinha = vec(900, 900)

setTimeout(() => {
	bolinha.vel = velocidadedaBolinha
}, 1000)

bolinha.on("postupdate", () => {
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadedaBolinha.x
	}
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = -velocidadedaBolinha.x
	}

	if (bolinha.pos.y < bolinha.height / 2) {
		bolinha.vel.y = velocidadedaBolinha.y
	}
	//if (bolinha.pos.y + bolinha.height /2 > game.drawHeight) {
	//	bolinha.vel.y = -velocidadedaBolinha.y

	//}


})

game.add(bolinha)

const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Red, Color.Green, Color.Blue]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const alturaBloco = 30

const listaBlocos: Actor[] = []


for (let j = 0; j < linhas; j++) {
	for (let i = 0; i < colunas; i++) {
		listaBlocos.push(
			new Actor({

				x: xoffset + i * (larguraBloco + padding) + padding,
				y: yoffset + j * (alturaBloco + padding) + padding,
				width: larguraBloco,
				height: alturaBloco,
				color: corBloco[j]
			})
		)
	}
}


listaBlocos.forEach(bloco => {
	bloco.body.collisionType = CollisionType.Active

	game.add(bloco)
})

let pontos = 0



const textoPontos = new Label({
	text: pontos.toString(),
	font: new Font({
		size: 40,
		color: Color.White,
		strokeColor: Color.Black,
		unit: FontUnit.Px,

	}),
	pos: vec(600, 500)

})

game.add(textoPontos)




let colidindo: boolean = false



const som = new Sound('./src/audio/somcoli.wav')
const som2 = new Sound('./src/audio/gameover.wav')
const loader = new Loader([som, som2]);
await game.start(loader);

bolinha.on("collisionstart", (event) => {


	if (listaBlocos.includes(event.other)) {



		som.play(0.5);
		event.other.kill()

		pontos++

		bolinha.color = coresbolinhas[ Math.trunc (Math.random() * 11) ]

		textoPontos.text = pontos.toString()

		if (pontos == 15) {
			alert("Venceu")
	window.location.reload()
		}
	}

	let interseccao = event.contact.mtv.normalize()

	if (!colidindo) {
		colidindo = true

		if (Math.abs(interseccao.x) > Math.abs(interseccao.y)) {
			bolinha.vel.x = bolinha.vel.x * -1
		} else {
			bolinha.vel.y = bolinha.vel.y * -1
		}
	}


})


bolinha.on("collisionend", () => {
	colidindo = false
})


bolinha.on('exitviewport',  () => {
	  som2.play(0.5)
	.then(() => {

		alert("Morreu")
		window.location.reload()
	})
})

// Insere o actor barra no game
game.add(barra)

// Insere o actor bolinha no game
game.add(bolinha)

// adicionar os blocos
listaBlocos.forEach(bloco => {
	// define o tipo de colisor de cada bloco
	bloco.body.collisionType = CollisionType.Active
	game.add(bloco)
})
// npm run start
//iniciar jogo 
game.start()