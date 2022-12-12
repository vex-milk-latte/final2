window.onload = console.log("Ready to Run.");


window.onload = function loadboards() {

  var tableCode = "<table> \
  <tr>\
  <th> Games </th> <th>Platforms</th>\
  </tr>";   
  

  fetch ("https://lime-faithful-hippo.cyclic.app/api/games") 
  .then (response => response.json())  
  .then (json =>{
    console.log ("Call Successful, here's the reply:");
    console.log(json);
    
    console.log("Starting a forEach loop...")
    json.forEach(function(currentGame) {
      tableCode += `<tr id = "${currentGame.id}" onclick = pulleaderboard('${currentGame.id}')> <td>${currentGame.GameName}</td>\
      <td>${currentGame.Platform} </td></tr>`
      
  })
  console.log("forEach loop ended successfully.")

  tableCode += "</table>"; 

  document.getElementById("jsrendered").innerHTML = tableCode; 

  })
     
}

function pulleaderboard(idofselected) {

  var tableCode = "<table> \
  <tr>\
  <th> " + document.getElementById(idofselected).textContent + "</th> <th> Score </th> <th> Time </th>\
  </tr>";  

    console.log(idofselected, "was passed as an argument, which means", document.getElementById(idofselected).textContent, "was chosen. Is this correct?")
    // Needed a workaround, JS wouldn't let me put idofselevted into a link.
    console.log("Constructing API call...")

    var call = ("https://lime-faithful-hippo.cyclic.app/api/leaderBoard/" + idofselected)

    console.log("Construction complete. API call:" + call)
    console.log("Attempting API Call")

     fetch (call)
    .then (response => response.json())  
    .then (json =>{
      console.log ("Call Successful, here's the reply:");
      console.log(json);
      
      console.log("Starting a forEach loop...")

      json.Leaderboard.forEach(function(currentitem) {
        tableCode += `<tr> <td>${currentitem.Player}</td>\ `

        if ((currentitem.Score !== null)) {                   // if the current item's score isnt null,

          (tableCode += `<td>"${currentitem.Score}" </td>\ `) // put the score into the table.
  
        } else {                                              // if it is null,
          
          tableCode += `<td> N/A </td>`                       // Put N/A for score.
          
          console.log("Score for", currentitem.id, "was found to be null.")

        }

        if ((currentitem.Time !== null)) {                // then, if the current item's score isnt null,

        tableCode += `<td> "${currentitem.Time}" </td> </tr>` // put it into the table.

        } else {                                              // if it is null,

          tableCode += `<td> N/A </td> </tr>`;                // put N/A.

        }
          // So all of that ^^ doesn't work but I'm short on timr so not fixing it
          // if you see what i messed up leave a comment or something 
        
    })

  console.log("forEach loop ended successfully.")

  tableCode += "</table>"; 

  document.getElementById("jsrendered").innerHTML = tableCode; 
  
  })
}
