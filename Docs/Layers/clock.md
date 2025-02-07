[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 clock 
=======



<img src='https://mapcomplete.osm.be/./assets/layers/clock/clock.svg' height="100px"> 

Layer with public clocks






  - This layer is shown at zoomlevel **13** and higher
  - This layer will automatically load  [walls_and_buildings](./walls_and_buildings.md)  into the layout as it depends on it:  a preset snaps to this layer (presets[1])




#### Themes using this layer 





  - [clock](https://mapcomplete.osm.be/clock)
  - [personal](https://mapcomplete.osm.be/personal)




 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - <a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dclock' target='_blank'>clock</a>


[Execute on overpass](http://overpass-turbo.eu/?Q=%5Bout%3Ajson%5D%5Btimeout%3A90%5D%3B(%20%20%20%20nwr%5B%22amenity%22%3D%22clock%22%5D(%7B%7Bbbox%7D%7D)%3B%0A)%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B)



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/support#values) [support](https://wiki.openstreetmap.org/wiki/Key:support) | Multiple choice | [pole](https://wiki.openstreetmap.org/wiki/Tag:support%3Dpole) [wall_mounted](https://wiki.openstreetmap.org/wiki/Tag:support%3Dwall_mounted) [billboard](https://wiki.openstreetmap.org/wiki/Tag:support%3Dbillboard) [ground](https://wiki.openstreetmap.org/wiki/Tag:support%3Dground)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/display#values) [display](https://wiki.openstreetmap.org/wiki/Key:display) | Multiple choice | [analog](https://wiki.openstreetmap.org/wiki/Tag:display%3Danalog) [digital](https://wiki.openstreetmap.org/wiki/Tag:display%3Ddigital) [sundial](https://wiki.openstreetmap.org/wiki/Tag:display%3Dsundial) [unorthodox](https://wiki.openstreetmap.org/wiki/Tag:display%3Dunorthodox)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/visibility#values) [visibility](https://wiki.openstreetmap.org/wiki/Key:visibility) | Multiple choice | [house](https://wiki.openstreetmap.org/wiki/Tag:visibility%3Dhouse) [street](https://wiki.openstreetmap.org/wiki/Tag:visibility%3Dstreet) [area](https://wiki.openstreetmap.org/wiki/Tag:visibility%3Darea)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/date#values) [date](https://wiki.openstreetmap.org/wiki/Key:date) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:date%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:date%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/thermometer#values) [thermometer](https://wiki.openstreetmap.org/wiki/Key:thermometer) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:thermometer%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:thermometer%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/barometer#values) [barometer](https://wiki.openstreetmap.org/wiki/Key:barometer) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:barometer%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:barometer%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/hygrometer#values) [hygrometer](https://wiki.openstreetmap.org/wiki/Key:hygrometer) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:hygrometer%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:hygrometer%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/faces#values) [faces](https://wiki.openstreetmap.org/wiki/Key:faces) | [pnat](../SpecialInputElements.md#pnat) | [1](https://wiki.openstreetmap.org/wiki/Tag:faces%3D1) [2](https://wiki.openstreetmap.org/wiki/Tag:faces%3D2) [4](https://wiki.openstreetmap.org/wiki/Tag:faces%3D4)




### images 



This block shows the known images which are linked with the `image`-keys, but also via `mapillary` and `wikidata`

This tagrendering has no question and is thus read-only





### support 



The question is  *In what way is the clock mounted?*





  - *This clock is mounted on a pole*  corresponds with  `support=pole`
  - *This clock is mounted on a wall*  corresponds with  `support=wall_mounted`
  - *This clock is part of a billboard*  corresponds with  `support=billboard`
  - *This clock is on the ground*  corresponds with  `support=ground`




### display 



The question is  *How does this clock display the time?*





  - *This clock displays the time with hands*  corresponds with  `display=analog`
  - *This clock displays the time with digits*  corresponds with  `display=digital`
  - *This clock displays the time with a sundial*  corresponds with  `display=sundial`
  - *This clock displays the time in a non-standard way, e.g using binary, water or something else*  corresponds with  `display=unorthodox`




### visibility 



The question is  *How visible is this clock?*





  - *This clock is visible from about 5 meters away (small wall-mounted clock)*  corresponds with  `visibility=house`
  - *This clock is visible from about 20 meters away (medium size billboard clock)*  corresponds with  `visibility=street`
  - *This clock is visible from more than 20 meters away (church clock)*  corresponds with  `visibility=area`




### date 



The question is  *Does this clock also display the date?*





  - *This clock also displays the date*  corresponds with  `date=yes`
  - *This clock does not display the date*  corresponds with  `date=no`
  - *This clock does probably not display the date*  corresponds with  ``
  - This option cannot be chosen as answer




### thermometer 



The question is  *Does this clock also display the temperature?*





  - *This clock also displays the temperature*  corresponds with  `thermometer=yes`
  - *This clock does not display the temperature*  corresponds with  `thermometer=no`
  - *This clock does probably not display the temperature*  corresponds with  ``
  - This option cannot be chosen as answer




### barometer 



The question is  *Does this clock also display the air pressure?*





  - *This clock also displays the air pressure*  corresponds with  `barometer=yes`
  - *This clock does not display the air pressure*  corresponds with  `barometer=no`
  - *This clock does probably not display the air pressure*  corresponds with  ``
  - This option cannot be chosen as answer




### hygrometer 



The question is  *Does this clock also display the humidity?*





  - *This clock also displays the humidity*  corresponds with  `hygrometer=yes`
  - *This clock does not display the humidity*  corresponds with  `hygrometer=no`
  - *This clock does probably not display the humidity*  corresponds with  ``
  - This option cannot be chosen as answer




### faces 



The question is  *How many faces does this clock have?*

This rendering asks information about the property  [faces](https://wiki.openstreetmap.org/wiki/Key:faces) 

This is rendered with  `This clock has {faces} faces`





  - *This clock has one face*  corresponds with  `faces=1`
  - *This clock has two faces*  corresponds with  `faces=2`
  - *This clock has four faces*  corresponds with  `faces=4`
 

This document is autogenerated from [assets/layers/clock/clock.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/clock/clock.json)
