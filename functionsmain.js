

window.onload = console.log("Ready to Run.");



window.onload = function(event) {

  var tableCode = "<table> \
    <tr>\
    <th> Games </th> <th>Platforms</th>\
    </tr>"; 

  fetch ("https://lime-faithful-hippo.cyclic.app/api/games") // calls all games
  .then (response => response.json())  // converts db info to js object
  .then (json =>{
    console.log ("Call Successful, here's the reply:");
    console.log(json);

    json.forEach(function(currentGame) {
      tableCode += `<tr> <td>${currentGame.GameName}</td>\
      <td>${currentGame.Platform} </td></tr>`;
  })

  tableCode += "</table>"; 

  document.getElementById("jsrendered").innerHTML = tableCode; 

  })
     
}



/* var game = [{
    id: 1,
    Name: "Sonic the HedgeHog",
    Platform: 'Switch',
    Leaderboard:[{
      id:1,
      Player: "NATE",
      Score: 10000,
      Time: null
    },{
        id:2,
        Player: "Muhammad",
        Score: 10002,
        Time: null
      }]
  },
  {
    id: 2,
    Name: "Hollow Knight",
    Platform: 'PC',
    Leaderboard:[{
      id:1,
      Player: "Jayson",
      Score: null,
      Time: "20:21:56:02"
    },{
        id:2,
        Player: "Dean",
        Score: null,
        Time: "19:22:40:20"
      }]
  }];

  



code given by prof, no idea where this will be relevant yet.*/ 


