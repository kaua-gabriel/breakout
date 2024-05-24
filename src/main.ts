import { Actor, CollisionType, Color, Engine, vec } from "excalibur";

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
const velocidadeBolinha = vec(200, 200)

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

// Insere o actor barra no game
game.add(barra)

// Insere o actor bolinha no game
game.add(bolinha)

// 7 - criar os blocos
// tamanho entre os blocos
const padding = 20 
const xoffset = 65
const yoffset = 20

// quantidade de blocos e fileiras
const colunas = 5
const linhas = 3

// cor dos quadrado
const corBloco = [Color.Violet, Color.Orange, Color.Yellow]


// const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const larguraBloco = 136
const alturaBloco = 30

const listaBloco: Actor[] = [] 



//iniciar jogo 
game.start()