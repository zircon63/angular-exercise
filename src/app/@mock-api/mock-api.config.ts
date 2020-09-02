import {MockConfig} from './mock.config.types';
import {MockHttpHandlerBuilder} from './mock-http-handler.builder';

export const MOCK_API_CONFIG: MockConfig = {
  GET: {
    'https://blueface.com/profile': MockHttpHandlerBuilder
      .create()
      .withResult({
        body: {
          age: 30,
          firstName: 'Michael',
          lastName: 'Collins',
          userName: 'michael.collins',
          email: ``
        }
      })
      .withError({
        error: {
          error: 'error.profile.not-found'
        }
      })
      .withTimeout(5000)
      .build()
  },
  PUT: {
    'https://blueface.com/profile': MockHttpHandlerBuilder
      .create()
      .withResult({
        body: {}
      })
      .withError({
        error: {
          error: 'error.profile.invalid-name'
        }
      })
      .withTimeout(1500)
      .build(),
    'https://blueface.com/email': MockHttpHandlerBuilder
      .create()
      .withResult({
        body: {}
      })
      .withError({
        error: {
          error: 'error.profile.email-generation'
        }
      })
      .withTimeout(1000)
      .build()
  }
};
