angular.module('tink.interactivetable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/pagination.html',
    "<div class=table-sort-options> <div class=table-sort-info> <strong>{{tinkItemsPerPage*(tinkCurrentPage-1)+1}} - {{tinkItemsPerPage*tinkCurrentPage | limitNum:ctrl.tinkTotalItems}}</strong> van {{tinkTotalItems}} <div class=select> <select data-ng-change=\"\" data-ng-model=tinkItemsPerPage> <option data-ng-repeat=\"items in ctrl.itemsPerPage()\" data-ng-bind=items>{{items}}</option> </select> items per pagina </div> </div> <div class=table-sort-pagination> <ul class=pagination> <li class=prev data-ng-class=\"{disabled:tinkCurrentPage===1}\" data-ng-click=\"tinkCurrentPage===1 || ctrl.setPrev()\" ng-disabled=\"tinkCurrentPage===1\"><a href=\"\"><span>Vorige</span></a></li> <li data-ng-class=\"{active:tinkCurrentPage===1}\" data-ng-click=ctrl.setPage(1)><a href=\"\">1</a></li> <li data-ng-repeat=\"pag in ctrl.calculatePages() track by $index\" data-ng-class=\"{active:pag===tinkCurrentPage}\" data-ng-click=\"pag === -1 || ctrl.setPage(pag)\"><a href=\"\" data-ng-if=\"pag !== -1\">{{pag}}</a> <span data-ng-show=\"pag === -1\">...<span></span></span></li> <li class=next data-ng-click=\"tinkCurrentPage===ctrl.pages || ctrl.setNext()\" data-ng-class=\"{disabled:tinkCurrentPage===ctrl.pages}\" ng-disabled=\"tinkCurrentPage===ctrl.pages\"><a href=\"\"><span>Volgende</span></a></li> </ul> </div> </div>"
  );


  $templateCache.put('templates/reorder.html',
    " <div class=bar> <div class=bar-section>  <ul class=bar-section-right> <li> <button data-ng-if=\"viewActions && selectedCheck\" tink-popover tink-popover-group=option-table tink-popover-template=templates/tinkTableAction.html>Acties <i class=\"fa fa-caret-down\"></i></button> </li> <li> <button data-ng-if=\"allowColumnReorder === true\" tink-popover tink-popover-group=option-table tink-popover-template=templates/tinkTableShift.html>Kolommen <i class=\"fa fa-caret-down\"></i></button> </li> </ul> </div> </div>  <table tink-pagination-key=directivePag> </table> <tink-pagination tink-pagination-id=directivePag tink-current-page=nums tink-total-items=200 tink-items-per-page=10 tink-items-per-page-values=perpageValue></tink-pagination>"
  );


  $templateCache.put('templates/tinkTableAction.html',
    "<ul class=\"popover-list-buttons ng-scope\"> <li data-ng-repeat=\"action in viewActions\"><a href=\"\" data-ng-click=action.callback()>{{action.name}}</a></li> </ul>"
  );


  $templateCache.put('templates/tinkTableShift.html',
    "<div class=table-interactive-options tink-shift-sort>  <div class=table-interactive-sort> <button class=btn-borderless ng-disabled=\"selected<1\" ng-click=omhoog()><i class=\"fa fa-arrow-up\"> </i></button>\n" +
    "<button class=btn-borderless ng-disabled=\"selected<0 || selected === selectedMax\" ng-click=omlaag()><i class=\"fa fa-arrow-down\"></i></button> </div>  <ul ng-model=viewer class=table-interactive-cols> <li ng-repeat=\"header in viewer | filter:{ visible: true }\"> <div class=\"checkbox is-selectable is-draggable\" ng-class=\"{selected:selected===$index}\"> <input type=checkbox ng-model=header.checked ng-change=headerChange() id={{header.alias}} name={{header.alias}} value={{header.alias}} checked> <label for={{header.alias}}><span class=draggable-elem ng-class=\"{selected:selected===$index}\" ng-click=select($event,$index)>{{header.alias}}</span></label> </div> </li> </ul> <div class=table-interactive-sort>  <button class=btn-xs ng-click=close()>Sluiten</button> </div> </div>"
  );

}]);
