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


async function rollDice(){
        return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
        let radom = Math.random();
        let result;

        switch (true) {
                case radom < 0.33:
                result = "RETA";                       
                break;
                case radom < 0.66:
                result = "CURVA";                        
                break;        
        
                default:
                result = "CONFRONTO";  
                break;
        }
        return result;
}

async function playRaceEngine(character1, character2) {
        for(let round = 1; round <= 5; round++ ){
                console.log(`🏁 Rodada ${round}`);

         //sortear bloco
         let block = await getRandomBlock(); 
         console.log(`BLOCO: ${block}`);
         
         //rolar dados
         let diceResult1 = await rollDice();
         let diceResult2 = await rollDice();
        
         
         //teste de habilidade
         let totalTesteSkill1 = 0;
         let totalTesteSkill2 = 0;

         

         if(block === 'RETA'){
                totalTesteSkill1  = diceResult1 + character1.VELOCIDADE;
                totalTesteSkill2  = diceResult2 + character2.VELOCIDADE;

                await logoRollResult( character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE);
                await logoRollResult( character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE);

         }
         if(block === 'CURVA'){ 
                totalTesteSkill1  = diceResult1 + character1.MANOBRABILIDADE;
                totalTesteSkill2  = diceResult2 + character2.MANOBRABILIDADE;

                
                await logoRollResult( character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
                await logoRollResult( character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

         }
         if(block === 'CONFRONTO'){

                let powerResult1  = diceResult1 + character1.PODER;
                let powerResult2  = diceResult2 + character2.PODER; 
                let typePower;
                let selectTypePower = Math.random();
                console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊`); 

                await logoRollResult( character1.NOME, "Poder", diceResult1, character1.PODER);
                await logoRollResult( character2.NOME, "Poder", diceResult2, character2.PODER);


                if(selectTypePower >= 0.5){
                        typePower = {
                                 MSG:'2 ponto 🔥(BOMBA)',
                                 PONTO: 2                        
                        }

                }else{
                       typePower =  {
                                 MSG:'1 ponto 🐢(CASCO)',
                                 PONTO: 1                        
                        }


                }  

                if(powerResult1 > powerResult2 && character2.PONTOS > 0){


                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu ${typePower.MSG}`);       
                character2.PONTOS = Math.max(0, character2.PONTOS - typePower.PONTO);


                }
                
                if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                 console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu ${typePower.MSG}`);       
                character1.PONTOS = Math.max(0, character2.PONTOS - typePower.PONTO);
                } 
 

         }

        if(totalTesteSkill1 > totalTesteSkill2){
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;

         }else if(totalTesteSkill1 < totalTesteSkill2){

                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;

         }

         console.log("____________________________________");
        }      
      
        
}  

async function logoRollResult(charaterName, block, diceResult, attribute) {
        console.log(`${charaterName} 🎲 rolou o dado ${block} ${diceResult} + ${attribute} =   ${diceResult + attribute}`);           
        
}
async function declareWinner(character1, character2) {
        console.log("Resultado Final:");
        console.log(`${character1.NOME}: ${character1.PONTOS}`);
        console.log(`${character2.NOME}: ${character2.PONTOS}`);
        if(character1.PONTOS > character2.PONTOS){
                console.log(`${character1.NOME} venceu a corrida! Parabéns! 🏆`);
        }else if(character2.PONTOS > character1.PONTOS){
                 console.log(`${character2.NOME} venceu a corrida! Parabéns! 🏆`);

        }else{
               console.log(`${character1.NOME} empatou com o ${character2.NOME}`);   
        }
        
}
(async function main(){  
        console.log(
              `🏁🚨 Corrida de ${player1.NOME} e ${player2.NOME} começando ...\n`
        );
await playRaceEngine(player1, player2);
await declareWinner(player1, player2); 
      
})(); 

 