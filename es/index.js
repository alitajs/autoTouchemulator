import TouchEmulator from 'f2-touchemulator';
var target = document.getElementsByClassName('__dumi-default-mobile-demo-layout');

if (target && target[0]) {
  TouchEmulator(target[0]);
} else {
  TouchEmulator(window);
}