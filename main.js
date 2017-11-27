function setup() {
    noCanvas();

    let canExecuteCommand = false;

    let bot = new RiveScript();

    bot.loadFile('brain.rive', brainReady, brainError);


    let speech = new p5.Speech(); 

    speech.speak("Hello")

    let weather = new Weather();
    weather.getCurrentWeatherInBudapest();

    let lang = navigator.language || 'en-US'; 
    let speechRec = new p5.SpeechRec(lang, gotSpeech);
    let continuous = true;
    let interim = false;
    
    speechRec.start(continuous, interim);
        function gotSpeech() {
        if(speechRec.resultValue) {
            let input = speechRec.resultString;
            console.log(input);

            var reply = bot.reply('local-user', input);
            console.log(reply);

            if(reply == "listening") {
                canExecuteCommand = true;
                speech.speak("listening");
                console.log("true")
            }
            else if(reply.startsWith("open")) {
                if(canExecuteCommand) {
                    let urlPart = reply.split(" ")[1]
                    window.open('http://www.' + urlPart + '.com', '_blank');
                    canExecuteCommand = false;
                    console.log("false")
                }
            }
            else if(reply.startsWith("google")) {
                if(canExecuteCommand) {
                    let url = reply.split(" ")[1]
                    window.open(url, '_blank');
                    canExecuteCommand = false;
                    console.log("false")
                }
            }
            else {
                if(canExecuteCommand) {
                    speech.speak(reply)
                    canExecuteCommand = false;
                    console.log("false")
                }
            }
        }
    }

    function brainReady() {
        console.log('Brain ready!');
        
        bot.sortReplies();
    }

    function brainError(error) {
        console.log('Brain error: ' + error + '!');
    }

}
