

 raw_inspire_polygons 
======================








## Table of contents

1. [raw_inspire_polygons](#raw_inspire_polygons)
  - [Basic tags for this layer](#basic-tags-for-this-layer)
  - [Supported attributes](#supported-attributes)





  - This layer cannot be toggled in the filter view. If you import this layer in your theme, override `title` to make this toggleable.
  - Not visible in the layer selection by default. If you want to make this layer toggable, override `name`
  - Not rendered on the map by default. If you want to rendering this on the map, override `mapRenderings`
  - <img src='../warning.svg' height='1rem'/> This layer is loaded from an external source, namely `https://osm-uk-addresses.russss.dev/inspire/{z}/{x}/{y}.json`
  - This layer will automatically load  [address](./address.md)  into the layout as it depends on it:  A calculated tag loads features from this layer (calculatedTag[0] which calculates the value for _has_address)
  - This layer is needed as dependency for layer [to_import](#to_import)


[Go to the source code](../assets/layers/raw_inspire_polygons/raw_inspire_polygons.json)



 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - inspireid~^..*$




 Supported attributes 
----------------------

 

This document is autogenerated from assets/layers/raw_inspire_polygons/raw_inspire_polygons.json