import { html, fixture, expect } from '@open-wc/testing';
// import { stub } from 'sinon';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
  // Write test cases inside this block
  let el;

  beforeEach(async () => {
    el = await fixture(html`<loan-success></loan-success>`);
  });

  it('renders heading and description', () => {
    const heading = el.shadowRoot.querySelector('h2');
    const desc = el.shadowRoot.querySelector('p');

    expect(heading).to.exist;
    expect(desc).to.exist;
  });

  it('renders home button', () => {
    const homeBtn = el.shadowRoot.querySelector('.home-btn');
    expect(homeBtn).to.exist;
  });

  it('navigates to home when home button is clicked', () => {
    const stub = sinon.stub(Router, 'go');
    const homeBtn = el.shadowRoot.querySelector('.home-btn');
    homeBtn.click();

    expect(stub.calledOnceWith('/')).to.be.true;
    stub.restore();
  })
});


describe('error screen', () => {
  // Write test cases inside this block
  let el;

  beforeEach(async () => {
    el = await fixture(html`<loan-error></loan-error>`);
  });

   it('renders error title and description', () => {
    const h2 = el.shadowRoot.querySelector('h2');
    const p = el.shadowRoot.querySelector('p');

    expect(h2).to.exist;
    expect(h2.textContent).to.include('!!');
    expect(p).to.exist;
  });

  it('has a home button', () => {
    const homeBtn = el.shadowRoot.querySelector('.home-btn');
    expect(homeBtn).to.exist;
  });

  it('navigates home when home button is clicked', () => {
    const stub = sinon.stub(Router, 'go');
    const homeBtn = el.shadowRoot.querySelector('.home-btn');

    homeBtn.click();
    expect(stub.calledOnceWith('/')).to.be.true;
    stub.restore();
  });
});
