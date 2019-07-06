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
/******/ 	__webpack_require__.p = "/public_html/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/game.js":
/*!****************************!*\
  !*** ./client/src/game.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _playGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playGame.js */ \"./client/src/playGame.js\");\n\n\n\nconst config = {\n\ttype: Phaser.CANVAS,\n\tcanvas: document.getElementById('myCanvas'),\n    width: 600,\n    height: 1080,\n    backgroundColor: 0xefefef,\n    // scale: {\n    //     mode: Phaser.Scale.NONE,\n    //     width: 600,\n    //     height: 1080\n    // },\n    // scene: [main_menu,play_game]\n    scene: [_playGame_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\n};\n\n\n// game.stage.scale.startFullScreen();\n// game.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;\n// game.scale.pageAlignHorizontally = true;\n// game.scale.pageAlignVertically   = true;\n\n// import main_menu from './main_menu.js';\n\n\n\nfunction resize() {\n    let canvas = document.querySelector(\"canvas\");\n    let width = window.innerWidth;\n    let height = window.innerHeight;\n    let wratio = width / height;\n    let ratio = config.width / config.height;\n    if (wratio < ratio) {\n        canvas.style.width = width + \"px\";\n        canvas.style.height = (width / ratio) + \"px\";\n        config.width = width;\n\t\tconfig.height = (width / ratio);\n\t\tlet game = new Phaser.Game(config);\n\n        // game.scale.resize(width, (width / ratio));\n    } else {\n        canvas.style.width = (height * ratio) + \"px\";\n        canvas.style.height = height + \"px\";\n        config.width = (height * ratio);\n\t\tconfig.height = height;\n\t\tlet game = new Phaser.Game(config);\n\n        // game.scale.resize((height * ratio), height);\n    }\n    // game.scale.resize(window.innerWidth, window.innerHeight);\n}\n\n\nwindow.onload = () => {\n    resize();\n    window.addEventListener(\"resize\", resize, false);\n\n};\n\n//# sourceURL=webpack:///./client/src/game.js?");

/***/ }),

/***/ "./client/src/playGame.js":
/*!********************************!*\
  !*** ./client/src/playGame.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass playGame extends Phaser.Scene {\n\n    constructor() {\n        super({ key: 'playGame' });\n    }\n\n    preload() {\n\n    }\n\n    create() {\n        // this.words =this.add.group()\n        // this.add.grid(0, 0, 50 * 6, 50 * 5, 50, 50, 0x999999, 1, 0x666666).setOrigin(0);\n\n        this.graphics = this.add.graphics({ fillStyle: { color: 0x9e9e9e } });\n\n        this.till_bg = [];\n        this.words = [\"س\", \"ل\", \"ا\", \"م\", \"خ\", \"و\", \"ب\", \"ی\", \"چ\", \"خ\", \"ب\", \"ر\", \"ا\", \"خ\", \"و\", \"ش\", \"م\", \"ی\", \"گ\", \"ذ\", \"ر\", \"ه\", \"ب\", \"ب\", \"م\", \"ج\"];\n        this.till_words = []\n        const max_x = 5;\n        const max_y = 5;\n        this.max_x = 5;\n        this.max_y = 5;\n        const till = {\n            offset_x: this.sys.game.config.width / 15,\n            width: this.sys.game.config.width - (this.sys.game.config.width / 6),\n            offset_y: this.sys.game.config.height - (this.sys.game.config.width - (this.sys.game.config.width / 6) + this.sys.game.config.height / 20),\n        }\n        for (let x = 0; x < max_x; x++) {\n            for (let y = 0; y < max_y; y++) {\n                this.till_bg.push(new Phaser.Geom.Rectangle(\n                    till.offset_x + (x * (till.width / max_x)),\n                    till.offset_y + (y * (till.width / max_y)),\n                    (till.width / max_x),\n                    (till.width / max_x)));\n            }\n        }\n        console.log(this.till_bg[0]);\n        // this.graphics.lineStyle(1, 0x666666);\n        this.graphics.fillStyle(0x9e9e9e);\n        this.graphics.lineStyle(3, 0xffffff);\n        for (let i = 0; i < this.till_bg.length; i++) {\n            this.add.text(\n                    this.till_bg[i].x + ((this.till_bg[i].width / 2.5)),\n                    this.till_bg[i].y + (this.till_bg[i].width / 5),\n                    this.words[i])\n                .setFontFamily('Tahoma')\n                .setFontSize(this.till_bg[i].width / 2.5)\n                .setColor('#222')\n                .setAlign(\"center\");\n            // .setStyle({ rtl: true });\n\n            this.graphics.strokeRectShape(this.till_bg[i]);\n            this.graphics.fillRectShape(this.till_bg[i]);\n        }\n\n        // Top UI\n        this.answer_arr = [];\n        this.answer_key_arr = [];\n\n        this.answer_area = this.add.rectangle(\n            till.offset_x,\n            till.offset_y - 150,\n            (this.sys.game.config.width - (till.offset_x * 2)) / 3 * 1.8,\n            this.sys.game.config.height / 13);\n        this.question_area = this.add.rectangle(\n            till.offset_x + ((this.sys.game.config.width - (till.offset_x * 2)) / 3 * 1.8),\n            till.offset_y - 150,\n            (this.sys.game.config.width - (till.offset_x * 2)) / 3 * 1.2,\n            this.sys.game.config.height / 13);\n\n        this.graphics.strokeRectShape(this.answer_area);\n        this.graphics.fillRectShape(this.answer_area);\n        this.graphics.strokeRectShape(this.question_area);\n        this.graphics.fillRectShape(this.question_area);\n\n\n        this.question_text = this.add.text(\n                this.question_area.x + this.question_area.width - 15,\n                this.question_area.y + (this.question_area.width / 20),\n                \"بنت\", { rtl: true })\n            .setFontFamily('Tahoma')\n            .setColor('#222')\n            .setAlign(\"right\")\n            .setFontSize(this.question_area.width / (\"بنت\".length + 2))\n            .setSize(this.question_area.width, this.question_area.height)\n            // .setPadding(5, 5, 5, 5);\n\n        this.answer_text = this.add.text(\n                this.answer_area.x + this.answer_area.width - 5,\n                this.answer_area.y + (this.answer_area.height / 10),\n                \"\", { rtl: true })\n            .setFontFamily('Tahoma')\n            .setFontSize(this.answer_area.width / \"\".length)\n            .setColor('#222')\n            .setAlign(\"right\")\n            .setSize(this.answer_area.width, this.answer_area.height)\n            // .setPadding(5, 5, 5, 5);\n\n\n        // Events\n        this.p_isdown = false;\n        // this.input.on('pointerdown', () => {\n        //     this.p_isdown = true;\n        // }, this);\n        this.input.on('pointerup', this.pointer_up, this);\n        this.input.on('pointermove', this.pointer_move, this);\n        console.log(\"hello\");\n    }\n\n    pointer_up() {\n        this.graphics.fillStyle(0x9e9e9e);\n        this.graphics.lineStyle(3, 0xffffff);\n        for (let i = 0; i < this.till_bg.length; i++) {\n            this.graphics.strokeRectShape(this.till_bg[i]);\n            this.graphics.fillRectShape(this.till_bg[i]);\n        }\n        this.answer_arr = [];\n        this.answer_key_arr = [];\n        this.answer_text.setText(\"\")\n    }\n\n    check_pointer_way(i) {\n        if (this.answer_key_arr[this.answer_key_arr.length - 1] === i) {\n            return true;\n        }\n        this.graphics.fillStyle(0x9e9e9e);\n        let index_in_answer = this.answer_key_arr.indexOf(i);\n        for (let b = index_in_answer + 1; b < this.answer_key_arr.length; b++) {\n            console.log(this.answer_key_arr[b]);\n            this.graphics.strokeRectShape(this.till_bg[this.answer_key_arr[b]]);\n            this.graphics.fillRectShape(this.till_bg[this.answer_key_arr[b]]);\n        }\n        this.answer_arr.splice(index_in_answer + 1);\n        this.answer_key_arr.splice(index_in_answer + 1);\n        this.answer_text.setText(this.answer_arr.join(\"\"));\n        const char_size = (this.answer_arr.join(\"\").length > 8) ? this.answer_arr.join(\"\").length - 3 : 5;\n        this.answer_text.setFontSize(this.answer_area.width / (char_size + 1));\n    }\n\n    pointer_move(pointer) {\n        if (pointer.isDown) {\n            // console.log(pointer.position)\n            // console.log(pointer.prevPosition)\n            // if (Math.abs(pointer.prevPosition.x - pointer.position.x) > 20 || Math.abs(pointer.prevPosition.y - pointer.position.y) > 20) {\n            //     console.log(\"must break\");\n            //     return false;\n            // }\n            this.graphics.fillStyle(0x2e2e2e);\n            this.graphics.lineStyle(2, 0xffffff);\n            for (let i = 0; i < this.till_bg.length; i++) {\n                if (this.till_bg[i].contains(pointer.x, pointer.y)) {\n                    if (this.answer_key_arr.includes(i)) {\n                        this.check_pointer_way(i)\n                        break;\n                    }\n                    if (this.answer_key_arr.length !== 0) {\n                        if (\n                            (this.answer_key_arr[this.answer_key_arr.length - 1] + 1) !== i &&\n                            (this.answer_key_arr[this.answer_key_arr.length - 1] - 1) !== i &&\n                            (this.answer_key_arr[this.answer_key_arr.length - 1] + this.max_y) !== i &&\n                            (this.answer_key_arr[this.answer_key_arr.length - 1] - this.max_y) !== i\n                        ) {\n                            break;\n                        }\n                    }\n                    this.graphics.fillRectShape(this.till_bg[i]);\n                    this.graphics.strokeRectShape(this.till_bg[i]);\n                    this.answer_arr.push(this.words[i]);\n                    this.answer_key_arr.push(i);\n                    this.answer_text.setText(this.answer_arr.join(\"\"));\n                    const char_size = (this.answer_arr.join(\"\").length > 8) ? this.answer_arr.join(\"\").length - 3 : 5;\n                    this.answer_text.setFontSize(this.answer_area.width / (char_size + 1));\n                    break;\n                }\n            }\n\n        }\n\n    }\n\n    // update() {\n\n    // }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (playGame);\n\n//# sourceURL=webpack:///./client/src/playGame.js?");

/***/ })

/******/ });