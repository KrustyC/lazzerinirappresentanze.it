// jsdom does not implement <dialog>'s showModal/close — the cookie settings
// modal uses both. Cross-cutting browser primitives are polyfilled here
// rather than per test; each is guarded, so on node these are no-ops.
function showModal(this: HTMLDialogElement) {
  this.open = true;
}

function close(this: HTMLDialogElement) {
  this.open = false;
  this.dispatchEvent(new Event("close"));
}

if (typeof HTMLDialogElement !== "undefined") {
  HTMLDialogElement.prototype.showModal = showModal;
  HTMLDialogElement.prototype.close = close;
}
