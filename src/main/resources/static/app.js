// // 1) STOMP 클라이언트 생성
// const stompClient = new StompJs.Client({
//     // Spring Boot에서 registry.addEndpoint("/ws")로 설정한 경로와 맞춤
//     brokerURL: 'ws://localhost:38080/ws',  // 실제 서버 주소/포트로 맞게 수정
//
//     // 자동 재연결 (원하면 설정)
//     reconnectDelay: 5000,
//
//     // 디버그 로그 출력 (옵션)
//     debug: (str) => {
//         console.log(str);
//     }
// });
//
// // 2) STOMP 연결 성공 시 콜백
// stompClient.onConnect = (frame) => {
//     setConnected(true);
//     console.log('Connected: ' + frame);
//
//     // roomId를 가져와서 해당 채널을 구독
//     const roomId = $("#roomId").val().trim();
//     if (!roomId) {
//         console.warn("No roomId provided. Not subscribing.");
//         return;
//     }
//
//     // 컨트롤러의 @SendTo("/pub/receive/{roomId}") 경로를 구독
//     // StompConfig에서 enableSimpleBroker("/pub") 설정이므로 최종 /pub/receive/{roomId}
//     stompClient.subscribe(`/pub/receive/${roomId}`, (msg) => {
//         displayResponse(JSON.parse(msg.body));
//     });
//
//     console.log(`Subscribed to /pub/receive/${roomId}`);
// };
//
// // 3) WebSocket 오류 시
// stompClient.onWebSocketError = (error) => {
//     console.error('Error with WebSocket', error);
// };
//
// // 4) STOMP 프로토콜 오류 시
// stompClient.onStompError = (frame) => {
//     console.error('STOMP error: ' + frame.headers['message']);
//     console.error('Additional details: ' + frame.body);
// };
//
// // 5) 연결 상태에 따라 UI 갱신
// function setConnected(connected) {
//     $("#connect").prop("disabled", connected);
//     $("#disconnect").prop("disabled", !connected);
//     if (connected) {
//         $("#responseTable").show();
//     } else {
//         $("#responseTable").hide();
//     }
// }
//
// // 6) 서버에 연결
// function connect() {
//     stompClient.activate();
// }
//
// // 7) 서버와 연결 해제
// function disconnect() {
//     stompClient.deactivate();
//     setConnected(false);
//     console.log("Disconnected");
// }
//
// // 8) JSON 데이터 전송
// function sendJsonData() {
//     const roomId = $("#roomId").val().trim();
//     if (!roomId) {
//         alert("Please enter a valid roomId before sending a message.");
//         return;
//     }
//
//     const jsonData = $('#jsonInput').val();
//     try {
//         const parsedJson = JSON.parse(jsonData);
//
//         // 컨트롤러 @MessageMapping("/send/{roomId}")
//         // StompConfig에서 setApplicationDestinationPrefixes("/sub") => 최종 /sub/send/{roomId}
//         stompClient.publish({
//             destination: `/sub/send/${roomId}`,
//             body: JSON.stringify(parsedJson)
//         });
//
//     } catch (e) {
//         alert("Invalid JSON format");
//     }
// }
//
// // 9) 수신 메시지를 화면에 표시
// function displayResponse(response) {
//     const responseRow = `<tr><td><pre>${JSON.stringify(response, null, 2)}</pre></td></tr>`;
//     $("#responseBody").append(responseRow);
// }
//
// // 10) DOM 로드 후 버튼 이벤트 바인딩
// $(function () {
//     $("form").on('submit', (e) => e.preventDefault());
//     $("#connect").click(() => connect());
//     $("#disconnect").click(() => disconnect());
//     $("#sendJson").click(() => sendJsonData());
// });

// 1) STOMP 클라이언트 생성
// const stompClient = new StompJs.Client({
//     brokerURL: 'ws://localhost:38080/ws',  // 실제 서버 주소/포트로 맞게 수정
//     reconnectDelay: 5000,
//     debug: (str) => {
//         console.log(str);
//     }
// });
//
// // 2) STOMP 연결 성공 시 콜백
// stompClient.onConnect = async (frame) => {
//     setConnected(true);
//     console.log('Connected: ' + frame);
//
//     const roomId = $("#roomId").val().trim();
//     const userId = $("#userId").val().trim();
//
//     if (!roomId || !userId) {
//         console.warn("No roomId or userId provided. Not subscribing.");
//         return;
//     }
//
//     // ✅ REST API로 joinLive 호출
//     try {
//         await fetch(`/live/${roomId}/join/${userId}`, { method: 'POST' });
//         console.log(`User ${userId} joined room ${roomId}`);
//     } catch (error) {
//         console.error("Failed to join live session", error);
//     }
//
//     // ✅ WebSocket 구독 설정
//     stompClient.subscribe(`/pub/receive/${roomId}`, (msg) => {
//         displayResponse(JSON.parse(msg.body));
//     });
//
//     console.log(`Subscribed to /pub/receive/${roomId}`);
// };
//
// // 3) WebSocket 오류 처리
// stompClient.onWebSocketError = (error) => {
//     console.error('Error with WebSocket', error);
// };
//
// // 4) STOMP 프로토콜 오류 처리
// stompClient.onStompError = (frame) => {
//     console.error('STOMP error: ' + frame.headers['message']);
//     console.error('Additional details: ' + frame.body);
// };
//
// // 5) 연결 상태에 따라 UI 갱신
// function setConnected(connected) {
//     $("#connect").prop("disabled", connected);
//     $("#disconnect").prop("disabled", !connected);
//     if (connected) {
//         $("#responseTable").show();
//     } else {
//         $("#responseTable").hide();
//     }
// }
//
// // 6) 서버에 연결
// async function connect() {
//     const roomId = $("#roomId").val().trim();
//     const userId = $("#userId").val().trim();
//
//     if (!roomId || !userId) {
//         alert("Please enter both Room ID and User ID before connecting.");
//         return;
//     }
//
//     stompClient.activate();
// }
//
// // 7) 서버와 연결 해제
// async function disconnect() {
//     const roomId = $("#roomId").val().trim();
//     const userId = $("#userId").val().trim();
//
//     if (!roomId || !userId) {
//         console.warn("No roomId or userId provided. Not sending leave request.");
//     } else {
//         // ✅ REST API로 leaveLive 호출
//         try {
//             await fetch(`/live/${roomId}/leave/${userId}`, { method: 'POST' });
//             console.log(`User ${userId} left room ${roomId}`);
//         } catch (error) {
//             console.error("Failed to leave live session", error);
//         }
//     }
//
//     stompClient.deactivate();
//     setConnected(false);
//     console.log("Disconnected");
// }
//
// // 8) JSON 데이터 전송
// function sendJsonData() {
//     const roomId = $("#roomId").val().trim();
//     const userId = $("#userId").val().trim();
//     if (!roomId || !userId) {
//         alert("Please enter both Room ID and User ID before sending a message.");
//         return;
//     }
//
//     const jsonData = $('#jsonInput').val();
//     try {
//         const parsedJson = JSON.parse(jsonData);
//
//         // 컨트롤러 @MessageMapping("/send/{roomId}")
//         // StompConfig에서 setApplicationDestinationPrefixes("/sub") => 최종 /sub/send/{roomId}
//         stompClient.publish({
//             destination: `/sub/send/${roomId}`,
//             body: JSON.stringify({
//                 userId: userId,
//                 data: parsedJson
//             })
//         });
//
//     } catch (e) {
//         alert("Invalid JSON format");
//     }
// }
//
// // 9) 수신 메시지를 화면에 표시
// function displayResponse(response) {
//     const responseRow = `<tr><td><pre>${JSON.stringify(response, null, 2)}</pre></td></tr>`;
//     $("#responseBody").append(responseRow);
// }
//
// // 10) DOM 로드 후 버튼 이벤트 바인딩
// $(function () {
//     $("form").on('submit', (e) => e.preventDefault());
//     $("#connect").click(() => connect());
//     $("#disconnect").click(() => disconnect());
//     $("#sendJson").click(() => sendJsonData());
// });



// 1) STOMP 클라이언트 생성
const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:38080/ws',  // 실제 서버 주소/포트로 맞게 수정
    reconnectDelay: 5000,
    debug: (str) => {
        console.log(str);
    }
});

// 2) STOMP 연결 성공 시 콜백
stompClient.onConnect = async (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);

    const roomId = $("#roomId").val().trim();
    const userId = $("#userId").val().trim();

    if (!roomId || !userId) {
        console.warn("No roomId or userId provided. Not subscribing.");
        return;
    }

    // ✅ REST API로 joinLive 호출
    try {
        await fetch(`/live/${roomId}/join/${userId}`, { method: 'POST' });
        console.log(`User ${userId} joined room ${roomId}`);
    } catch (error) {
        console.error("Failed to join live session", error);
    }

    // ✅ WebSocket 구독 설정
    stompClient.subscribe(`/pub/receive/${roomId}`, (msg) => {
        try {
            const receivedData = JSON.parse(msg.body);
            console.log("Received Data:", receivedData); // 수신 데이터 로그 확인
            displayResponse(receivedData);
        } catch (error) {
            console.error("Error parsing received JSON", error);
        }
    });

    console.log(`Subscribed to /pub/receive/${roomId}`);
};

// 3) WebSocket 오류 처리
stompClient.onWebSocketError = (error) => {
    console.error('Error with WebSocket', error);
};

// 4) STOMP 프로토콜 오류 처리
stompClient.onStompError = (frame) => {
    console.error('STOMP error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

// 5) 연결 상태에 따라 UI 갱신
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#responseTable").show();
    } else {
        $("#responseTable").hide();
    }
}

// 6) 서버에 연결
async function connect() {
    const roomId = $("#roomId").val().trim();
    const userId = $("#userId").val().trim();

    if (!roomId || !userId) {
        alert("Please enter both Room ID and User ID before connecting.");
        return;
    }

    stompClient.activate();
}

// 7) 서버와 연결 해제
async function disconnect() {
    const roomId = $("#roomId").val().trim();
    const userId = $("#userId").val().trim();

    if (!roomId || !userId) {
        console.warn("No roomId or userId provided. Not sending leave request.");
    } else {
        // ✅ REST API로 leaveLive 호출
        try {
            await fetch(`/live/${roomId}/leave/${userId}`, { method: 'POST' });
            console.log(`User ${userId} left room ${roomId}`);
        } catch (error) {
            console.error("Failed to leave live session", error);
        }
    }

    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

// 8) JSON 데이터 전송
function sendJsonData() {
    const roomId = $("#roomId").val().trim();
    const userId = $("#userId").val().trim();
    if (!roomId || !userId) {
        alert("Please enter both Room ID and User ID before sending a message.");
        return;
    }

    const jsonData = $('#jsonInput').val();
    try {
        const parsedJson = JSON.parse(jsonData);

        const messagePayload = {
            userId: userId,
            type: parsedJson.type,
            boardType: parsedJson.boardType,
            elements: parsedJson.elements,
            sender: parsedJson.sender
        };

        console.log("Sending Data:", messagePayload); // 전송 데이터 로그 확인

        // 컨트롤러 @MessageMapping("/send/{roomId}")
        // StompConfig에서 setApplicationDestinationPrefixes("/sub") => 최종 /sub/send/{roomId}
        stompClient.publish({
            destination: `/sub/send/${roomId}`,
            body: JSON.stringify(messagePayload)
        });

    } catch (e) {
        alert("Invalid JSON format");
    }
}

// 9) **수신 메시지를 그대로 화면에 표시**
function displayResponse(response) {
    console.log("Displaying Response:", response);
    const responseRow = `<tr><td><pre>${JSON.stringify(response, null, 2)}</pre></td></tr>`;
    $("#responseBody").append(responseRow);
}

// 10) DOM 로드 후 버튼 이벤트 바인딩
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#sendJson").click(() => sendJsonData());
});
