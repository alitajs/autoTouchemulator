(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**
   * Emulate touch on desktop
   */
  var eventTarget;
  /**
   * create an touch point
   * @constructor
   * @param target
   * @param identifier
   * @param pos
   * @param deltaX
   * @param deltaY
   * @returns {Object} touchPoint
   */

  var Touch = function Touch(target, identifier, pos, deltaX, deltaY) {
    deltaX = deltaX || 0;
    deltaY = deltaY || 0;
    this.identifier = identifier;
    this.target = target;
    this.clientX = pos.clientX + deltaX;
    this.clientY = pos.clientY + deltaY;
    this.screenX = pos.screenX + deltaX;
    this.screenY = pos.screenY + deltaY;
    this.pageX = pos.pageX + deltaX;
    this.pageY = pos.pageY + deltaY;
  };
  /**
   * create empty touchlist with the methods
   * @class
   * @return { Array } touchList
   */


  function TouchList() {
    var touchList = [];

    touchList.item = function item(index) {
      return this[index] || null;
    }; // specified by Mozilla


    touchList.identifiedTouch = function identifiedTouch(id) {
      return this[id + 1] || null;
    };

    return touchList;
  }
  /**
   * Simple trick to fake touch event support
   * this is enough for most libraries like Modernizr and Hammer
   */


  function fakeTouchSupport() {
    var objs = [window, document.documentElement];
    var props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

    for (var o = 0; o < objs.length; o++) {
      for (var p = 0; p < props.length; p++) {
        if (objs[o] && objs[o][props[p]] === undefined) {
          objs[o][props[p]] = null;
        }
      }
    }
  }
  /**
   * only trigger touches when the left mousebutton has been pressed
   * @param { String } touchType touchType
   * @return { Function } handler
   */


  function onMouse(touchType) {
    return function (ev) {
      // prevent mouse events
      if (ev.which !== 1) {
        return;
      } // The EventTarget on which the touch point started when it was first placed on the surface,
      // even if the touch point has since moved outside the interactive area of that element.
      // also, when the target doesnt exist anymore, we update it


      if (ev.type === 'mousedown' || !eventTarget || eventTarget && !eventTarget.dispatchEvent) {
        eventTarget = ev.target;
      }

      triggerTouch(touchType, ev); // reset

      if (ev.type === 'mouseup') {
        eventTarget = null;
      }
    };
  }
  /**
   * trigger a touch event
   * @param { String } eventName eventName
   * @param { Object } mouseEv mouseEv
   */


  function triggerTouch(eventName, mouseEv) {
    var touchEvent = document.createEvent('Event');
    touchEvent.initEvent(eventName, true, true);
    touchEvent.altKey = mouseEv.altKey;
    touchEvent.ctrlKey = mouseEv.ctrlKey;
    touchEvent.metaKey = mouseEv.metaKey;
    touchEvent.shiftKey = mouseEv.shiftKey;
    touchEvent.touches = getActiveTouches(mouseEv);
    touchEvent.targetTouches = getActiveTouches(mouseEv);
    touchEvent.changedTouches = createTouchList(mouseEv);
    eventTarget.dispatchEvent(touchEvent);
  }
  /**
   * create a touchList based on the mouse event
   * @param { Object } mouseEv mouseEv
   * @return { TouchList } touchList
   */


  function createTouchList(mouseEv) {
    var touchList = TouchList();
    touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0));
    return touchList;
  }
  /**
   * receive all active touches
   * @param { Object } mouseEv mouseEv
   * @return { TouchList } touchList
   */


  function getActiveTouches(mouseEv) {
    // empty list
    if (mouseEv.type === 'mouseup') {
      return TouchList();
    }

    return createTouchList(mouseEv);
  }
  /**
   * desktop initializer
   * @param { HTMLElement } target target
   */


  function TouchEmulator(target) {
    fakeTouchSupport();
    target.addEventListener('mousedown', onMouse('touchstart'), true);
    target.addEventListener('mousemove', onMouse('touchmove'), true);
    target.addEventListener('mouseup', onMouse('touchend'), true);
  } // start distance when entering the multitouch mode


  TouchEmulator.multiTouchOffset = 75;

  var target = document.getElementsByClassName('__dumi-default-mobile-demo-layout');

  if (target && target[0]) {
    TouchEmulator(target[0]);
  } else {
    TouchEmulator(window);
  }

})));
