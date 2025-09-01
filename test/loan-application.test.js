import { html, fixture, expect } from '@open-wc/testing';

import '../loan-application.js';

describe('LoanApplication', () => {
  // Write test cases inside this block
  it('renders the component', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    expect(el).to.exist;
  });

  it('has default properties', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('renders a <dash-board> element inside', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    const dashBoard = el.shadowRoot.querySelector('dash-board');
    expect(dashBoard).to.exist;
  });

  it('updates the title when passed as attribute', async () => {
    const el = await fixture(html`<loan-application title="Custom Title"></loan-application>`);
    expect(el.title).to.equal('Custom Title');
  });

  it('increments the counter using __increment()', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    el.__increment();
    expect(el.counter).to.equal(6);
  });

  it('applies default CSS color variable', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    const styles = getComputedStyle(el);
    expect(styles.color).to.equal('rgb(0, 0, 0)'); // s
  });

  it('is accessible', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
