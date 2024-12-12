// chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    // Respuestas predefinidas
    const respuestas = {
        "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
        "qué haces": "Estoy aquí para ayudarte con cualquier consulta sobre ciberseguridad e inteligencia artificial.",
        "adiós": "¡Hasta luego! Que tengas un buen día.",
        "cómo proteger mis datos": "Para proteger tus datos, asegúrate de usar contraseñas fuertes, habilitar la autenticación multifactor y mantener tus sistemas actualizados.",
        "qué es la ciberseguridad": "La ciberseguridad es la práctica de proteger sistemas, redes y programas de ataques digitales que buscan acceder, cambiar o destruir información sensible.",
        "cómo funciona la inteligencia artificial": "La inteligencia artificial funciona mediante algoritmos y modelos que permiten a las máquinas aprender de datos, identificar patrones y tomar decisiones con mínima intervención humana.",
        // Añade más respuestas según sea necesario
    };

    // Función para agregar mensajes al chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('mb-3');

        const senderElement = document.createElement('strong');
        senderElement.textContent = sender + ': ';
        messageElement.appendChild(senderElement);

        const textElement = document.createElement('span');
        textElement.textContent = message;
        messageElement.appendChild(textElement);

        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Función para mostrar el indicador de escritura
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.id = 'typing-indicator';
        typingElement.classList.add('mb-3', 'text-muted');
        typingElement.innerHTML = '<em>Consultor está escribiendo...</em>';
        chatContainer.appendChild(typingElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Función para ocultar el indicador de escritura
    function hideTypingIndicator() {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    // Función para simular una respuesta del chatbot
    function simulateBotResponse(userMessage) {
        const mensaje = userMessage.toLowerCase();
        let respuesta = respuestas[mensaje];

        if (!respuesta) {
            respuesta = "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla?";
        }

        addMessage('Consultor', respuesta);
    }

    // Función para enviar el mensaje del usuario
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('Tú', message);
        userInput.value = '';
        sendButton.disabled = true;

        showTypingIndicator(); // Mostrar indicador

        // Simula un tiempo de "pensando"
        setTimeout(() => {
            hideTypingIndicator(); // Ocultar indicador
            simulateBotResponse(message);
            sendButton.disabled = false;
        }, 1000);
    }

    // Evento al hacer clic en el botón de enviar
    sendButton.addEventListener('click', sendMessage);

    // Evento al presionar Enter en el input
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});
