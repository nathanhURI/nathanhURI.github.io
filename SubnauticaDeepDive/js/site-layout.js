//function to generate the scroll menu
function generateScroll(array){
  for(var i=0; i<array.length; i++){
    var element;
    var image;
    var url = new URL(window.location.href);
    var params = new URLSearchParams(url.search);
    if(params == "element="+array[i].value){
      element = "<a class='list-element active'>" + array[i].name;
    }else{
      element = "<a class='list-element'>" + array[i].name;
    }
    image = "<img class=' icon img-fluid' src=" +array[i].imagepath + array[i].value + "_icon.png alt="+ array[i].name +" Icon></a>";
    $(".vertical-menu").append(element + image);
  }
}

//function to get the url parameter
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

//function to see if url parameter is valid
function isValidParam(array, param){
  for(var i=0; i<array.length; i++){
    if(array[i].value == param){
      return i;
    }
  }
  return -1;
}

//function to set parmeter to first element in array if parameter was not valid
function setToFirst(array){
  var url = new URL(window.location.href);
  var params = new URLSearchParams(url.search);
  params.set("element", array[0].value);
  var newUrl = window.location.href.split('?')[0];
  window.location.replace(newUrl + "?" + params);
}

//function to generate the description and image of the parameter item
function generateDescImg(array){
  var element = getUrlParameter("element");
  var pos = isValidParam(array, element);
  $("#title").html(array[pos].name);
  $("#description").html(array[pos].desc);
  $("#item-image").attr("src",array[pos].imagepath + array[pos].value + "_world.png")

}

//function to generate everything on information page
function generateInfoPage(array){
  //populate scroll menu
  generateScroll(array);

  //handles if there is a parmeter in the URL
  if(getUrlParameter("element")){
    var param = getUrlParameter("element");
    if(isValidParam(array, param) != -1){
      generateDescImg(array);
    }else{
      alert('"' + param + '" is not a valid item for this page. Please try something else.');
      //set to first element in array
      setToFirst(array);
    }
    //check to make sure parameter exists in
  }else{
    //If no parameter, set to 1st element in array
    setToFirst(array);
  }

}

//function to change parameter on menu item click
function changeParam(array, text){

  var param;
  for(var i=0; i<array.length; i++){
    if(array[i].name == text){
      param=array[i].value;
      break;
    }
  }

  var url = new URL(window.location.href);
  var params = new URLSearchParams(url.search);
  params.set("element", param);
  var newUrl = window.location.href.split('?')[0];
  window.location.replace(newUrl + "?" + params);
}

//function to update list based on filter
function filter(text){
  $(".list-element").each(function(index, value) {
    var menuText;
    menuText = $(this).text().toLowerCase();
      if(menuText.includes(text,0)){
        $(this).show();
      }else{ 
        $(this).hide();
      }
  });
}

var floraElements=[
  {
    "name": "Acid Mushroom",
    "value": "acid_mushroom",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "Acid Mushrooms are a hazardous species of flora. They are used as a raw material to manufacture Batteries. <br><br>The player can pick them by hand. The player can also strike one with a Survival Knife to kill it and collect four Acid Mushroom Spores, which releases acid into the water that can cause damage to the player, structures, and nearby fauna and flora. <br><br> The Acid Mushroom and its spores can be planted in an Exterior Growbed or an Alien Containment."
  },
  {
    "name": "Bulb Bush Sample",
    "value": "bulb_bush",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Bulb Bush Sample is a raw material that can be obtained from a Bulb Bush.<br><br> It can be planted in the Exterior Growbed and the Alien Containment. This will yield a Pygmy Bulb Bush.<br><br> It can be eaten raw, supplying the player with 3 Food and 10 Water.<br><br> If placed in the Bioreactor, it produces 420 energy total over the course of 504 seconds."
  },
  {
    "name": "Creepvine Sample",
    "value": "creepvine_sample",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "Creepvine Samples are a Raw Material that can be harvested by using a Survival Knife on Creepvine plants. It can either be directly consumed, used in crafting recipes, planted in an Exterior Growbed or Alien Containment (they need at least two stacked Alien Containment tanks to fully mature and will not grow Creepvine Seed Clusters), or used to power a bioreactor. It takes up four slots in the player's inventory.<br><br> In the Bioreactor, it produces 210 energy total over the course of 4.2 minutes."
  },
  {
    "name": "Creepvine Seed Cluster",
    "value": "creepvine_seed_cluster",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "Creepvine Seed Clusters are a harvestable Raw Material found growing on Creepvines in the Kelp Forest. They grow together on Creepvines in clusters of seven total. <br><br> It appears as a cluster of translucent yellow seeds capable of emitting extremely bright bioluminescent glows - which makes them useful in illuminating a Seabase when lacking the blueprints for Light Sticks, Floodlights and Spotlights. <br><br>Creepvine Seed Clusters are a key ingredient for creating Lubricant and Silicone Rubber, making them a key component early in the game. <br><br> While harvesting Creepvine Seed Clusters in the Kelp Forest, players should be careful of getting attacked by aggressive fauna, like the Stalker."
  },
  {
    "name": "Deep Shroom",
    "value": "deep_shroom",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Deep Shroom is a hazardous flora species found in abundance in the Blood Kelp Zones and their caves, in small clusters, and in the Lost River and the Sea Treader's Tunnel Caves. It is a relative of the Acid Mushroom, and is used as a raw material in the manufacturing of Hydrochloric Acid. <br><br> The player can pick a Deep Shroom by hand to get a single fully-grown plant, or strike it with a knife to harvest four Deep Shroom Spores which can be placed in a planter. The Shroom is destroyed in a single hit and places all four spores in the player's inventory at the same time: if the player does not have sufficient space, any surplus spores are lost. <br><br>Destroying the Shroom releases a small puff of acid which deals up to 8 damage to anything caught in the area of effect. Backing away immediately after striking with the knife can be used to avoid this damage."
  },
  {
    "name": "Eyestalk Seed",
    "value": "eyestalk_seed",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Eye Stalk is a Flora species found scattered throughout a few of the deeper biomes, as well as the Kelp Forest Caves.  It is mostly decoration for the game, being used in only one crafting recipe. It can be harvested for Eye Stalk Seeds by using the knife."
  },
  {
    "name": "Fungal Sample",
    "value": "fungal_sample",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Fungal Sample is a raw material that can be obtained from the Tree Mushroom in Mushroom Forests. The PDA description states that the sample contains fungal enzymes."
  },
  {
    "name": "Gel Sack",
    "value": "gel_sack",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Gel Sack is an edible flora species that can also be used to craft Aerogel.<br><br>It is usually found attached to the walls of deep caves. It can be either picked up or harvested for Gel Sack Spores by using a Knife. A Gel Sack gives one Spore per knife strike. Up to three Spores can be collected from a single Gel Sack in this way, with the Sack being destroyed by the third strike. Extracting Spores from a Gel Sack has no effect on its qualities as a raw material or food source if it is picked up. <br><br>Either item can be planted in an Exterior Growbed. It is a good idea to establish a growbed for gel sacks, as Aerogel is used in several high-end recipes and the plants are fairly rare outside of deep regions."
  },
  {
    "name": "Sea Crown Seed",
    "value": "sea_crown_seed",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Sea Crown is one of the rarest types of harvestable flora in Subnautica, with only a small number in existence. Overall, it is the third rarest type of flora in Subnautica, behind the Giant Cove Tree and Fern Palm. It is found exclusively in the Bulb Zone, the Dunes Sinkhole, the entrance to the Jellyshroom caves, in the Sea emperor leviathan's aquarium, and certain Grassy Plateaus Caves. One of these plants can be found in the general vicinity of Lifepod 12.<br><br> By cutting the plant with a knife, the player can harvest Sea Crown Seeds."
  },
  {
    "name": "Table Coral",
    "value": "table_coral",
    "path": "flora.html?element=",
    "imagepath": "images/plants/",
    "desc" : "The Table Coral Sample is a raw material that can be harvested from Table Corals. Together with Copper Wire and Gold, they are used to manufacture the Computer Chip. This makes the Table Coral Sample a key-component to harvest early on in the game. <br><br>They cannot be harvested by hand. The player must use their Survival Knife/Thermoblade in order to cut the Table Corals, causing the disk to break and drop multiple Table Coral Samples.<br><br>There is no distinction between Table Coral Samples obtained from Green, Purple, Blue or Red Table Corals in the inventory. They will all display an orange Table Coral Sample."
  }
]