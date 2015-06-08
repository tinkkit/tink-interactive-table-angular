# Tink interactive table Angular directive

v2.2.2

## What is this repository for?

The Tink Angular interactive table provides with a table on steroids.

Tink is an in-house developed easy-to-use front-end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel.

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:

  `bower install tink-interactive-table-angular --save`

2. Add the following files to your project:

  `<link rel="stylesheet" href="bower_components/tink-core/dist/tink.css" />` (or one of the Tink themes)

  `<script src="bower_components/tink-interactive-table-angular/dist/tink-interactive-table-angular.js"></script>`

3. Add `tink.interactivetable` to your app module's dependency.

  `angular.module('myApp', ['tink.interactivetable']);`


----------


## How to use

### tink-interactive-table

### Component

```html
<tink-interactive-table></tink-interactive-table>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-ng-model (required) | `array` | `undefined` | The table info that needs to be shown.
data-tink-headers (required) | `array` | `undefined` | The header information for each column.
data-tink-actions | `array` | `undefined` | When present checkboxes will appear to do some predefined actions with it.
data-allow-column-reorder | `boolean` | `true` | If false you can't reorder the columns.
data-tink-change | `function($property,$order,$type)` | `undefined` | will be called when the interactive table needs to be sorted!.

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
> To **enable sort** give the header object a **property** `sort` with the value `true`,
> If you want to **hide a column** give the header a **property** `checked` with the value `false`.

```javascript
scope.headers = [
      {
        field: 'firstname',
        alias: 'Voornaam',
        checked: true, //to show this header or not
        sort: true // To enable sorting on this header
      },
      {
        field: 'lastname',
        alias: 'Achternaam',
        checked: false,
        sort: true
      },
      {
        field: 'username',
        alias: 'Gebruikersnaam',
        checked: true
      }
    ];
```

> To **add action** create an array with objects with a `name` property and a `callback` function. This callback function will be called when this action is used. The function will give you an array of items that is selected. The function will also give you a function as a parameter to uncheck all the checkboxes.

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



### tink-pagination

### Component

```html
<tink-pagination></tink-pagination>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-tink-pagination-id (required) | `string` | `''` | An id that specifies to which table it belongs.
tink-current-page (required) | `number` | `undefined` | The number of the current page.
tink-total-items (required) | `number` | `undefined` | Total number of items you want to show.
tink-items-per-page (required) | `number` | `undefined` | How many items you want to show!
tink-items-per-page-values (required) | `array` | `undefined` | Array of numbers that will be shown as per page value.
tink-change | `function` | `undefined` | To receive information if the pagination or perPage value change!

###Example
> To enable pagination on the interactive table add the tink-pagination-key attribute.

```html
<tink-interactive-table tink-pagination-key="pag1" ></tink-interactive-table>
```

```javascript
 scope.changed = function(chaged,next){
  /* changed will give you an  object if the page or peerage is changed.
  * {type:'page',value:2}
  * {type:'perPage',value:20}
  * If you do not change the data ! use next();
  */
 }
```

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
