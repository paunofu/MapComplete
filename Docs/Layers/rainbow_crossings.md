[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 rainbow_crossings 
===================



<img src='https://mapcomplete.osm.be/./assets/themes/rainbow_crossings/crossing.svg' height="100px"> 

A layer showing pedestrian crossings with rainbow paintings






  - This layer is shown at zoomlevel **17** and higher
  - This layer will automatically load  [cycleways_and_roads](./cycleways_and_roads.md)  into the layout as it depends on it:  a preset snaps to this layer (presets[0])




#### Themes using this layer 





  - [personal](https://mapcomplete.osm.be/personal)
  - [rainbow_crossings](https://mapcomplete.osm.be/rainbow_crossings)




 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - <a href='https://wiki.openstreetmap.org/wiki/Key:highway' target='_blank'>highway</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:highway%3Dcrossing' target='_blank'>crossing</a>


[Execute on overpass](http://overpass-turbo.eu/?Q=%5Bout%3Ajson%5D%5Btimeout%3A90%5D%3B(%20%20%20%20nwr%5B%22highway%22%3D%22crossing%22%5D(%7B%7Bbbox%7D%7D)%3B%0A)%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B)



 Supported attributes 
----------------------





### images 



This block shows the known images which are linked with the `image`-keys, but also via `mapillary` and `wikidata`

This tagrendering has no question and is thus read-only





### crossing-with-rainbow 



The question is  *Does this crossing has rainbow paintings?*





  - *This crossing has rainbow paintings*  corresponds with  `crossing:marking=rainbow`
  - *No rainbow paintings here*  corresponds with  `not:crossing:marking=rainbow`
  - *No rainbow paintings here*  corresponds with  `crossing:marking!=rainbow`
  - This option cannot be chosen as answer


This tagrendering is only visible in the popup if the following condition is met: `highway=crossing` 

This document is autogenerated from [assets/layers/rainbow_crossings/rainbow_crossings.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/rainbow_crossings/rainbow_crossings.json)
