```javascript
const zapier = require('zapier-platform-core');
const authentication = require('./authentication');
const formSubmissionTrigger = require('./triggers/form_submission');
const sendWelcomeEmailCreate = require('./creates/send_welcome_email');

const App = {
  version: require('./package.json').version,
  platformVersion: zapier.version,
  authentication: authentication,
  triggers: {
    [formSubmissionTrigger.key]: formSubmissionTrigger,
  },
  creates: {
    [sendWelcomeEmailCreate.key]: sendWelcomeEmailCreate,
  },
  beforeRequest: [
    (request, z, bundle) => {
      if (bundle.authData.access_token) {
        request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
      }
      return request;
    },
  ],
  afterResponse: [
    (response, z, bundle) => {
      if (response.status === 401) {
        throw new z.errors.RefreshAuthError();
      }
      return response;
    },
  ],
};

module.exports = App;
```

Please note that this is the main `index.js` file for the Zapier CLI application. The `authentication.js`, `triggers/form_submission.js`, and `creates/send_welcome_email.js` files are not included in this response. These files should contain the logic for OAuth2 authentication, the form submission trigger, and the send welcome email action respectively.