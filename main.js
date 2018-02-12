function getPlayers() {
  var xhr = new XMLHttpRequest();
  var url = "/api/method/players.get";
  // valid
  var data = {
    v: 1.0,
    offset: parseInt(document.getElementById('get-offset').value),
    limit: parseInt(document.getElementById('get-limit').value),
  };
  var dataToSend = JSON.stringify(data);

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      if (data.status == 'error') {
        document.getElementById("err-message").innerHTML = "Error: " + data.message;
        console.log( "Error " + data.error);
      } else {
        data = data.data;
        var rootElem = document.getElementById('players');
        rootElem.innerHTML = '';
        data.items.forEach(function(player){putPlayer(player, rootElem)});
        document.getElementById("err-message").innerHTML = '';
      }
    } else {
      document.getElementById("err-message").innerHTML = "Ошибка при подгрузке игроков";
    }
  };
  xhr.send(dataToSend);
}

function putPlayer(player, rootElem) {
  var divPlayer = document.createElement('div');
  divPlayer.playerID = player.id;
  divPlayer.innerHTML = player.name
  rootElem.appendChild(divPlayer);
}

function imitGetPlayers() {
  var rootElem = document.getElementById('players');
  var data = [
    {
      id: 1,
      name: 'Player 1'
    },
    {
      id: 2,
      name: 'Player 2'
    },
    {
      id: 3,
      name: 'Player 3'
    },
  ];
  rootElem.innerHTML = '';
  data.forEach(function(player){putPlayer(player, rootElem)});
}

function addPlayer() {
  var xhr = new XMLHttpRequest();
  var url = "/api/method/players.add";
  var rating = parseFloat(document.getElementById('add-rating').value)
  if (rating > 1.0) {
    rating = 0.0;
  }
  var data = {
    v: 1.0,
    name: document.getElementById('add-name').value,
    rating: rating,
  };
  var dataToSend = JSON.stringify(data);

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      if (data.status == 'error') {
        document.getElementById("err-message").innerHTML = "Error: " + data.message;
        console.log( "Error " + data.error);
      } else {
        data = data.data;
        console.log(data);
        document.getElementById("err-message").innerHTML = '';
      }
    } else {
      document.getElementById("err-message").innerHTML = "Ошибка при добавлении игрока";
    }
  };
  xhr.send(dataToSend);
}
