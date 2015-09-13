(function () {
	var conn;

	var peer = new Peer({
		key: 'lwjd5qra8257b9', //cwkTODO this is the demo api key
		//debug: 3
	});

	peer.on('open', function (id) {
		console.log('My peer ID is: ' + id);
	});

	peer.on('connection', function (conn) {
		console.log("Received a pretty cool connection from " + conn.peer);
		conn.on('open', function () {
			conn.on('data', function (data) {
				console.log('Receivedzzzzzd', data);
			});

			console.log("We are in open of the receiverzzzz");
			conn.send("Hey thanks for connecting!"); //cwkTODO this won't work becaues we haven't connected to the other person yet!
		});
	})

	document.getElementById("connectBtn").onclick = function () {
		var peerID = document.getElementById("peerIdInput").value;
		conn = peer.connect(peerID);
		conn.on('open', function () {
			conn.send("Im connecting to you. I am " + peerID);
		});
	};

	document.getElementById("chatBtn").onclick = function () {
		var message = document.getElementById("chatmessage").value;
		conn.send(message);
	};

})();