(function () {
	var myconn;

	var peer = new Peer({
		key: 'lwjd5qra8257b9', //cwkTODO this is the demo api key
		debug: 3
	});

	peer.on('open', function (id) {
		console.log('My peer ID is: ' + id);
	});

	var connectConfirmation = function (conn) {
		var result = window.confirm(conn.peer + " just connected to you. Connect to " + conn.peer + "?");
		if (result) {
			myconn = peer.connect(conn.peer);
			// conn.on('open', function () {
			// 	alert("just made a connection to " + conn.peer);
			// })
		}
	}

	peer.on('connection', function (conn) {
		console.log("Received a pretty cool connection from " + conn.peer);
		conn.on('open', function () {
			
			connectConfirmation(conn);

			conn.on('data', function (data) {
				console.log('Receivedzzzzzd', data);
			});

			//console.log("We are in open of the receiverzzzz");
			//conn.send("Hey thanks for connecting!"); //cwkTODO this won't work becaues we haven't connected to the other person yet!
		});
	})

	document.getElementById("connectBtn").onclick = function () {
		var peerID = document.getElementById("peerIdInput").value;
		myconn = peer.connect(peerID);
		myconn.on('open', function () {
			myconn.send("Im connecting to you. I am " + peerID);
		});
	};

	document.getElementById("chatBtn").onclick = function () {
		var message = document.getElementById("chatmessage").value;
		myconn.send(message);
	};

})();