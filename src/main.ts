import { Actor, CollisionType, Color, Engine, vec, Text, Font } from "excalibur";

// 1 - Criar uma instancia de Engine, que representa o jogo
const game = new Engine({
	width: 800,
	height: 600
})

// 2 - criar barra do player
// game.drawHeigth = altura do game
const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 200,
	height: 20,
	color: Color.Chartreuse

})

// Define o tipo de colisão da barra
// CllisiononType.fixed = significa que ele não ira se "mexer" quando colidir
barra.body.collisionType = CollisionType.Fixed



// 3 - Movimentar a barra de acordo com a posição do mouse
game.input.pointers.primary.on("move", (event) => {
	// faz a posição x da barra, ser igual a posição x do mouse
	barra.pos.x = event.worldPos.x
})

// 4 - criar actor bolinha
const bolinha = new Actor({
	x: 100,
	y: 300,
	radius: 10,
	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

// 5 - Criar movimentação na boinha
const velocidadeBolinha = vec(1000, 1000)

// Apos 1 segundo (1000 ms), Define a velocidaee da bolinha em x = 100 e y = 100
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)

// 6 - fazer bolinha rebater na parede
bolinha.on("postupdate", () => {
	// se a bolinha colidir com o lado esquerdo
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadeBolinha.x
	}

	// se a bolinha colidir com o lado direto
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = -velocidadeBolinha.x
	}

	// se a bolinha colidir com a parte superior
	if (bolinha.pos.y < bolinha.height / 2) {
		bolinha.vel.y = velocidadeBolinha.y
	}

	// se a bolinha colidir com a parte inferior
	// if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight) {
	// 	bolinha.vel.y = -velocidadeBolinha.y 
	// }
})

// 7 - criar os blocos
// tamanho entre os blocos
const padding = 20
const xoffset = 65
const yoffset = 20

// quantidade de blocos e fileiras
const colunas = 5
const linhas = 3

// cor dos quadrado
const corBloco = [Color.Red, Color.Orange, Color.Yellow]


// const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const larguraBloco = 136
const alturaBloco = 30

const listaBloco: Actor[] = []

// renderização 3 linhas
for (let j = 0; j < linhas; j++) {
	// Renderização dos 5 bloquinhos
	for (let i = 0; i < colunas; i++) {
		listaBloco.push(
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

let colidindo: boolean = false
// detectar a colisão
bolinha.on("collisionstart", (event) => {
	// verificar se a bolinha colidiu com algum bloco destrutivel
	if (listaBloco.includes(event.other)) {
		// destruir o bloco colidido
		event.other.kill()
	}

	// rebater a bolinha e inverter as direções
	let interseccao = event.contact.mtv.normalize()


	if (!colidindo) {
		colidindo = true

		// interseccao.x e interseccao.y
		// o maior representao o eixo onde houve contato
		if (Math.abs(interseccao.x) > Math.abs(interseccao.y)) {
			// bolinha.vel.x = -bolinha.vel.x
			// bolinha.vel.x *= -1
			bolinha.vel.x = bolinha.vel.x * -1
		} else {
			bolinha.vel.y = bolinha.vel.y * -1
		}
	}
})

bolinha.on("collisionend", () => {
	colidindo = false
})

bolinha.on('exitviewport', () => {
	alert("acho que morreu")
	window.location.reload()
})

// Insere o actor barra no game
game.add(barra)

// Insere o actor bolinha no game
game.add(bolinha)

// adicionar os blocos
listaBloco.forEach(bloco => {
	// define o tipo de colisor de cada bloco
	bloco.body.collisionType = CollisionType.Active
	game.add(bloco)
})

let Pontos = 0

const textoPontos = new Text({
	text: "Hello world",
	font: new Font({ size: 20 })
})

const objetoTexto = new Actor({
	x: game.drawWidth - 80,
	y: game.drawHeight - 15
})

objetoTexto.graphics.use(textoPontos)

game.add(objetoTexto)

// npm run start
//iniciar jogo 
game.start()