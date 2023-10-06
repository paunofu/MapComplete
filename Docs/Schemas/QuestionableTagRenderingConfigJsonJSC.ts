export default {
  "description": "A QuestionableTagRenderingConfigJson is a single piece of code which converts one ore more tags into a HTML-snippet.\nIf the desired tags are missing and a question is defined, a question will be shown instead.",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "mappings": {
      "description": "Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes\n\nquestion: What are common options?",
      "type": "array",
      "items": {
        "$ref": "#/definitions/MappingConfigJson"
      }
    },
    "multiAnswer": {
      "description": "If true, use checkboxes instead of radio buttons when asking the question\n\nquestion: Should a contributor be allowed to select multiple mappings?\n\niftrue: allow to select multiple mappigns\niffalse: only allow to select a single mapping\nifunset: only allow to select a single mapping",
      "type": "boolean"
    },
    "freeform": {
      "description": "Allow freeform text input from the user",
      "type": "object",
      "properties": {
        "key": {
          "description": "question What is the name of the attribute that should be written to?\nifunset: do not offer a freeform textfield as answer option",
          "type": "string"
        },
        "type": {
          "description": "question: What is the input type?\nThe type of the text-field, e.g. 'string', 'nat', 'float', 'date',...\nSee Docs/SpecialInputElements.md and UI/Input/ValidatedTextField.ts for supported values\nsuggestions: return validators.AllValidators.filter(type => !type.isMeta).map((type) => ({if: \"value=\"+type.name, then: \"<b>\"+type.name+\"</b> \"+type.explanation.split(\"\\n\")[0]}))",
          "type": "string"
        },
        "placeholder": {
          "description": "A (translated) text that is shown (as gray text) within the textfield"
        },
        "helperArgs": {
          "description": "Extra parameters to initialize the input helper arguments.\nFor semantics, see the 'SpecialInputElements.md'",
          "type": "array",
          "items": {}
        },
        "addExtraTags": {
          "description": "If a value is added with the textfield, these extra tag is addded.\nUseful to add a 'fixme=freeform textfield used - to be checked'",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "inline": {
          "description": "question: Show the freeform as box within the question?\nInstead of showing a full-width text field, the text field will be shown within the rendering of the question.\n\nThis combines badly with special input elements, as it'll distort the layout.\nifunset: show the freeform input field full-width\niftrue: show the freeform input field as a small field within the question",
          "type": "boolean"
        },
        "default": {
          "description": "default value to enter if no previous tagging is present.\nNormally undefined (aka do not enter anything)",
          "type": "string"
        }
      },
      "required": [
        "key"
      ]
    },
    "question": {
      "description": "question: What question should be shown to the contributor?\n\nA question is presented ot the user if no mapping matches and the 'freeform' key is not set as well.\n\nifunset: This tagrendering will be shown if it is known, but cannot be edited by the contributor, effectively resutling in a read-only rendering",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "type": "string"
        }
      ]
    },
    "questionHint": {
      "description": "question: Should some extra information be shown to the contributor, alongside the question?\nThis hint is shown in subtle text under the question.\nThis can give some extra information on what the answer should ook like\nifunset: No extra hint is given",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "type": "string"
        }
      ]
    },
    "labels": {
      "description": "A list of labels. These are strings that are used for various purposes, e.g. to only include a subset of the tagRenderings when reusing a layer",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "render": {
      "description": "question: What text should be rendered?\n\nThis piece of text will be shown in the infobox.\nNote that \"&LBRACEkey&RBRACE\"-parts are substituted by the corresponding values of the element.\n\nThis text will be shown if:\n- there is no mapping which matches (or there are no matches)\n- no question, no mappings and no 'freeform' is set\n\nNote that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`\ntype: rendered",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "type": "object",
          "properties": {
            "special": {
              "allOf": [
                {
                  "$ref": "#/definitions/Record<string,string|Record<string,string>>"
                },
                {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            }
          },
          "required": [
            "special"
          ]
        },
        {
          "type": "string"
        }
      ]
    },
    "icon": {
      "description": "question: what icon should be shown next to the 'render' value?\nAn icon shown next to the rendering; typically shown pretty small\nThis is only shown next to the \"render\" value\nType: icon",
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "path": {
              "description": "The path to the icon\nType: icon",
              "type": "string"
            },
            "class": {
              "description": "A hint to mapcomplete on how to render this icon within the mapping.\nThis is translated to 'mapping-icon-<classtype>', so defining your own in combination with a custom CSS is possible (but discouraged)",
              "type": "string"
            }
          },
          "required": [
            "path"
          ]
        },
        {
          "type": "string"
        }
      ]
    },
    "condition": {
      "description": "question: When should this item be shown?\n\nOnly show this tagrendering (or ask the question) if the selected object also matches the tags specified as `condition`.\n\nThis is useful to ask a follow-up question.\nFor example, within toilets, asking _where_ the diaper changing table is is only useful _if_ there is one.\nThis can be done by adding `\"condition\": \"changing_table=yes\"`\n\nA full example would be:\n```json\n    {\n      \"question\": \"Where is the changing table located?\",\n      \"render\": \"The changing table is located at {changing_table:location}\",\n      \"condition\": \"changing_table=yes\",\n      \"freeform\": {\n        \"key\": \"changing_table:location\",\n        \"inline\": true\n      },\n      \"mappings\": [\n        {\n          \"then\": \"The changing table is in the toilet for women.\",\n          \"if\": \"changing_table:location=female_toilet\"\n        },\n        {\n          \"then\": \"The changing table is in the toilet for men.\",\n          \"if\": \"changing_table:location=male_toilet\"\n        },\n        {\n          \"if\": \"changing_table:location=wheelchair_toilet\",\n          \"then\": \"The changing table is in the toilet for wheelchair users.\",\n        },\n        {\n          \"if\": \"changing_table:location=dedicated_room\",\n          \"then\": \"The changing table is in a dedicated room. \",\n        }\n      ],\n      \"id\": \"toilet-changing_table:location\"\n    },\n```",
      "anyOf": [
        {
          "$ref": "#/definitions/{and:TagConfigJson[];}"
        },
        {
          "$ref": "#/definitions/{or:TagConfigJson[];}"
        },
        {
          "type": "string"
        }
      ]
    },
    "metacondition": {
      "description": "question: When should this item be shown (including special conditions)?\n\nIf set, this tag will be evaluated agains the _usersettings/application state_ table.\nEnable 'show debug info' in user settings to see available options.\nNote that values with an underscore depicts _application state_ (including metainfo about the user) whereas values without an underscore depict _user settings_",
      "anyOf": [
        {
          "$ref": "#/definitions/{and:TagConfigJson[];}"
        },
        {
          "$ref": "#/definitions/{or:TagConfigJson[];}"
        },
        {
          "type": "string"
        }
      ]
    },
    "description": {
      "description": "A human-readable text explaining what this tagRendering does.\nMostly used for the shared tagrenderings",
      "anyOf": [
        {
          "$ref": "#/definitions/Record<string,string>"
        },
        {
          "type": "string"
        }
      ]
    },
    "classes": {
      "description": "question: What css-classes should be applied to showing this attribute?\n\nA list of css-classes to apply to the entire tagRendering.\nThese classes are applied in 'answer'-mode, not in question mode\nThis is only for advanced users.\n\nValues are split on ` `  (space)",
      "type": "string"
    }
  },
  "required": [
    "id"
  ],
  "definitions": {
    "TagConfigJson": {
      "description": "The main representation of Tags.\nSee https://github.com/pietervdvn/MapComplete/blob/develop/Docs/Tags_format.md for more documentation\n\ntype: tag",
      "anyOf": [
        {
          "$ref": "#/definitions/{and:TagConfigJson[];}"
        },
        {
          "type": "object",
          "properties": {
            "or": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/TagConfigJson"
              }
            }
          },
          "required": [
            "or"
          ]
        },
        {
          "type": "string"
        }
      ]
    },
    "{and:TagConfigJson[];}": {
      "type": "object",
      "properties": {
        "and": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TagConfigJson"
          }
        }
      },
      "required": [
        "and"
      ]
    },
    "{or:TagConfigJson[];}": {
      "type": "object",
      "properties": {
        "or": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TagConfigJson"
          }
        }
      },
      "required": [
        "or"
      ]
    },
    "Record<string,string>": {
      "type": "object"
    },
    "Record<string,string|Record<string,string>>": {
      "type": "object"
    },
    "DenominationConfigJson": {
      "type": "object",
      "properties": {
        "useIfNoUnitGiven": {
          "description": "If this evaluates to true and the value to interpret has _no_ unit given, assumes that this unit is meant.\nAlternatively, a list of country codes can be given where this acts as the default interpretation\n\nE.g., a denomination using \"meter\" would probably set this flag to \"true\";\na denomination for \"mp/h\" will use the condition \"_country=gb\" to indicate that it is the default in the UK.\n\nIf none of the units indicate that they are the default, the first denomination will be used instead",
          "anyOf": [
            {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "boolean"
            }
          ]
        },
        "canonicalDenomination": {
          "description": "The canonical value for this denomination which will be added to the value in OSM.\ne.g. \"m\" for meters\nIf the user inputs '42', the canonical value will be added and it'll become '42m'.\n\nImportant: often, _no_ canonical values are expected, e.g. in the case of 'maxspeed' where 'km/h' is the default.\nIn this case, an empty string should be used",
          "type": "string"
        },
        "canonicalDenominationSingular": {
          "description": "The canonical denomination in the case that the unit is precisely '1'.\nUsed for display purposes only.\n\nE.g.: for duration of something in minutes: `2 minutes` but `1 minute`; the `minute` goes here",
          "type": "string"
        },
        "alternativeDenomination": {
          "description": "A list of alternative values which can occur in the OSM database - used for parsing.\nE.g.: while 'm' is canonical, `meter`, `mtrs`, ... can occur as well",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "human": {
          "description": "The value for humans in the dropdown. This should not use abbreviations and should be translated, e.g.\n{\n    \"en\": \"meter\",\n    \"fr\": \"metre\"\n}",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "humanSingular": {
          "description": "The value for humans in the dropdown. This should not use abbreviations and should be translated, e.g.\n{\n    \"en\": \"minute\",\n    \"nl\": \"minuut\"\n}",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "prefix": {
          "description": "If set, then the canonical value will be prefixed instead, e.g. for '€'\nNote that if all values use 'prefix', the dropdown might move to before the text field",
          "type": "boolean"
        }
      },
      "required": [
        "canonicalDenomination"
      ]
    },
    "TagRenderingConfigJson": {
      "description": "A TagRenderingConfigJson is a single piece of code which converts one ore more tags into a HTML-snippet.\nFor an _editable_ tagRendering, use 'QuestionableTagRenderingConfigJson' instead, which extends this one",
      "type": "object",
      "properties": {
        "render": {
          "description": "question: What text should be rendered?\n\nThis piece of text will be shown in the infobox.\nNote that \"&LBRACEkey&RBRACE\"-parts are substituted by the corresponding values of the element.\n\nThis text will be shown if:\n- there is no mapping which matches (or there are no matches)\n- no question, no mappings and no 'freeform' is set\n\nNote that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`\ntype: rendered",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "object",
              "properties": {
                "special": {
                  "allOf": [
                    {
                      "$ref": "#/definitions/Record<string,string|Record<string,string>>"
                    },
                    {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "type"
                      ]
                    }
                  ]
                }
              },
              "required": [
                "special"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "icon": {
          "description": "question: what icon should be shown next to the 'render' value?\nAn icon shown next to the rendering; typically shown pretty small\nThis is only shown next to the \"render\" value\nType: icon",
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "path": {
                  "description": "The path to the icon\nType: icon",
                  "type": "string"
                },
                "class": {
                  "description": "A hint to mapcomplete on how to render this icon within the mapping.\nThis is translated to 'mapping-icon-<classtype>', so defining your own in combination with a custom CSS is possible (but discouraged)",
                  "type": "string"
                }
              },
              "required": [
                "path"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "condition": {
          "description": "question: When should this item be shown?\n\nOnly show this tagrendering (or ask the question) if the selected object also matches the tags specified as `condition`.\n\nThis is useful to ask a follow-up question.\nFor example, within toilets, asking _where_ the diaper changing table is is only useful _if_ there is one.\nThis can be done by adding `\"condition\": \"changing_table=yes\"`\n\nA full example would be:\n```json\n    {\n      \"question\": \"Where is the changing table located?\",\n      \"render\": \"The changing table is located at {changing_table:location}\",\n      \"condition\": \"changing_table=yes\",\n      \"freeform\": {\n        \"key\": \"changing_table:location\",\n        \"inline\": true\n      },\n      \"mappings\": [\n        {\n          \"then\": \"The changing table is in the toilet for women.\",\n          \"if\": \"changing_table:location=female_toilet\"\n        },\n        {\n          \"then\": \"The changing table is in the toilet for men.\",\n          \"if\": \"changing_table:location=male_toilet\"\n        },\n        {\n          \"if\": \"changing_table:location=wheelchair_toilet\",\n          \"then\": \"The changing table is in the toilet for wheelchair users.\",\n        },\n        {\n          \"if\": \"changing_table:location=dedicated_room\",\n          \"then\": \"The changing table is in a dedicated room. \",\n        }\n      ],\n      \"id\": \"toilet-changing_table:location\"\n    },\n```",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "metacondition": {
          "description": "question: When should this item be shown (including special conditions)?\n\nIf set, this tag will be evaluated agains the _usersettings/application state_ table.\nEnable 'show debug info' in user settings to see available options.\nNote that values with an underscore depicts _application state_ (including metainfo about the user) whereas values without an underscore depict _user settings_",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "freeform": {
          "description": "question: Should a freeform text field be shown?\nAllow freeform text input from the user\nifunset: Do not add a freeform text field",
          "type": "object",
          "properties": {
            "key": {
              "description": "What attribute should be filled out\nIf this key is present in the feature, then 'render' is used to display the value.\nIf this is undefined, the rendering is _always_ shown",
              "type": "string"
            }
          },
          "required": [
            "key"
          ]
        },
        "mappings": {
          "description": "Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "if": {
                "$ref": "#/definitions/TagConfigJson",
                "description": "question: When should this single mapping match?\n\nIf this condition is met, then the text under `then` will be shown.\nIf no value matches, and the user selects this mapping as an option, then these tags will be uploaded to OSM.\n\nFor example: {'if': 'diet:vegetarion=yes', 'then':'A vegetarian option is offered here'}\n\nThis can be an substituting-tag as well, e.g. {'if': 'addr:street:={_calculated_nearby_streetname}', 'then': '{_calculated_nearby_streetname}'}"
              },
              "then": {
                "description": "question: What text should be shown?\n\nIf the condition `if` is met, the text `then` will be rendered.\nIf not known yet, the user will be presented with `then` as an option\nType: rendered",
                "anyOf": [
                  {
                    "$ref": "#/definitions/Record<string,string>"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "icon": {
                "description": "question: What icon should be added to this mapping?\nAn icon supporting this mapping; typically shown pretty small\ninline: <img src='{icon}' class=\"w-8 h-8\" /> {icon}\nType: icon",
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "path": {
                        "description": "The path to the icon\nType: icon",
                        "type": "string"
                      },
                      "class": {
                        "description": "A hint to mapcomplete on how to render this icon within the mapping.\nThis is translated to 'mapping-icon-<classtype>', so defining your own in combination with a custom CSS is possible (but discouraged)",
                        "type": "string"
                      }
                    },
                    "required": [
                      "path"
                    ]
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "required": [
              "if",
              "then"
            ]
          }
        },
        "description": {
          "description": "A human-readable text explaining what this tagRendering does.\nMostly used for the shared tagrenderings",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "classes": {
          "description": "question: What css-classes should be applied to showing this attribute?\n\nA list of css-classes to apply to the entire tagRendering.\nThese classes are applied in 'answer'-mode, not in question mode\nThis is only for advanced users.\n\nValues are split on ` `  (space)",
          "type": "string"
        }
      }
    },
    "MinimalTagRenderingConfigJson": {
      "description": "Mostly used for lineRendering and pointRendering",
      "type": "object",
      "properties": {
        "render": {
          "description": "question: What value should be rendered?\n\nThis piece of text will be shown in the infobox.\nNote that \"&LBRACEkey&RBRACE\"-parts are substituted by the corresponding values of the element.\n\nThis value will be used if there is no mapping which matches (or there are no matches)\nNote that this is a HTML-interpreted value, so you can add links as e.g. '&lt;a href='{website}'>{website}&lt;/a>' or include images such as `This is of type A &lt;br>&lt;img src='typeA-icon.svg' />`",
          "type": "string"
        },
        "mappings": {
          "description": "Allows fixed-tag inputs, shown either as radiobuttons or as checkboxes",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "if": {
                "$ref": "#/definitions/TagConfigJson",
                "description": "question: When should this single mapping match?\n\nIf this condition is met, then the text under `then` will be shown.\nIf no value matches, and the user selects this mapping as an option, then these tags will be uploaded to OSM.\n\nFor example: {'if': 'diet:vegetarion=yes', 'then':'A vegetarian option is offered here'}\n\nThis can be an substituting-tag as well, e.g. {'if': 'addr:street:={_calculated_nearby_streetname}', 'then': '{_calculated_nearby_streetname}'}"
              },
              "then": {
                "description": "question: What text should be shown?\n\nIf the condition `if` is met, the text `then` will be rendered.\nIf not known yet, the user will be presented with `then` as an option",
                "type": "string"
              }
            },
            "required": [
              "if",
              "then"
            ]
          }
        }
      }
    },
    "Record<string,string[]>": {
      "type": "object"
    },
    "MappingConfigJson": {
      "type": "object",
      "properties": {
        "if": {
          "$ref": "#/definitions/TagConfigJson",
          "description": "question: What tags should be matched to show this option?\n\nIf in 'question'-mode and the contributor selects this option, these tags will be applied to the object"
        },
        "then": {
          "description": "Question: What corresponding text should be shown?\nShown if the `if` is fulfilled\nType: rendered",
          "anyOf": [
            {
              "$ref": "#/definitions/Record<string,string>"
            },
            {
              "type": "string"
            }
          ]
        },
        "icon": {
          "description": "question: What icon should be shown next to this mapping?\n\nThis icon will only be shown if the value is known, it is not displayed in the options (but might be in the future)\n\nifunset: Show no icon\nType: icon",
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "path": {
                  "description": "The path to the  icon\nType: icon",
                  "type": "string"
                },
                "class": {
                  "description": "Size of the image",
                  "type": "string"
                }
              },
              "required": [
                "path"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "hideInAnswer": {
          "description": "question: Under what circumstances should this mapping be <b>hidden</b> from the possibilities a contributor can pick?\niftrue: Never show this mapping as option to pick\nifunset: Always show this mapping as option to pick\ntype: tag\n\nIn some cases, multiple taggings exist (e.g. a default assumption, or a commonly mapped abbreviation and a fully written variation).\n\nIn the latter case, a correct text should be shown, but only a single, canonical tagging should be selectable by the user.\nIn this case, one of the mappings can be hiden by setting this flag.\n\nTo demonstrate an example making a default assumption:\n\nmappings: [\n {\n     if: \"access=\", -- no access tag present, we assume accessible\n     then: \"Accessible to the general public\",\n     hideInAnswer: true\n },\n {\n     if: \"access=yes\",\n     then: \"Accessible to the general public\", -- the user selected this, we add that to OSM\n },\n {\n     if: \"access=no\",\n     then: \"Not accessible to the public\"\n }\n]\n\n\nFor example, for an operator, we have `operator=Agentschap Natuur en Bos`, which is often abbreviated to `operator=ANB`.\nThen, we would add two mappings:\n{\n    if: \"operator=Agentschap Natuur en Bos\" -- the non-abbreviated version which should be uploaded\n    then: \"Maintained by Agentschap Natuur en Bos\"\n},\n{\n    if: \"operator=ANB\", -- we don't want to upload abbreviations\n    then: \"Maintained by Agentschap Natuur en Bos\"\n    hideInAnswer: true\n}\n\nHide in answer can also be a tagsfilter, e.g. to make sure an option is only shown when appropriate.\nKeep in mind that this is reverse logic: it will be hidden in the answer if the condition is true, it will thus only show in the case of a mismatch\n\ne.g., for toilets: if \"wheelchair=no\", we know there is no wheelchair dedicated room.\nFor the location of the changing table, the option \"in the wheelchair accessible toilet is weird\", so we write:\n\n{\n    \"question\": \"Where is the changing table located?\"\n    \"mappings\": [\n        {\"if\":\"changing_table:location=female\",\"then\":\"In the female restroom\"},\n       {\"if\":\"changing_table:location=male\",\"then\":\"In the male restroom\"},\n       {\"if\":\"changing_table:location=wheelchair\",\"then\":\"In the wheelchair accessible restroom\", \"hideInAnswer\": \"wheelchair=no\"},\n\n    ]\n}\n\nAlso have a look for the meta-tags\n{\n    if: \"operator=Agentschap Natuur en Bos\",\n    then: \"Maintained by Agentschap Natuur en Bos\",\n    hideInAnswer: \"_country!=be\"\n}",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": [
                "string",
                "boolean"
              ]
            }
          ]
        },
        "ifnot": {
          "description": "question: What tags should be applied if this mapping is _not_ chosen?\n\nOnly applicable if 'multiAnswer' is set.\nThis is for situations such as:\n`accepts:coins=no` where one can select all the possible payment methods. However, we want to make explicit that some options _were not_ selected.\nThis can be done with `ifnot`\nNote that we can not explicitly render this negative case to the user, we cannot show `does _not_ accept coins`.\nIf this is important to your usecase, consider using multiple radiobutton-fields without `multiAnswer`",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "addExtraTags": {
          "description": "question: What extra tags should be added to the object if this object is chosen?\ntype: simple_tag[]\n\nIf chosen as answer, these tags will be applied onto the object, together with the tags from the `if`\nNot compatible with multiAnswer.\n\nThis can be used e.g. to erase other keys which indicate the 'not' value:\n```json\n{\n    \"if\": \"crossing:marking=rainbow\",\n    \"then\": \"This is a rainbow crossing\",\n    \"addExtraTags\": [\"not:crossing:marking=\"]\n}\n```",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "searchTerms": {
          "description": "question: If there are many options, what search terms match too?\nIf there are many options, the mappings-radiobuttons will be replaced by an element with a searchfunction\n\nSearchterms (per language) allow to easily find an option if there are many options\ngroup: hidden",
          "$ref": "#/definitions/Record<string,string[]>"
        },
        "priorityIf": {
          "description": "If the searchable selector is picked, mappings with this item will have priority and show up even if the others are hidden\nUse this sparingly\ngroup: hidden",
          "anyOf": [
            {
              "$ref": "#/definitions/{and:TagConfigJson[];}"
            },
            {
              "$ref": "#/definitions/{or:TagConfigJson[];}"
            },
            {
              "type": "string"
            }
          ]
        },
        "#": {
          "description": "Used for comments or to disable a validation\n\ngroup: hidden\nignore-image-in-then: normally, a `then`-clause is not allowed to have an `img`-html-element as icons are preferred. In some cases (most notably title-icons), this is allowed",
          "type": "string"
        }
      },
      "required": [
        "if",
        "then"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}