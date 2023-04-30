# Shared Components

The components listed here are meant to be "embedded" in other applications, using an iframe or other mechanism.

As a result, they do not use the Redux state, neither are they meant to be part of the main application.

## Communication

When these components need to pass messages to host applications, we use the https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage API. These messages can be listened to using `window.addEventListener('message', handlerFn)`.

Here's an example of how you can parse: 

```js
window.addEventListener('message', (message) => {
  if (message.origin === 'https://billing-portal.ecompliance.com') {
    const data = message.data;
    
    if (data.isBillingPortalMessage === true) {
      // this is definitely a message from billing portal component
      if (data.type === 'HIDE_BANNER' && data.banner === 'upgrade') {
        hideUpgradeBanner();
      }
    }
  }
})
```