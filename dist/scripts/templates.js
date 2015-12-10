angular.module('tink.interactivetable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/actions.html',
    "<div class=popover-menu-list>  <ul ng-if=!actionConf.menu> <li data-ng-repeat=\"action in MoreActions()\" data-ng-disabled=elemDisabled(action) data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </li> </ul>  <ul ng-if=actionConf.menu> <li data-ng-repeat=\"action in tinkActions | filter: { master: true } | tinkActionFilter: tinkActions : 'master' | orderBy:'+order'\" data-ng-disabled=elemDisabled(action) data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </li> <hr ng-if=\"masterObject().length > 0 && subObject().length > 0\"> <li data-ng-repeat=\"action in tinkActions | filter: { master: false } | tinkActionFilter: tinkActions | orderBy:'+order'\" data-ng-disabled=elemDisabled(action) data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </li> </ul> </div>"
  );


  $templateCache.put('templates/columns.html',
    "<div class=table-interactive-options tink-shift-sort>  <div class=table-interactive-sort> <button class=btn-borderless data-ng-disabled=\"selected.value<1\" data-ng-click=arrowUp()><i class=\"fa fa-arrow-up\"> </i></button>\n" +
    "<button class=btn-borderless data-ng-disabled=\"selected.value<0 || selected.value === tinkHeaders.length-1\" data-ng-click=arrowDown()><i class=\"fa fa-arrow-down\"></i></button> </div>  <ul data-ng-model=tinkHeaders class=table-interactive-cols>  <li data-ng-repeat=\"header in tinkHeaders\"> <div class=\"checkbox is-selectable is-draggable\" data-ng-class=\"{selected:selected.value===$index}\"> <input data-ng-disabled=\"header.disabled === true\" type=checkbox data-ng-model=header.checked id=t-{{$index}}{{header.alias}} name=t-{{$index}}{{header.alias}} value={{header.alias}} checked> <label for=t-{{$index}}{{header.alias}}><span class=draggable-elem data-ng-class=\"{selected:selected.value===$index}\" data-ng-click=select($event,$index)> <span data-ng-if=\"header.alias && !header.sortalias\">{{header.alias}}</span>\n" +
    "<span data-ng-if=\"header.alias && header.sortalias\"><em>{{header.sortalias}}</em></span>\n" +
    "<span data-ng-if=\"!header.alias && !header.sortalias\">—</span>\n" +
    "<span data-ng-if=\"!header.alias && header.sortalias\"><em>{{header.sortalias}}</em></span> </span></label> </div> </li> </ul> <div class=table-interactive-sort>  <button class=btn-xs data-ng-click=close()>Sluiten</button> </div> </div>"
  );


  $templateCache.put('templates/interactive-table.html',
    "<div> <div class=\"bar table-interactive-bar\"> <ul data-ng-if=!actionConf.menu class=\"bar-left table-interactive-actions\"> <li data-ng-if=\"(masterObject().length + subObject().length) > 0\" data-ng-repeat=\"action in tinkActions | orderBy:'+order' | filter: { master: true } | tinkActionFilter: tinkActions : 'master'\"> <button class=btn-sm data-ng-disabled=elemDisabled(action) data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </button> </li> <li class=hr data-ng-if=\"hasActions() && masterObject().length > 0 && subObject().length > 0\"></li> <li data-ng-repeat=\"action in tinkActions | orderBy:'+order' | filter: { master: false } | tinkActionFilter: tinkActions \"> <button class=btn-sm data-ng-disabled=elemDisabled(action) data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </button> </li> <li data-ng-if=\"MoreActions().length > 0\" tink-popover tink-popover-group=option-table tink-popover-template=templates/actions.html> <span> <button class=btn-sm data-ng-disabled=elemDisabled(action)> <i class=\"fa fa-ellipsis-h fa-fw\"></i>\n" +
    "<span>Meer acties</span> </button> </span> </li> </ul> <ul data-ng-if=actionConf.menu class=\"bar-left table-interactive-popover-actions\"> <li ng-if=\"(masterObject().length + subObject().length) > 0\"> <button class=btn-sm tink-popover tink-popover-group=option-table-1 tink-popover-template=templates/actions.html>Acties <i class=\"fa fa-caret-down\"></i></button> </li> </ul> <ul class=bar-right> <li data-ng-repeat=\"action in tinkActions | tinkFilterFalse: {alwaysEnabled:true} : 'notSmall'  | orderBy:'+order'\"> <button class=btn-sm data-ng-click=actionCallBack(action) tink-tooltip={{action.name}} tink-tooltip-align=top> <i class=\"fa {{action.icon}} fa-fw\"></i>  </button> </li> <li data-ng-repeat=\"action in tinkActions | tinkFilterFalse: { alwaysEnabled: true,notSmall:true}  | orderBy:'+order'\"> <button class=btn-sm data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </button> </li> <li data-ng-if=\"tinkAllowColumnReorder !== false\"> <button class=btn-sm tink-popover tink-popover-group=option-table tink-popover-template=templates/columns.html>Kolommen <i class=\"fa fa-caret-down\"></i></button> </li> </ul> </div> <div data-ng-transclude></div> </div>"
  );

}]);
