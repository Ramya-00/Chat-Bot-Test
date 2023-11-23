$(document).ready(function () {
    $('#send-button').click(function () {
        sendMessage();
    });

    $('#user-input').keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
  
    var responses = [
        { question: 'Hi', answer: 'Hello! How can I assist you today?' },
        { question: 'How are you?', answer: "I'm just a computer program, so I don't have feelings, but I'm here to help you!" },
        { question: 'What is your name?', answer: "I'm a chatbot." },
        { question: 'Good morning', answer: 'Good morning! How can I help you?' },
        { question: 'Good afternoon', answer: 'Good afternoon! What can I do for you?' },
        { question: 'Good evening', answer: 'Good evening! How may I assist you?' },
        { question: 'What"s up?', answer: 'Not much, just here to answer your questions.' },
        { question: 'How"s the weather today?', answer: 'I"m not equipped to provide real-time weather information, but you can check a weather website or app for the latest updates.' },
        { question: 'Tell me a joke', answer: 'Why did the computer keep freezing? Because it left its Windows open!' },
        { question: 'Thank you', answer: 'You"re welcome! If you have any more questions, feel free to ask.' },
        { question: 'What time is it?', answer: 'I"m sorry, I don"t have access to real-time information. Please check your device for the current time.' },
        { question: 'How do I get to the nearest coffee shop?', answer: 'I can"t provide directions, but you can use a map app on your phone to find the nearest coffee shop.' },
        { question: 'Recommend a good book to read', answer: 'One great book to read is "To Kill a Mockingbird" by Harper Lee.' },
        { question: 'How do I make a cup of coffee?', answer: 'To make a cup of coffee, you"ll need coffee grounds and hot water. Pour hot water over the grounds and let it steep for a few minutes. Enjoy!' },
        { question: 'What"s your favorite color?', answer: 'I don"t have personal preferences, but I"m here to assist you with any questions or tasks you have.' }
    ];  

    var signature = ' - Chatbot'; 

    function sendMessage() {
        var userQuestion = $('#user-input').val();
        if (userQuestion === '') return;

        appendMessage(userQuestion, 'sent');
        respondToUser(userQuestion);

        $('#user-input').val('');
    }

    function appendMessage(message, className) {
        var messageWithSignature = message + signature;
        var messageElement = `<div class="message ${className}">${messageWithSignature}</div>`;
        $('#chat-body').append(messageElement);
        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
    }

    function respondToUser(question) {
        var bestMatch = findBestMatch(question, responses);

        if (bestMatch) {
            appendMessage(bestMatch.answer, 'received');
        } else {
            appendMessage("I don't have an answer to that question.", 'received');
        }
    }

    function findBestMatch(userInput, responses) {
        var bestMatch = null;
        var bestScore = 0;

        userInput = userInput.toLowerCase();

        for (var i = 0; i < responses.length; i++) {
            var question = responses[i].question.toLowerCase();
            var answer = responses[i].answer.toLowerCase();

            var score = getMatchingScore(userInput, question);

            if (score > bestScore) {
                bestMatch = responses[i];
                bestScore = score;
            }
        }

        return bestMatch;
    }

    function getMatchingScore(input, keyword) {
        // This is a simple example. You can use more advanced algorithms for scoring.
        return input.split(' ').filter(word => keyword.includes(word)).length;
    }
});
