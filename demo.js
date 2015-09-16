(function () {
	var peer = new Peer({
		key: 'lwjd5qra8257b9', //cwkTODO this is the demo api key
		debug: 3
	});

	peer.on('open', function (id) {
		console.log('My peer ID is: ' + id);
		document.getElementById("mypeerid").innerHTML = id;
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

	// Await connections from others
	peer.on('connection', function (conn) {
		console.log("Received a pretty cool connection from " + conn.peer);
		// conn.on('open', function () {
		// 	// Already connected to this peer
		// 	// if (myconn && myconn.peer === conn.peer) {
		// 	// 	return;
		// 	// }

		// 	connectConfirmation(conn);

		// 	conn.on('data', function (data) {
		// 		console.log('Receivedzzzzzd', data);
		// 	});

		// 	//console.log("We are in open of the receiverzzzz");
		// 	//conn.send("Hey thanks for connecting!"); //cwkTODO this won't work becaues we haven't connected to the other person yet!
		// });

		conn.on('data', function (data) {
			console.log("Receiveddddd", data);
		});
	})

	document.getElementById("connectBtn").onclick = function () {
		var requestedPeer = document.getElementById("peerIdInput").value;
		var myconn = peer.connect(requestedPeer);
		myconn.on('open', function () {
			//myconn.send("Im connecting to you. I am " + peerID);
			myconn.on('data', function (data) {
				console.log("received some sick data", data);
			});
		});
	};

	document.getElementById("chatBtn").onclick = function () {
		var message = document.getElementById("chatmessage").value;
		
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
//		myconn.send(message);
	};

})();