window.onload = console.log("Ready to Run.");

function addgamechosen(){

    daddgame.style.visibility = "visible"
    daddscore.style.visibility = "hidden"
    

}

function addscorechosen(){

    daddgame.style.visibility = "hidden"
    daddscore.style.visibility = "visible"

    gendropdown()

}

// functions change the visibility of the different options. purely for organization / how cool it is

function gendropdown(){

    var dropdownops = `<select name = "games" id = "gamesopsel">`

    
  fetch ("https://lime-faithful-hippo.cyclic.app/api/games") 
  .then (response => response.json())  
  .then (json =>{
    console.log ("Call Successful, here's the reply:");
    console.log(json);

      json.forEach(function(currentGame) {
      dropdownops += `<option value = "${currentGame.id}">\
      ${currentGame.GameName} for ${currentGame.Platform}</option>`;
    })
      dropdownops += `</select>`

      document.getElementById("jsrendered2").innerHTML = dropdownops; 

  

})

}

function submission(subtype){


  console.log(subtype)
  
    if (subtype == "score") {

      var pname = document.getElementById("plnameinp").value; // player name
      var idofgame =  document.getElementById("gamesopsel");  // id of game selected (DATABASE DETERMINED)
      var score = document.getElementById("score").value; // score for this entry
      var time = document.getElementById("time").value; // time for this entry


      console.log("Submission type: Score")
      console.log("Here are the values submitted:" , pname, idofgame.value, score, time )

      const regexffs = /..:..:..:../

        if (regexffs.test(time) == false) {
        
        alert("Time must be in the following format: hh:mm:ss:ms")

        console.log("Time was in an incorrect format, aborting...")

        return true; }      

      //Prep for submission

      console.log("Prepping an API call...")

      var call = ("https://lime-faithful-hippo.cyclic.app/api/leaderBoard/" +(idofgame.value))

      if (time == null || !time ){
        time = null;
      }

      var submissionsc = {
        "gameID":`${idofgame.value}`,
        "player":`${pname.trim()}`,
        "score":`${score.trim()}`,
        "time": time.trim()}

        
 
    console.log("Making an API call:", call)

      fetch (call,
      {
        "method":"POST",
        "body": JSON.stringify(submissionsc), 
        "headers":{"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => {console.log(response); return response.json()})
      .then((responseResult)=>{
        console.log(responseResult)
        alert("Submission Successful, Server Provided the following:" ,responseResult)

    }
    
    )




} else if (subtype == "game") {

    var gamenamel = document.getElementById("gamenameinp").value    // those are Ls, not 1s. dont forget.
    var platforml = document.getElementById("platforminp").value

    console.log("Submission type: Game")
    console.log("Here are the values submitted:" , gamenamel, platforml)

    var submissiong = 
    {
      "name":`${gamenamel}`,
      "platform":`${platforml}`
    }

    fetch ("https://lime-faithful-hippo.cyclic.app/api/games/",
    {
      "method":"POST",
      "body": JSON.stringify(submissiong), 
      "headers":{"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {console.log(response); response.json()})
    .then((responseResult)=>{
      console.log(responseResult)
      alert("Submission Successful, Server Provided the following:" , responseResult)
      
    })
  }
}
