const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function logRollResult(charName, block, diceResult, attr) {
  console.log(
    `${charName} 🎲 rolou um dado de ${block} ${diceResult} + ${attr} = ${
      diceResult + attr
    }`
  );
}

async function playRaceEngine(char1, char2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco ${block}`);

    // Rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // Teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + char1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + char2.VELOCIDADE;
      await logRollResult(player1.NOME, block, diceResult1, char1.VELOCIDADE);
      await logRollResult(player2.NOME, block, diceResult2, char2.VELOCIDADE);
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + char1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + char2.MANOBRABILIDADE;

      await logRollResult(
        player1.NOME,
        block,
        diceResult1,
        char1.MANOBRABILIDADE
      );

      await logRollResult(
        player2.NOME,
        block,
        diceResult2,
        char2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + char1.PODER;
      let powerResult2 = diceResult2 + char2.PODER;

      console.log(`${char1.NOME} confrontou com ${char2.NOME}!🥊`);
      await logRollResult(player1.NOME, "poder", diceResult1, char1.PODER);
      await logRollResult(player2.NOME, "poder", diceResult2, char2.PODER);

      char2.PONTOS -= powerResult1 > powerResult2 && char2.pontos > 0 ? 1 : 0;
      char1.PONTOS -= powerResult2 > powerResult1 && char1.pontos > 0 ? 1 : 0;
      console.log(
        powerResult1 > powerResult2
          ? `${char1.NOME} venceu o confronto 1 ponto 🐢`
          : `${char2.NOME} venceu o confronto 1 ponto 🐢`
      );
      console.log(
        powerResult2 === powerResult1 ? `${char2.NOME} marcou um ponto` : ""
      );
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${char1.NOME} marcou um ponto`);
      char1.PONTOS++;
    } else {
      console.log(`${char2.NOME} marcou um ponto`);
      char2.PONTOS++;
    }
  }
}

async function declareWinner(char1, char2) {
  console.log("Resultado Final:");
  console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`);
  console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`);

  if (char1.PONTOS > char2.PONTOS) {
    console.log(`\n${char1.NOME} venceu 🎊!Parabens 🏆`);
  } else if (char2.PONTOS > char1.PONTOS) {
    console.log(`\n${char2.NOME} venceu 🎊!Parabens 🏆`);
  } else {
    console.log(`\nA corrida terminou em empate`);
  }
}

// declarando como uma função auto invocavel sem precisar declarar main() dps de criar
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );
  // await significa que vai esperar o playRaceEngine executar para ir para proxima etapa
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
