//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  props: {
    value: {
      required: true,
      type: Date,
      default: new Date()
    }
  },
  data: function data() {
    return {
      selectedDate: this.value,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datesThisMonth: [],
      today: new Date(),
      dayToday: new Date().getDay(),
      dateToday: new Date().getDate(),
      daysHeader: []
    };
  },
  computed: {
    selectedDay: function() {
      return this.selectedDate.getDate();
    },
    selectedYear: function() {
      return this.selectedDate.getFullYear();
    },
    selectedMonth: function() {
      return this.selectedDate.getMonth();
    },
    selectedMonthName: function() {
      return this.months[this.selectedMonth];
    },
    selectedMonthYear: function() {
      return (
        this.selectedDate.getMonth() + " " + this.selectedDate.getFullYear()
      );
    },
    selectedDateTitle: function() {
      return (
        this.selectedDay +
        " " +
        this.selectedMonthName +
        " " +
        this.selectedYear
      );
    },
    daysThisMonth: function() {
      return new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        0
      ).getDate();
    },
    daysLastMonth: function() {
      return new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        0
      ).getDate();
    },
    thisMonthStartDay: function() {
      return new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        "1"
      ).getDay();
    }
  },
  mounted: function mounted() {
    this.calculateMonth();
    this.calculateHeaders();
  },
  methods: {
    setDate: function setDate(d) {
      this.selectedDate = d;
    },
    changeMonth: function changeMonth(incrBy) {
      var d = new Date();
      d.setFullYear(this.selectedDate.getFullYear());
      d.setDate(this.selectedDate.getDate());
      d.setMonth(this.selectedDate.getMonth() + incrBy);
      this.selectedDate = d;
    },
    changeYear: function changeYear(incrBy) {
      var d = new Date();
      d.setFullYear(this.selectedDate.getFullYear() + incrBy);
      d.setDate(this.selectedDate.getDate());
      d.setMonth(this.selectedDate.getMonth());
      this.selectedDate = d;
    },
    changeDate: function changeDate(date, month) {
      var d = new Date();
      d.setFullYear(this.selectedDate.getFullYear());
      d.setMonth(this.selectedDate.getMonth() + month);
      d.setDate(date);
      this.selectedDate = d;
    },
    setToday: function() {
      this.selectedDate = new Date();
    },
    setYesterday: function() {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      this.selectedDate = d;
    },
    setTomorrow: function() {
      var d = new Date();
      d.setDate(d.getDate() + 1);
      this.selectedDate = d;
    },
    calculateHeaders: function() {
      this.daysHeader = [];
      var d = new Date();

      for (var i = this.dayToday; i > 0; i--) {
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        this.daysHeader.unshift({
          day: i - 1,
          date: d,
          dayName: this.days[i - 1]
        });
      }
      d = new Date();
      for (var i$1 = this.dayToday; i$1 < 7; i$1++) {
        this.daysHeader.push({
          day: i$1,
          date: d,
          dayName: this.days[i$1]
        });
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      }
    },

    calculateMonth: function() {
      this.datesThisMonth = [];
      var d = this.daysLastMonth;

      for (var i = 0; i < this.thisMonthStartDay; i++) {
        this.datesThisMonth.unshift({
          date: d,
          month: -1
        });
        d--;
      }
      for (var i$1 = 0; i$1 < this.daysThisMonth; i$1++) {
        this.datesThisMonth.push({
          date: i$1 + 1,
          month: 0
        });
      }
      d = 1;

      for (var i$2 = this.datesThisMonth.length; i$2 % 7 !== 0; i$2++) {
        this.datesThisMonth.push({
          date: d,
          month: +1
        });
        d++;
      }
    }
  },
  watch: {
    selectedDate: function() {
      this.$emit("input", this.selectedDate);
    },
    selectedMonthYear: function() {
      this.calculateMonth();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "andyh-datepicker-container" },
    [
      _c("div", { staticClass: "date-title" }, [
        _c("h4", { staticClass: "text-center", attrs: { id: "date" } }, [
          _vm._v(_vm._s(this.selectedDateTitle))
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center arrow-button",
          on: {
            click: function($event) {
              return _vm.changeYear(-1)
            }
          }
        },
        [_vm._v("⟵")]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "text-center date-title-small" }, [
        _vm._v(_vm._s(this.selectedYear))
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center arrow-button",
          on: {
            click: function($event) {
              return _vm.changeYear(1)
            }
          }
        },
        [_vm._v("⟶")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center arrow-button",
          on: {
            click: function($event) {
              return _vm.changeMonth(-1)
            }
          }
        },
        [_vm._v("⟵")]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "text-center date-title-small" }, [
        _vm._v(_vm._s(this.selectedMonthName))
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center arrow-button",
          on: {
            click: function($event) {
              return _vm.changeMonth(+1)
            }
          }
        },
        [_vm._v("⟶")]
      ),
      _vm._v(" "),
      _vm._l(_vm.daysHeader, function(day) {
        return _c(
          "div",
          {
            staticClass: "date ah-btn text-center day",
            attrs: { Key: day.day },
            on: {
              click: function($event) {
                return _vm.setDate(day.date)
              }
            }
          },
          [_vm._v(_vm._s(day.dayName))]
        )
      }),
      _vm._v(" "),
      _vm._l(_vm.datesThisMonth, function(date, index) {
        return _c(
          "div",
          {
            key: index,
            staticClass: "date ah-btn text-center",
            class: {
              selected: date.date == _vm.selectedDay,
              disabled: date.month !== 0
            },
            on: {
              click: function($event) {
                return _vm.changeDate(date.date, date.month)
              }
            }
          },
          [_vm._v(_vm._s(date.date))]
        )
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center arrow-button",
          on: {
            click: function($event) {
              return _vm.setYesterday()
            }
          }
        },
        [_vm._v("Yesterday")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center date-title-small",
          on: {
            click: function($event) {
              return _vm.setToday()
            }
          }
        },
        [_vm._v("Today")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "ah-btn text-center arrow-button",
          on: {
            click: function($event) {
              return _vm.setTomorrow()
            }
          }
        },
        [_vm._v("Tomorrow")]
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-17a343ba_0", { source: "\n@import url(\"https://fonts.googleapis.com/css?family=Roboto&display=swap\");\n.andyh-datepicker-container {\r\n  display: grid;\r\n  border: 1px solid #dee2e6;\r\n  grid-template-columns: auto auto auto auto auto auto auto;\r\n  text-align: center;\r\n  font-family: \"Roboto\", sans-serif;\r\n  background: white;\n}\n.date-title {\r\n  grid-column: 1/8;\r\n  padding: 0.75rem;\r\n  color: #212529;\n}\n.arrow-button {\r\n  grid-column: span 2;\r\n  border-top: 1px solid #dee2e6;\r\n  padding: 0.75rem;\r\n  font-weight: bold;\r\n  color: #212529;\n}\n.date-title-small {\r\n  grid-column: span 3;\r\n  border-top: 1px solid #dee2e6;\r\n  padding: 0.75rem;\r\n  font-weight: bold;\r\n  color: #212529;\n}\n.day {\r\n  font-weight: bold;\n}\n.ah-btn {\r\n  cursor: pointer;\n}\n.ah-btn:hover {\r\n  background: #f2f2f2;\n}\n.date {\r\n  border-top: 1px solid #dee2e6;\r\n  color: #212529;\r\n  padding: 0.75rem;\n}\n.selected {\r\n  background-color: #f27405;\n}\n.disabled {\r\n  color: #888888;\r\n  background-color: white;\n}\r\n", map: {"version":3,"sources":["C:\\git\\andyh-datepicker\\src\\andyh-datepicker.vue"],"names":[],"mappings":";AA+NA,0EAAA;AAEA;EACA,aAAA;EACA,yBAAA;EACA,yDAAA;EACA,kBAAA;EACA,iCAAA;EACA,iBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;EACA,cAAA;AACA;AAEA;EACA,mBAAA;EACA,6BAAA;EACA,gBAAA;EACA,iBAAA;EACA,cAAA;AACA;AAEA;EACA,mBAAA;EACA,6BAAA;EACA,gBAAA;EACA,iBAAA;EACA,cAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,eAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,6BAAA;EACA,cAAA;EACA,gBAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,cAAA;EACA,uBAAA;AACA","file":"andyh-datepicker.vue","sourcesContent":["<template>\r\n  <div class=\"andyh-datepicker-container\">\r\n    <div class=\"date-title\">\r\n      <h4 id=\"date\" class=\"text-center\">{{ this.selectedDateTitle }}</h4>\r\n    </div>\r\n\r\n    <div class=\"ah-btn text-center arrow-button\" v-on:click=\"changeYear(-1)\">⟵</div>\r\n    <div class=\"text-center date-title-small\">{{ this.selectedYear }}</div>\r\n    <div class=\"ah-btn text-center arrow-button\" v-on:click=\"changeYear(1)\">⟶</div>\r\n    <div class=\"ah-btn text-center arrow-button\" v-on:click=\"changeMonth(-1)\">⟵</div>\r\n    <div class=\"text-center date-title-small\">{{ this.selectedMonthName }}</div>\r\n    <div class=\"ah-btn text-center arrow-button\" v-on:click=\"changeMonth(+1)\">⟶</div>\r\n\r\n    <div\r\n      class=\"date ah-btn text-center day\"\r\n      v-for=\"day in daysHeader\"\r\n      v-bind:Key=\"day.day\"\r\n      v-on:click=\"setDate(day.date)\"\r\n    >{{ day.dayName }}</div>\r\n    <div\r\n      v-for=\"(date, index) in datesThisMonth\"\r\n      v-bind:key=\"index\"\r\n      v-on:click=\"changeDate(date.date, date.month)\"\r\n      class=\"date ah-btn text-center\"\r\n      v-bind:class=\"{\r\n        selected: date.date == selectedDay,\r\n        disabled: date.month !== 0\r\n      }\"\r\n    >{{ date.date }}</div>\r\n    <div class=\"ah-btn text-center arrow-button\" v-on:click=\"setYesterday()\">Yesterday</div>\r\n    <div class=\"ah-btn text-center date-title-small\" v-on:click=\"setToday()\">Today</div>\r\n    <div class=\"ah-btn text-center arrow-button\" v-on:click=\"setTomorrow()\">Tomorrow</div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  props: {\r\n    value: {\r\n      required: true,\r\n      type: Date,\r\n      default: new Date()\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      selectedDate: this.value,\r\n      months: [\r\n        \"January\",\r\n        \"February\",\r\n        \"March\",\r\n        \"April\",\r\n        \"May\",\r\n        \"June\",\r\n        \"July\",\r\n        \"August\",\r\n        \"September\",\r\n        \"October\",\r\n        \"November\",\r\n        \"December\"\r\n      ],\r\n      days: [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"],\r\n      datesThisMonth: [],\r\n      today: new Date(),\r\n      dayToday: new Date().getDay(),\r\n      dateToday: new Date().getDate(),\r\n      daysHeader: []\r\n    };\r\n  },\r\n  computed: {\r\n    selectedDay: function() {\r\n      return this.selectedDate.getDate();\r\n    },\r\n    selectedYear: function() {\r\n      return this.selectedDate.getFullYear();\r\n    },\r\n    selectedMonth: function() {\r\n      return this.selectedDate.getMonth();\r\n    },\r\n    selectedMonthName: function() {\r\n      return this.months[this.selectedMonth];\r\n    },\r\n    selectedMonthYear: function() {\r\n      return (\r\n        this.selectedDate.getMonth() + \" \" + this.selectedDate.getFullYear()\r\n      );\r\n    },\r\n    selectedDateTitle: function() {\r\n      return (\r\n        this.selectedDay +\r\n        \" \" +\r\n        this.selectedMonthName +\r\n        \" \" +\r\n        this.selectedYear\r\n      );\r\n    },\r\n    daysThisMonth: function() {\r\n      return new Date(\r\n        this.selectedDate.getFullYear(),\r\n        this.selectedDate.getMonth() + 1,\r\n        0\r\n      ).getDate();\r\n    },\r\n    daysLastMonth: function() {\r\n      return new Date(\r\n        this.selectedDate.getFullYear(),\r\n        this.selectedDate.getMonth(),\r\n        0\r\n      ).getDate();\r\n    },\r\n    thisMonthStartDay: function() {\r\n      return new Date(\r\n        this.selectedDate.getFullYear(),\r\n        this.selectedDate.getMonth(),\r\n        \"1\"\r\n      ).getDay();\r\n    }\r\n  },\r\n  mounted() {\r\n    this.calculateMonth();\r\n    this.calculateHeaders();\r\n  },\r\n  methods: {\r\n    setDate(d) {\r\n      this.selectedDate = d;\r\n    },\r\n    changeMonth(incrBy) {\r\n      var d = new Date();\r\n      d.setFullYear(this.selectedDate.getFullYear());\r\n      d.setDate(this.selectedDate.getDate());\r\n      d.setMonth(this.selectedDate.getMonth() + incrBy);\r\n      this.selectedDate = d;\r\n    },\r\n    changeYear(incrBy) {\r\n      var d = new Date();\r\n      d.setFullYear(this.selectedDate.getFullYear() + incrBy);\r\n      d.setDate(this.selectedDate.getDate());\r\n      d.setMonth(this.selectedDate.getMonth());\r\n      this.selectedDate = d;\r\n    },\r\n    changeDate(date, month) {\r\n      var d = new Date();\r\n      d.setFullYear(this.selectedDate.getFullYear());\r\n      d.setMonth(this.selectedDate.getMonth() + month);\r\n      d.setDate(date);\r\n      this.selectedDate = d;\r\n    },\r\n    setToday: function() {\r\n      this.selectedDate = new Date();\r\n    },\r\n    setYesterday: function() {\r\n      var d = new Date();\r\n      d.setDate(d.getDate() - 1);\r\n      this.selectedDate = d;\r\n    },\r\n    setTomorrow: function() {\r\n      var d = new Date();\r\n      d.setDate(d.getDate() + 1);\r\n      this.selectedDate = d;\r\n    },\r\n    calculateHeaders: function() {\r\n      this.daysHeader = [];\r\n      var d = new Date();\r\n\r\n      for (let i = this.dayToday; i > 0; i--) {\r\n        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);\r\n        this.daysHeader.unshift({\r\n          day: i - 1,\r\n          date: d,\r\n          dayName: this.days[i - 1]\r\n        });\r\n      }\r\n      d = new Date();\r\n      for (let i = this.dayToday; i < 7; i++) {\r\n        this.daysHeader.push({\r\n          day: i,\r\n          date: d,\r\n          dayName: this.days[i]\r\n        });\r\n        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);\r\n      }\r\n    },\r\n\r\n    calculateMonth: function() {\r\n      this.datesThisMonth = [];\r\n      var d = this.daysLastMonth;\r\n\r\n      for (let i = 0; i < this.thisMonthStartDay; i++) {\r\n        this.datesThisMonth.unshift({\r\n          date: d,\r\n          month: -1\r\n        });\r\n        d--;\r\n      }\r\n      for (let i = 0; i < this.daysThisMonth; i++) {\r\n        this.datesThisMonth.push({\r\n          date: i + 1,\r\n          month: 0\r\n        });\r\n      }\r\n      d = 1;\r\n\r\n      for (let i = this.datesThisMonth.length; i % 7 !== 0; i++) {\r\n        this.datesThisMonth.push({\r\n          date: d,\r\n          month: +1\r\n        });\r\n        d++;\r\n      }\r\n    }\r\n  },\r\n  watch: {\r\n    selectedDate: function() {\r\n      this.$emit(\"input\", this.selectedDate);\r\n    },\r\n    selectedMonthYear: function() {\r\n      this.calculateMonth();\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n@import url(\"https://fonts.googleapis.com/css?family=Roboto&display=swap\");\r\n\r\n.andyh-datepicker-container {\r\n  display: grid;\r\n  border: 1px solid #dee2e6;\r\n  grid-template-columns: auto auto auto auto auto auto auto;\r\n  text-align: center;\r\n  font-family: \"Roboto\", sans-serif;\r\n  background: white;\r\n}\r\n\r\n.date-title {\r\n  grid-column: 1/8;\r\n  padding: 0.75rem;\r\n  color: #212529;\r\n}\r\n\r\n.arrow-button {\r\n  grid-column: span 2;\r\n  border-top: 1px solid #dee2e6;\r\n  padding: 0.75rem;\r\n  font-weight: bold;\r\n  color: #212529;\r\n}\r\n\r\n.date-title-small {\r\n  grid-column: span 3;\r\n  border-top: 1px solid #dee2e6;\r\n  padding: 0.75rem;\r\n  font-weight: bold;\r\n  color: #212529;\r\n}\r\n\r\n.day {\r\n  font-weight: bold;\r\n}\r\n\r\n.ah-btn {\r\n  cursor: pointer;\r\n}\r\n\r\n.ah-btn:hover {\r\n  background: #f2f2f2;\r\n}\r\n\r\n.date {\r\n  border-top: 1px solid #dee2e6;\r\n  color: #212529;\r\n  padding: 0.75rem;\r\n}\r\n\r\n.selected {\r\n  background-color: #f27405;\r\n}\r\n\r\n.disabled {\r\n  color: #888888;\r\n  background-color: white;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component("andyh-datepicker", __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
    install: install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
