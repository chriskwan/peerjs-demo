(function () {
	var peer;

	initialize();

	function initialize() {
		setUpPeer();
		setUpUI();
	}

	function setUpPeer() {
		peer = new Peer({
			key: 'lwjd5qra8257b9', //cwkTODO this is the demo api key
			debug: 3
		});

		// Initialization - ready to receive connections
		peer.on('open', function (id) {
			console.log('My peer ID is: ' + id);

			document.getElementById("mypeerid").innerHTML = id;
		});

		// Received connection from a peer
		peer.on('connection', function (conn) {
			console.log("Connected to by " + conn.peer);

			setUpChatForConnection(conn);
		});
	}

	function setUpUI() {
		// Button to connect to a peer
		document.getElementById("connectBtn").onclick = function () {
			var requestedPeer = document.getElementById("peerIdInput").value;
			connectToPeer(requestedPeer);
		};

		// Button to sending messages to connected peers
		document.getElementById("chatBtn").onclick = function () {
			var message = document.getElementById("chatmessage").value;
			sendMessageToPeers(message);
		};
	}

	function connectToPeer(peerId) {
		var conn = peer.connect(peerId);

		// Connection has been established
		conn.on('open', function () {
			setUpChatForConnection(conn);
		});
	}

	function setUpChatForConnection(conn) {
		conn.on('data', function (data) {
			console.log("Received data from " + conn.peer + ": " + data);
		});
	}

	function sendMessageToPeers(message) {
		for (var currentPeerId in peer.connections) {
			if (!peer.connections.hasOwnProperty(currentPeerId)) {
				return;
			}

			var connectionsWithCurrentPeer = peer.connections[currentPeerId];

			// It's possible to have multiple connections with the same peer,
			// so send on all of them
			for (var i=0; i<connectionsWithCurrentPeer.length; i++) {
				connectionsWithCurrentPeer[i].send(message);
			}
		}
	}

})();