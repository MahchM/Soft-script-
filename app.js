"use strict";

(function () {
  function init() {
    if (window.localStorage.getItem("bags") == null)
      window.localStorage.setItem("bags", JSON.stringify([]));
    const search = instantsearch({
      indexName: "demo_ecommerce",
      searchClient: algoliasearch(
        "B1G2GM9NG0",
        "aadef574be1f9252bb48d4ea09b5cfe5"
      ),
    });

    search.addWidgets([
      instantsearch.widgets.refinementList({
        container: "#brand-list",
        attribute: "brand",
      }),
      instantsearch.widgets.searchBox({
        container: "#searchbox",
      }),
      instantsearch.widgets.clearRefinements({
        container: "#clear-refinements",
      }), 
      instantsearch.widgets.hits({
        container: "#hits",
        templates: {
          item: `
              <div>
                <img src="{{image}}" align="left" alt="{{name}}" />
                <div class="hit-name">
                  {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
                </div>
                <div class="hit-description">
                  {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
                </div>
                <div class="hit-price">\${{price}}</div>
                <button type="button" onclick="addToBag('{{name}}',{{price}});updateBag();" id="{{name}}">Add to bag</button>
              </div>
            `,
        },
      }),
      instantsearch.widgets.pagination({
        container: "#pagination",
      }),
    ]);

    search.start();
  }
  init();
})();
