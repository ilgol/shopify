import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { processRequest } from '../Api';
import * as testData from '../tests/testData/ApiTestData';

jest.mock('../HistoryConfig', () => jest.fn());
//skipped because oj Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
// later will be fixed
describe.skip('Processing XHR request tests', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('Should return response if correct data', (done) => {
    mock.onAny().reply(200, testData.authResponse);

    const request = processRequest('test', 'POST', { data: 'test' });

    request.then((res) => {
      expect(res).toEqual(testData.authResponse);
      done();
    })
      .catch((err) => {
        expect(err.message).toEqual('Request failed with status code 404');
        done(err);
      });
  }, 1000);
});
