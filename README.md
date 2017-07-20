## Demo project for Prismic.io

It's meant to work with API v2 libs here:
* [prismic-javascript](https://github.com/prismicio/prismic-javascript) is on Github.
* [prismic-dom](https://github.com/prismicio/prismic-dom) is on Github.

------------------------------------


[1. Installation](#installation)
--------------------------------

> [Prismic CLI](#prismic-cli) <br />
> [NPM](#npm) <br />
> [Start](#start) <br />
> [Dev](#dev) <br />

[2. Query the content](#query-the-content)
--------------------------------

[3. Integrate the content](#integrate-the-content)
-----------------------------------------------------

> [Embed](#embed) <br />
> [Image](#image) <br />
> [Text](#text) <br />
> [Number](#number) <br />
> [Date](#date) <br />
> [Timestamp](#timestamp) <br />
> [Select](#select) <br />
> [Color](#color) <br />
> [StructuredText](#structuredText) <br />
> [WebLink](#weblink) <br />
> [DocumentLink](#documentlink) <br />
> [ImageLink](#imagelink) <br />
> [FileLink](#filelink) <br />
> [Separator](#separator) <br />
> [Group](#group) <br />
> [GeoPoint](#geopoint) <br />
> [Slices](#slices) <br />

[4. Contribute](#contribute)
-----------------------------------------------------

[5. Implement I18N](#implement-i18n)
-----------------------------------------------------

[6. Manage profiles](#manage-profiles)
-----------------------------------------------------

[7. License](#license)
-----------------------------------------------------

===================================================

### Installation

#### Prismic CLI
- install prismic CLI
```sh
npm install -g prismic-cli
```

- create project with prismic theme:
```sh
prismic theme https://github.com/prismicio/prismic-demo
```

#### NPM

```sh
npm install
```
#### Start
```sh
npm start
```

#### Dev
```sh
npm run dev
```

### Query the content

To fetch documents from your repository, you need to fetch the Api data first.

```javascript
var Prismic = require('prismic-javascript');

Prismic.api("http://your_repository_name.prismic.io/api", function(error, api) {
  var options = {}; // In Node.js, pass the request as 'req' to read the reference from the cookies
  api.query("", options, function(err, response) { // An empty query will return all the documents
    if (err) {
      console.log("Something went wrong: ", err);
    }
    console.log("Documents: ", response.documents);
  });
});
```

All asynchronous calls return ES2015 promises, so alternatively you can use them instead of callbacks.

```javascript
var Prismic = require('prismic-javascript');

Prismic.api("https://your-repository-name.prismic.io/api").then(function(api) {
  return api.query(""); // An empty query will return all the documents
}).then(function(response) {
  console.log("Documents: ", response.results);
}, function(err) {
  console.log("Something went wrong: ", err);
});
```

See the [developer documentation](https://prismic.io/docs) or the [API documentation](https://prismicio.github.io/prismic-javascript/globals.html) for more details on how to use it.

### Integrate the content

In each case documented below, you will have a snippet of the custom type and another for the code needed to fill the content field into your JS Template.
In these examples we have a `doc` parameter corresponding to the fetched prismic document.


#### Embed
Custom type
```javascript
"video" : {
  "type" : "Embed"
}
```

Template JS
```javascript
doc.data.video.embed_url
```

#### Image
Custom type
```javascript
"photo" : {
  "type" : "Image",
  "fieldset" : "Image",
  "config" : {
    "constraint" : {
      "width" : 300,
      "height" : 300
    },
    "thumbnails" : [ {
      "name" : "Small",
      "width" : 100,
      "height" : 100
    }, {
      "name" : "Medium",
      "width" : 200,
      "height" : 200
    }, {
      "name" : "Large",
      "width" : 300,
      "height" : 300
    } ]
  }
}
```
Template JS
```javascript
//main view
doc.data.photo.url
doc.data.photo.alt
doc.data.photo.width
doc.data.photo.height

//thumbnails => example for small view
doc.data.photo.small.url
doc.data.photo.small.alt
doc.data.photo.small.width
doc.data.photo.small.height
```
#### Text
Custom type
```javascript
"title" : {
  "type" : "Text",
}
```

Template JS
```javascript
doc.data.title
```
#### Number
Custom type
```javascript
"count" : {
  "type" : "Text",
}
```

Template JS
```javascript
doc.data.count
```
#### Date
Custom type
```javascript
"publication" : {
  "type" : "Date",
}
```

Template JS
```javascript
import { Date } from 'prismic-dom'

// date as string from the API
doc.data.publication
// date as JS Date
Date(doc.data.publication)

```
#### Timestamp
Custom type
```javascript
"time" : {
  "type" : "Timestamp",
}
```

Template JS
```javascript
import { Date } from 'prismic-dom'

// timestamp as string from the API
doc.data.time
// timestamp as JS Datetime
Date(doc.data.time)
```
#### Select
Custom type
```javascript
"gender" : {
  "type" : "Select",
}
```

Template JS
```javascript
doc.data.gender
```
#### Color
Custom type
```javascript
"background" : {
  "type" : "Color",
}
```

Template JS
```javascript
doc.data.background
```
#### RichText
Custom type
```javascript
"description" : {
  "type" : "StructuredText",
}
```

Template JS
```javascript
import { RichText } from 'prismic-dom'

RichText.asText(doc.data.description)

//linkResolver must be declare somewhere
RichText.asHtml(doc.data.description, linkResolver)
```

#### WebLink
Custom type
```javascript
"linktoweb" : {
  "type" : "Link",
  "config" : {
    "select" : "web"
  }
}
```

Template JS
```javascript
doc.data.linktoweb.url
```
#### DocumentLink
Custom type
```javascript
"linktodoc" : {
  "type" : "Link",
  "config" : {
    "select" : "document",
    "customtypes" : [ <your-custom-type-id> ],
    "tags" : [ <your-tag> ],
  }
}
```

Template JS
```javascript
//return url of the document link
doc.data.linktodoc
//return url of the document
linkResolver(doc.data.linktodoc)
```
#### ImageLink
Custom type
```javascript
"linktomedia" : {
  "type" : "Link",
  "config" : {
    "select" : "media"
  }
}
```

Template JS
```javascript
doc.data.linktomedia.url
```
#### FileLink
Custom type
```javascript
"linktofile" : {
  "type" : "Link",
  "config" : {
    "select" : "media"
  }
}
```

Template JS
```javascript
doc.data.linktofile.url
```
#### Group
Custom type
```javascript
"feature" : {
  "type" : "Group",
  "repeat": true, //default to true but put explicitly for the example
  "config" : {
    "field" : {
        "title" : {
          "type" : "Text",
        },
        "description" : {
          "type" : "StructuredText",
        }
    }
  }
}
```

Template JS
```javascript
import { RichText } from 'prismic-dom'

doc.data.feature.forEach(item => {
    item.title
    RichText.asHtml(item.description, linkResolver)
})
```
#### GeoPoint
Custom type
```javascript
"location" : {
  "type" : "GeoPoint",
}
```

Template JS
```javascript
doc.data.latitude
doc.data.longitude
```
#### Slices
**Slice with Group as value**
The Group value will be put directly as Slice value
Custom type
```javascript
"contentAsSlices" : {
    "fieldset" : "Dynamic page zone...",
    "type" : "Slices",
    "config" : {
        "choices" : {
            "slides" : {
                "type" : "Group",
                //required to display name in slice select in the writing room
                "fieldset" : "Slides",
                "config" : {
                    "fields" : {
                        "illustration" : {
                          "type" : "Image"
                        },
                        "title" : {
                          "type" : "StructuredText"
                        }
                    }
                }
            }
        }
    }
}
```

Template JS
```javascript
doc.data.contentAsSlices.map((slice) => {
    switch(slice.slice_type) {
        case 'slides':
          slice.value.map((item) => {
            item.illustration.url
            item.title
          })
          break
    }
})

```
**Slice with basic fragment like Text as value**
The fragment value will be put directly as Slice value
Custom type
```javascript
"contentAsSlices" : {
    "fieldset" : "Dynamic page zone...",
    "type" : "Slices",
    "config" : {
        "choices" : {
            "description" : {
              "type" : "StructuredText"
            }
        }
    }
}
```

Template JS
```javascript
import { RichText } from 'prismic-dom'

doc.contentAsSlices.map((slice) => {
    switch(slice.slice_type) {
        case 'description':
            RichText.asHtml(slice.value, linkResolver)
            break
    }
})

```

**new Slice**
the new Slice type allow you to create a repeatable area and a non repeatable one.
```javascript
"contentAsSlices" : {
    "fieldset" : "Dynamic page zone...",
    "type" : "Slices",
    "config" : {
        "choices" : {
            "newslice" : {
              "type" : "Slice",
              "non-repeat": {
                "title": {
                  "type": "Text"
                }
              },
              "repeat": {
                "description": {
                  "type" : "StructuredText"
                }
              }
            }
        }
    }
}
```

Template JS
```javascript
import { RichText } from 'prismic-dom'

doc.contentAsSlices.map((slice) => {
    switch(slice.slice_type) {
        case 'newslice':
          //non repeatable part
          slice.value.primary.title

          //repeatable part
          slice.value.items.map(item => {
            RichText.asHtml(item.description, linkResolver)
          })
          break
    }
})

```

### Contribute

#### Run the project

Install dependencies:

```sh
npm install
```

Run the project in standard mode:

```sh
npm start
```

Run the project in dev mode: (start nodeJS Server + build sass files)
```sh
npm run dev
```

#### Stylesheets

Stylesheets are written with the preprocessor sass in `scss` format.
They are localized in `./assets/stylesheets`.
You must split each slice in a file to simplify modularity and public sharing.
Don't bother to prefix css properties for each browser, it's already done with autoprefixer when you start the project in dev mode.

#### Javascript
Since there is no complex javascript required yet, you only have one file `./public/javascript/main.js` to interact directly with the DOM and make any js client code.

#### Slices
How to build a slice named `MyDemoSlice`:
- add it's definition in the folder `custom_types`.
- create a sass file in `./assets/stylesheets/slices/my-demo-slice.scss` and import it in `./assets/stylesheets/style.scss`.
- create a pug template in `./views/slices/my-demo-slice.pug` and you can import it from any pug template.

### Implement i18n

The localization is implemented out of the box.
You got 4 things to check if you wanna customize it:
- **i18n.json**: It's a configuration file that allow you to declare the list of language that you wanna support in your project in addition to the default language.
- **I18NUrl(partialURL?: String) => String**: It's a helper to build your URL. You just provide a url and the helper with prefix it with a regex to match the declared language from **i18n.json**. It's optional so you can provide anything and it will match every i18n URLs. It can be useful for middlewares.
- **I18NConfig(request: Request, options?: Object) => String**: It's a helper that help you build your queries configuration. It will take a request to get the language automatically but also an optional object with custom options that will be merged all together.
- **LinkResolver**: Don't forget to update the linkResolver to add the language in the url. There's already an example. you have a property **lang** in each documentLink.

### Manage Profiles
In this demo, you can manage different profiles of users out of the box.
It's handled with a basic cookies system. You can just switch profile directly in the footer and it will set a new profile.

*How it works?*
You must set your profiles in `profiles.json` according to the example in this file.
Each time you switch profile from the select in the footer, it create a cookie `prismic.profile` with the value of the profile you just selected.
You have now an easy access to the current profile directly from the cookies.
You can access it from the back with the following code:
```javascript
  res.locals.PrismicProfiles.current
```
You can also access the list of all profiles:
```javascript
  res.locals.PrismicProfiles.profiles
```
But also the default profile:
```javascript
  res.locals.PrismicProfiles.default
```

And finally you can access the same `PrismicProfiles` object from the client in `window.PrismicProfiles`. It contains exactly the same thing.

### License

This software is licensed under the Apache 2 license, quoted below.

Copyright 2013-2017 Prismic.io (http://prismic.io).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
