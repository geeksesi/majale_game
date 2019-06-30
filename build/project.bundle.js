/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _playGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playGame.js */ \"./src/playGame.js\");\n// import 'phaser';\n\nconst config = {\n\ttype: Phaser.CANVAS,\n\tcanvas: document.getElementById('myCanvas'),\n    width: 600,\n    height: 1080,\n    backgroundColor: 0xefefef,\n    // scale: {\n    //     mode: Phaser.Scale.NONE,\n    //     width: 600,\n    //     height: 1080\n    // },\n    // scene: [main_menu,play_game]\n    scene: [_playGame_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n};\n\n\n// game.stage.scale.startFullScreen();\n// game.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;\n// game.scale.pageAlignHorizontally = true;\n// game.scale.pageAlignVertically   = true;\n\n// import main_menu from './main_menu.js';\n\n\n\nfunction resize() {\n    let canvas = document.querySelector(\"canvas\");\n    let width = window.innerWidth;\n    let height = window.innerHeight;\n    let wratio = width / height;\n    let ratio = config.width / config.height;\n    if (wratio < ratio) {\n        canvas.style.width = width + \"px\";\n        canvas.style.height = (width / ratio) + \"px\";\n        config.width = width;\n\t\tconfig.height = (width / ratio);\n\t\tlet game = new Phaser.Game(config);\n\n        // game.scale.resize(width, (width / ratio));\n    } else {\n        canvas.style.width = (height * ratio) + \"px\";\n        canvas.style.height = height + \"px\";\n        config.width = (height * ratio);\n\t\tconfig.height = height;\n\t\tlet game = new Phaser.Game(config);\n\n        // game.scale.resize((height * ratio), height);\n    }\n    // game.scale.resize(window.innerWidth, window.innerHeight);\n}\n\n\nwindow.onload = () => {\n    resize();\n    window.addEventListener(\"resize\", resize, false);\n\n};\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/playGame.js":
/*!*************************!*\
  !*** ./src/playGame.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass playGame extends Phaser.Scene {\n\n    constructor() {\n        super({ key: 'playGame' });\n    }\n\n    preload() {\n\n    }\n\n    create() {\n        // this.words =this.add.group()\n        // this.add.grid(0, 0, 50 * 6, 50 * 5, 50, 50, 0x999999, 1, 0x666666).setOrigin(0);\n\n        this.graphics = this.add.graphics({ fillStyle: { color: 0x9e9e9e } });\n\n        this.till_bg = [];\n        let words = [\"س\",\"ل\",\"ا\",\"م\",\"خ\",\"و\",\"ب\",\"ی\",\"چ\",\"خ\",\"ب\",\"ر\",\"ا\",\"خ\",\"و\",\"ش\",\"م\",\"ی\",\"گ\",\"ذ\",\"ر\",\"ه\",\"ب\",\"ب\",\"م\",\"ج\"];\n        this.till_words = []\n        const max_x = 5;\n\t\tconst max_y = 5;\n\t\tconst till = {\n\t\t\toffset_x : this.sys.game.config.width / 8, \n\t\t\twidth : this.sys.game.config.width - (this.sys.game.config.width / 4),  \n\t\t\toffset_y : this.sys.game.config.height - (this.sys.game.config.width - (this.sys.game.config.width / 4) + this.sys.game.config.height / 20), \n\t\t}\n        for (let x = 0; x < max_x; x++) {\n\t\t\tfor (let y = 0; y < max_y; y++) {\n                this.till_bg.push(new Phaser.Geom.Rectangle(till.offset_x + (x * (till.width / max_x)), till.offset_y + (y * (till.width / max_y)), (till.width / max_x), (till.width / max_x)));\n            }\n        }\n\t\tconsole.log(this.till_bg[0]);\n        // this.graphics.lineStyle(1, 0x666666);\n        this.graphics.fillStyle(0x9e9e9e);\n        this.graphics.lineStyle(3, 0xffffff);\n        for (let i = 0; i < this.till_bg.length; i++) {\n            this.add.text(this.till_bg[i].x + ((this.till_bg[i].width/2.5)), this.till_bg[i].y + (this.till_bg[i].width/5), words[i]).setFontFamily('Noto Sans').setFontSize(this.till_bg[i].width/2.5).setColor('#222').setAlign(\"center\");\n            this.graphics.strokeRectShape(this.till_bg[i]);\n            this.graphics.fillRectShape(this.till_bg[i]);\n        }\n        this.p_isdown = false;\n        this.input.on('pointerdown', () => {\n            this.p_isdown = true;\n        }, this);\n        this.input.on('pointerup', this.pointer_up, this);\n        this.input.on('pointermove', this.pointer_move, this);\n        console.log(\"hello\");\n    }\n\n    pointer_up() {\n        this.p_isdown = false;\n        this.graphics.fillStyle(0x9e9e9e);\n        this.graphics.lineStyle(3, 0xffffff);\n        for (let i = 0; i < this.till_bg.length; i++) {\n\t\t\tthis.graphics.strokeRectShape(this.till_bg[i]);\n            this.graphics.fillRectShape(this.till_bg[i]);\n        }\n    }\n\t\n    pointer_move(pointer) {\n\t\t// this.graphics.fillRectShape(2, 0xffffff);\n\t\tthis.graphics.fillStyle(0x2e2e2e);\n\t\tthis.graphics.lineStyle(3, 0xffffff);\n        if (this.p_isdown) {\n\t\t\tfor (let i = 0; i < this.till_bg.length; i++) {\n\t\t\t\tif(this.till_bg[i].contains(pointer.x, pointer.y))\n\t\t\t\t{\n\t\t\t\t\tthis.graphics.fillRectShape(this.till_bg[i]);\n\t\t\t\t\tthis.graphics.strokeRectShape(this.till_bg[i]);\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t\t// console.log(pointer);\n\t\t\t// console.log(this.till_bg[0]);\n        }\n\t\t\n\t}\n\t\n    // update() {\n\n    // }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (playGame);\n\n//# sourceURL=webpack:///./src/playGame.js?");

/***/ })

/******/ });