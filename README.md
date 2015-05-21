# Tink interactive table Angular directive

v2.1.1

## What is this repository for?

The Tink Angular interactive table provides with a table on steroids.

Tink is an in-house developed easy-to-use front end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel.

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:
   `bower install tink-interactive-table-angular --save`

2. Include `dist/tink-interactive-table-angular.js` and its necessary dependencies in your project.


----------


##tink-interactive-table

###Component
```html
<tink-interactive-table></tink-interactive-table>
```

###Atributes

<table class="table-dev">
  <thead>
    <tr>
      <th>Attr</th>
      <th>Type</th>
      <th>Default</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data-ng-model (required)</td>
      <td>Array</td>
      <td>undefined</td>
      <td>The table info that needs to be shown.</td>
    </tr>
    <tr>
      <td>data-tink-headers (required)</td>
      <td>Array</td>
      <td>undefined</td>
      <td>The header information for each column.</td>
    </tr>
    <tr>
      <td>data-tink-actions</td>
      <td>Array</td>
      <td>undefined</td>
      <td>When present checkboxes will appear to do some predefined actions with it.</td>
    </tr>
    <tr>
      <td>data-allow-column-reorder</td>
      <td>boolean</td>
      <td>true</td>
      <td>If false you can't reorder the columns.</td>
    </tr>
  </tbody>
</table>


###Example
```html
<tink-interactive-table ng-model="data" data-tink-headers="headers" tink-actions="actions">
</tink-interactive-table>
```

```javascript
    scope.data = [
      {
        firstname: 'Jasper',
        lastname: 'Van Proeyen',
        username: '@trianglejuice'
      },
      {
        firstname: 'Tom',
        lastname: 'Wuyts',
        username: '@pxlpanic'
      },
      {
        firstname: 'Kevin',
        lastname: 'De Mulder',
        username: '@clopin'
      },
      {
        firstname: 'Vincent',
        lastname: 'Bouillart',
        username: '@BouillartV'
      }
    ];
```
> To **enable sort** give the header object a **property 'sort'** with value true,
> If you want to **hide a column** give the header a **property 'checked'** with value false,
```javascript
scope.headers = [
      {
        field: 'firstname',
        alias: 'Voornaam',
        checked: true, //to show this header or not
        sort:true // To enable sorting on this header
      },
      {
        field: 'lastname',
        alias: 'Achternaam',
        checked: false,
        sort:true
      },
      {
        field: 'username',
        alias: 'Gebruikersnaam',
        checked: true
      }
    ];
```
> To **add action** create an array with objects with a *name* property and a *callback function*. This callback function will be called when this action is used. The function will give you an array of items that is selected. The function will also give you an function as parameter to uncheck all the checkboxes.
```javascript
   scope.actions = [
      {
        name: 'remove',
        callback: function(items,uncheck) {
          angular.forEach(items, function(val{ 
            scope.data.splice(scope.data.indexOf(val),1);
          });
          //this wil uncheck all the boxes !
          uncheck()
        }
      }
    ];
```


----------


##tink-pagination
###Component
```html

<tink-pagination></tink-pagination>
```

###Atributes

<table class="table-dev">
  <thead>
    <tr>
      <th>Attr</th>
      <th>Type</th>
      <th>Default</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data-tink-pagination-id (required)</td>
      <td>String</td>
      <td>""</td>
      <td>An id that specifies to which table it belongs.</td>
    </tr>
    <tr>
      <td>tink-current-page (required)</td>
      <td>Number</td>
      <td>undefined</td>
      <td>The number of the current page.</td>
    </tr>
    <tr>
      <td>tink-total-items (required)</td>
      <td>Number</td>
      <td>undefined</td>
      <td>Total number of items you want to show</td>
    </tr>
    <tr>
      <td>tink-items-per-page (required)</td>
      <td>Number</td>
      <td>undefined</td>
      <td>How many items you want to show !</td>
    </tr>
    <tr>
      <td>tink-items-per-page-values (required)</td>
      <td>Array</td>
      <td>undefined</td>
      <td>Array of numbers that will be shown as per page value.</td>
    </tr>
    <tr>
      <td>tink-change</td>
      <td>Function</td>
      <td>undefined</td>
      <td>To receive information if the pagination or perPage value change!</td>
    </tr>
  </tbody>
</table>

###Example
> To enable pagination on the interactive table add the **`tink-pagination-key`** attribute.
```html
<tink-interactive-table tink-pagination-key="pag1" ></tink-interactive-table>

<tink-pagination tink-pagination-id="pag1" tink-current-page="nums" tink-change="changed" tink-total-items="200" tink-items-per-page="10" tink-items-per-page-values="perpageValue">
</tink-pagination>
```

```javascript
 scope.changed = function(chaged,next){
    /* chaged will give you an  object if the page or peerage is changed.
  * {type:'page',value:2}
  * {type:'perPage',value:20}
  * If you do not change the data ! use next();
  */
 }
```


----------
## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)

## License

The MIT License (MIT)

Copyright (c) 2014 Stad Antwerpen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

