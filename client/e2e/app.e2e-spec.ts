import { ChaosMettPage } from './app.po';

describe('chaos-mett App', function() {
  let page: ChaosMettPage;

  beforeEach(() => {
    page = new ChaosMettPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
