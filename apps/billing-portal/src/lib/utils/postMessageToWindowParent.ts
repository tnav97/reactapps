export enum MessageType {
  BUTTON_CLICK = 'BUTTON_CLICK',
}

export default function postMessageToWindowParent(
  type: MessageType,
  object: any
) {
  const message = {
    isBillingPortalMessage: true,
    type,
    ...object,
  };
  window.parent.postMessage(message, '*');
}
