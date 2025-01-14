const stompClient = new StompJs.Client({
    brokerURL: 'ws://43.202.81.12:8080/ws', // Ensure the WebSocket endpoint matches the server's URL
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (message) => {
        displayResponse(JSON.parse(message.body));
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with WebSocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('STOMP error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#responseTable").show();
    } else {
        $("#responseTable").hide();
    }
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendJsonData() {
    const jsonData = $('#jsonInput').val();
    try {
        const parsedJson = JSON.parse(jsonData);
        stompClient.publish({
            destination: "/app/hello",
            body: JSON.stringify(parsedJson)
        });
    } catch (e) {
        alert("Invalid JSON format");
    }
}

function displayResponse(response) {
    const responseRow = `<tr><td><pre>${JSON.stringify(response, null, 2)}</pre></td></tr>`;
    $("#responseBody").append(responseRow);
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#sendJson").click(() => sendJsonData());
});
