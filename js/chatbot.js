// chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    // Reemplaza 'TU_CLAVE_API_AQUI' con tu clave de API de OpenAI temporal
    const OPENAI_API_KEY = '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';

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

    // Función para enviar consulta a la API de OpenAI
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('Tú', message);
        userInput.value = '';
        sendButton.disabled = true;

        showTypingIndicator(); // Mostrar indicador

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-0125', // Puedes cambiar el modelo si lo deseas
                    messages: [
                        { role: 'system', content: 'Eres un asistente útil.' },
                        { role: 'user', content: message },
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();

            hideTypingIndicator(); // Ocultar indicador

            if (response.ok) {
                const botReply = data.choices[0].message.content.trim();
                addMessage('Consultor', botReply);
            } else {
                const errorMsg = data.error ? data.error.message : 'Hubo un error al procesar tu solicitud.';
                addMessage('Consultor', errorMsg);
            }
        } catch (error) {
            console.error('Error al comunicarse con la API de OpenAI:', error);
            hideTypingIndicator(); // Ocultar indicador
            addMessage('Consultor', 'Error al comunicarse con el servidor.');
        } finally {
            sendButton.disabled = false;
        }
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
