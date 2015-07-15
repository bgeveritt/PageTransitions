/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    PageTransitionsNoContext
    ========================

    @file      : PageTransitionsNoContext.js
    @version   : 1.0
    @author    : Bailey Everitt
    @date      : Tue, 14 Jul 2015 16:41:23 GMT
    @copyright : 
    @license   : MIT

    Documentation
    ========================
    This widget is used in conjunction with PhoneGap builds to utilize the Native Page Transitions plugin (https://github.com/Telerik-Verified-Plugins/NativePageTransitions)
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
require({
    packages: [{
        name: 'nativepagetransistions',
        location: '../../widgets/PageTransitions/lib',
        main: 'NativePageTransitions.js'
    }]
}, [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text', 'dojo/text!PageTransitions/widget/template/PageTransitionsNoContext.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, widgetTemplate) {
    'use strict';

    // Declare widget's prototype.
    return declare('PageTransitions.widget.PageTransitionsNoContext', [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        clsName: null,
        direction: null,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,
        _objProperty: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._objProperty = {};
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');

            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            this._contextObj = obj;
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {

        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {

        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _setupEvents: function () {
            
            if (typeof window.plugins !== "undefined") {

                if (typeof window.plugins.nativepagetransitions !== "undefined") {
                    this.connect(dojo.query("."+this.clsName)[0], 'click', function () {
                        
                        console.log('tap detected');
                        
                        var options = {
                            "direction": this.direction, // 'left|right|up|down', default 'left' (which is like 'next')
                            "duration": this.duration, // in milliseconds (ms), default 400
                            "slowdownfactor": 2, // overlap views (higher number is more) or no overlap (1), default 4
                            "iosdelay": 60, // ms to wait for the iOS webview to update before animation kicks in, default 60
                            "androiddelay": 70, // same as above but for Android, default 70
                            "winphonedelay": 200, // same as above but for Windows Phone, default 200,
                            "fixedPixelsTop": 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
                            "fixedPixelsBottom": 0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
                        };

                        window.plugins.nativepagetransitions.slide(
                            options,
                            function (msg) {
                                console.log("success: " + msg)
                            }, // called when the animation has finished
                            function (msg) {
                                alert("error: " + msg)
                            } // called in case you pass in weird values
                        );
                    });

                }
            } else {
                console.log('page transition plugin not found');
            }
        },

        _updateRendering: function () {

        },

        _resetSubscriptions: function () {
            // Release handle on previous object, if any.
        }
    });
});