module.exports = { //module exports son las instrucciones que le dicen a node que llevarse para que sea accesible desde otros archivos
    name: "quiz",
    aliases: ["trivia","preguntas"],
    description: "Quiz",
    async execute(client, message, args, discord) {
       
        /*
        SOLO SALE UNA PREGUNTA SINO SE RALLA, ES PORT EL RANDOMNUMBER DE LA LINEA 20, INTENTA QUE SALGAN MAS Y QUE DE ALGUNA MANERA GUARDE UNA PUNTUACION O ALGO PONER SOLO LAS DE TRUE FALSE SON UNA MIERDA
        
        */ 




        const response = await fetch('https://opentdb.com/api.php?amount=1&type=boolean');
        const data = await response.json();
        console.log('DATOS DEL FETCH',data.results);
        
        var length = data.results.length;
        var randomNumber = Math.floor(Math.random() * length);
        var randomQuestion = data.results[randomNumber];
        var question = randomQuestion.question
        var correctAnswer = randomQuestion.correct_answer;

        message.channel.send(question);
        const filter = m => m.author.id === message.author.id;
        const answer = await message.channel.awaitMessages(filter, {maxMatches: 1, time: 10000, errors: ['time','maxMatches']});
        const ans = answer.first();
        if(ans.content.toLowerCase() === correctAnswer.toLowerCase()){
            message.channel.send("Correcto!!!")
        } else{
            message.channel.send("Falso!!!")
        }
    },
  };