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

    // ✅ 창이 닫히거나 새로고침될 때 자동으로 leaveLive 호출
    window.addEventListener("beforeunload", leaveRoomOnUnload);
}

// 7) 서버와 연결 해제 (Disconnect 버튼 클릭 시)
async function disconnect() {
    leaveRoom();
}

// 8) 창이 닫히거나 새로고침될 때 자동으로 나가기
async function leaveRoomOnUnload(event) {
    event.preventDefault(); // 새로고침 및 닫힘 방지
    leaveRoom();
}

// 9) 서버에서 나가기 처리
async function leaveRoom() {
    const roomId = $("#roomId").val().trim();
    const userId = $("#userId").val().trim();

    if (!roomId || !userId) {
        console.warn("No roomId or userId provided. Not sending leave request.");
    } else {
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

    // ✅ 창이 닫히거나 새로고침될 때 이벤트 제거 (중복 방지)
    window.removeEventListener("beforeunload", leaveRoomOnUnload);
}

// 10) JSON 데이터 전송
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

        stompClient.publish({
            destination: `/sub/send/${roomId}`,
            body: JSON.stringify({
                userId: userId,
                data: parsedJson
            })
        });

    } catch (e) {
        alert("Invalid JSON format");
    }
}

// 11) **수신 메시지를 그대로 화면에 표시**
function displayResponse(response) {
    console.log("Displaying Response:", response);
    const responseRow = `<tr><td><pre>${JSON.stringify(response, null, 2)}</pre></td></tr>`;
    $("#responseBody").append(responseRow);
}

// 12) DOM 로드 후 버튼 이벤트 바인딩
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#sendJson").click(() => sendJsonData());
});
