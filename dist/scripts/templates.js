angular.module('tink.interactivetable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/pagination.html',
    "<div class=table-sort-options> <div class=table-sort-info> <strong>{{tinkItemsPerPage*(tinkCurrentPage-1)+1 | tinkMin:1}} - {{tinkItemsPerPage*tinkCurrentPage | limitNum:tinkTotalItems | tinkMin:tinkItemsPerPage}}</strong> van {{tinkTotalItems}} <div class=select> <select data-ng-change=ctrl.perPageChange() data-ng-model=tinkItemsPerPage ng-options=\"o as o for o in ctrl.itemsPerPage()\">> </select> items per pagina </div> </div> <div class=table-sort-pagination> <ul class=pagination> <li class=prev data-ng-class=\"{disabled:tinkCurrentPage===1}\" data-ng-click=\"tinkCurrentPage===1 || ctrl.setPrev()\" ng-disabled=\"tinkCurrentPage===1\"><a href=\"\"><span>Vorige</span></a></li> <li data-ng-class=\"{active:tinkCurrentPage===1}\" data-ng-click=ctrl.setPage(1)><a href=\"\">1</a></li> <li data-ng-repeat=\"pag in ctrl.calculatePages() track by $index\" data-ng-class=\"{active:pag===tinkCurrentPage}\" data-ng-click=\"pag === -1 || ctrl.setPage(pag)\"><a href=\"\" data-ng-if=\"pag !== -1\">{{pag}}</a> <span data-ng-show=\"pag === -1\">...<span></span></span></li> <li class=next data-ng-click=\"tinkCurrentPage===ctrl.pages || ctrl.setNext()\" data-ng-class=\"{disabled:tinkCurrentPage===ctrl.pages}\" ng-disabled=\"tinkCurrentPage===ctrl.pages\"><a href=\"\"><span>Volgende</span></a></li> </ul> </div> </div>"
  );


  $templateCache.put('templates/reorder.html',
    "<div> <div class=bar> <div class=bar-section> <ul ng-if=!actionConf.menu class=\"main-actions bar-section-left\"> <li ng-class=\"{'bar-item-sm':!actionConf.tekst,'bar-item-md':actionConf.tekst}\" ng-repeat=\"action in tinkActions | filter: { master: true }| tinkActionFilter: tinkActions : 'master' | orderBy:'+order'\" ng-disabled=\"checked().length === 0\" tink-tooltip={{action.name}} tink-tooltip-align=top tink-tooltip-disabled=actionConf.tekst data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span ng-if=actionConf.tekst>{{action.name}}</span> </li> </ul> <ul ng-if=!actionConf.menu class=\"sub-actions bar-section-left\"> <hr ng-if=\"masterObject() > 0 && subObject() > 0\"> <li ng-class=\"{'bar-item-sm':!actionConf.tekst,'bar-item-md':actionConf.tekst}\" ng-repeat=\"action in tinkActions | filter: { master: false } | tinkActionFilter: tinkActions | orderBy:'+order'\" tink-tooltip={{action.name}} tink-tooltip-align=top tink-tooltip-disabled=actionConf.tekst ng-disabled=\"checked().length === 0\" data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span ng-if=actionConf.tekst>{{action.name}}</span> </li> <li ng-class=\"{'bar-item-sm':!actionConf.tekst,'bar-item-md':actionConf.tekst}\" ng-disabled=\"checked().length === 0\" ng-if=\"tinkActions.length > 5\" tink-popover tink-popover-group=option-table tink-tooltip-disabled=actionConf.tekst tink-popover-template=templates/tinkTableAction.html tink-tooltip=\"meer acties\" tink-tooltip-align=top> <span> <i class=\"fa fa-ellipsis-h fa-fw\"></i>\n" +
    "<span ng-if=actionConf.tekst>meer acties</span> </span> </li> </ul> <ul ng-if=actionConf.menu class=bar-section-left> <li> <button tink-popover tink-popover-group=option-table-1 tink-popover-template=templates/tinkTableAction.html>Acties <i class=\"fa fa-caret-down\"></i></button> </li> </ul> <ul class=bar-section-right> <li ng-if=\"scope.tinkAllowColumnReorder !== false\"> <button tink-popover tink-popover-group=option-table tink-popover-template=templates/tinkTableShift.html>Kolommen <i class=\"fa fa-caret-down\"></i></button> </li> </ul> </div> </div> <div ng-transclude></div> </div>"
  );


  $templateCache.put('templates/tinkTableAction.html',
    "<ul ng-if=!actionConf.menu> <li data-ng-repeat=\"action in tinkActions | tinkSlice:5 | orderBy:'+order'\" ng-disabled=\"checked().length === 0\" data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </li> </ul> <ul ng-if=actionConf.menu> <li data-ng-repeat=\"action in tinkActions | orderBy:'+order' | filter: { master: true }\" ng-disabled=\"checked().length === 0\" data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </li> <hr> <li data-ng-repeat=\"action in tinkActions | orderBy:'+order' | filter: { master: false }\" ng-disabled=\"checked().length === 0\" data-ng-click=actionCallBack(action)> <i class=\"fa {{action.icon}} fa-fw\"></i>\n" +
    "<span>{{action.name}}</span> </li> </ul>"
  );


  $templateCache.put('templates/tinkTableShift.html',
    "<div class=table-interactive-options tink-shift-sort>  <div class=table-interactive-sort> <button class=btn-borderless ng-disabled=\"selected.value<1\" ng-click=arrowUp()><i class=\"fa fa-arrow-up\"> </i></button>\n" +
    "<button class=btn-borderless ng-disabled=\"selected.value<0 || selected.value === tinkHeaders.length-1\" ng-click=arrowDown()><i class=\"fa fa-arrow-down\"></i></button> </div>  <ul ng-model=tinkHeaders class=table-interactive-cols> <li ng-repeat=\"header in tinkHeaders\"> <div class=\"checkbox is-selectable is-draggable\" ng-class=\"{selected:selected.value===$index}\"> <input type=checkbox ng-model=header.checked id={{header.alias}} name={{header.alias}} value={{header.alias}} checked> <label for={{header.alias}}><span class=draggable-elem ng-class=\"{selected:selected.value===$index}\" ng-click=select($event,$index)>{{header.alias}}</span></label> </div> </li> </ul> <div class=table-interactive-sort>  <button class=btn-xs ng-click=close()>Sluiten</button> </div> </div>"
  );

}]);
