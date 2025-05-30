import { createStore } from './index';

describe('Store', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  it('initializes with default values', () => {
    expect(store.textData).toEqual({
      text: '',
      operation: 'summarize',
    });
    expect(store.loading).toEqual({
      text: false,
    });
  });

  it('updates text data', () => {
    const newTextData = {
      text: 'Test text',
      operation: 'translate',
    };
    store.setTextData(newTextData);
    expect(store.textData).toEqual(newTextData);
  });

  it('updates loading state', () => {
    expect(store.loading.text).toBe(false);

    store.setLoading('text', true);
    expect(store.loading.text).toBe(true);

    store.setLoading('text', false);
    expect(store.loading.text).toBe(false);
  });
}); 