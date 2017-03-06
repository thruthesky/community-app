import { CommunityAppPage } from './app.po';

describe('community-app App', () => {
  let page: CommunityAppPage;

  beforeEach(() => {
    page = new CommunityAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
