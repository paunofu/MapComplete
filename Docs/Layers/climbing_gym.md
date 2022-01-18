

 climbing_gym 
==============



<img src='https://mapcomplete.osm.be/./assets/themes/climbing/climbing_gym.svg' height="100px"> 

A climbing gym




## Table of contents

1. [climbing_gym](#climbing_gym)
      * [Themes using this layer](#themes-using-this-layer)
  - [Basic tags for this layer](#basic-tags-for-this-layer)
  - [Supported attributes](#supported-attributes)
    + [images](#images)
    + [questions](#questions)
    + [minimap](#minimap)
    + [name](#name)
    + [website](#website)
    + [phone](#phone)
    + [email](#email)
    + [opening_hours](#opening_hours)
    + [reviews](#reviews)










#### Themes using this layer 





  - [climbing](https://mapcomplete.osm.be/climbing)


[Go to the source code](../assets/layers/climbing_gym/climbing_gym.json)



 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - <a href='https://wiki.openstreetmap.org/wiki/Key:sport' target='_blank'>sport</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:sport%3Dclimbing' target='_blank'>climbing</a>
  - <a href='https://wiki.openstreetmap.org/wiki/Key:leisure' target='_blank'>leisure</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:leisure%3Dsports_centre' target='_blank'>sports_centre</a>




 Supported attributes 
----------------------



**Warning** This quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/name#values) [name](https://wiki.openstreetmap.org/wiki/Key:name) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/website#values) [website](https://wiki.openstreetmap.org/wiki/Key:website) | [url](../SpecialInputElements.md#url) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/phone#values) [phone](https://wiki.openstreetmap.org/wiki/Key:phone) | [phone](../SpecialInputElements.md#phone) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/email#values) [email](https://wiki.openstreetmap.org/wiki/Key:email) | [email](../SpecialInputElements.md#email) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/opening_hours#values) [opening_hours](https://wiki.openstreetmap.org/wiki/Key:opening_hours) | [opening_hours](../SpecialInputElements.md#opening_hours) | 




### images 



_This tagrendering has no question and is thus read-only_





### questions 



_This tagrendering has no question and is thus read-only_





### minimap 



_This tagrendering has no question and is thus read-only_





### name 



The question is **What is the name of this climbing gym?**

This rendering asks information about the property  [name](https://wiki.openstreetmap.org/wiki/Key:name) 
This is rendered with `<strong>{name}</strong>`



### website 



The question is **What is the website of {name}?**

This rendering asks information about the property  [website](https://wiki.openstreetmap.org/wiki/Key:website) 
This is rendered with `<a href='{website}' target='_blank'>{website}</a>`



  - **<a href='{contact:website}' target='_blank'>{contact:website}</a>** corresponds with contact:website~^..*$_This option cannot be chosen as answer_




### phone 



The question is **What is the phone number of {name}?**

This rendering asks information about the property  [phone](https://wiki.openstreetmap.org/wiki/Key:phone) 
This is rendered with `<a href='tel:{phone}'>{phone}</a>`



  - **<a href='tel:{contact:phone}'>{contact:phone}</a>** corresponds with contact:phone~^..*$_This option cannot be chosen as answer_




### email 



The question is **What is the email address of {name}?**

This rendering asks information about the property  [email](https://wiki.openstreetmap.org/wiki/Key:email) 
This is rendered with `<a href='mailto:{email}' target='_blank'>{email}</a>`



  - **<a href='mailto:{contact:email}' target='_blank'>{contact:email}</a>** corresponds with contact:email~^..*$_This option cannot be chosen as answer_




### opening_hours 



The question is **What are the opening hours of {name}?**

This rendering asks information about the property  [opening_hours](https://wiki.openstreetmap.org/wiki/Key:opening_hours) 
This is rendered with `<h3>Opening hours</h3>{opening_hours_table(opening_hours)}`



### reviews 



_This tagrendering has no question and is thus read-only_

 

This document is autogenerated from assets/layers/climbing_gym/climbing_gym.json