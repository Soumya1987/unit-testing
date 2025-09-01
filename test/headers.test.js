import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { localize } from '@lion/localize';
import '../src/header/Header.js';

describe('loan-header', () => {
  // Write test cases inside this block
  let el;

  beforeEach(async () => {
    el = await fixture(html`<loan-header></loan-header>`);
  });

  it('renders heading text', () => {
    const heading = el.shadowRoot.querySelector('p');
    expect(heading).to.exist;
    expect(heading.textContent).to.not.equal('');
  });

    it('renders EN and NL buttons', () => {
    const enBtn = el.shadowRoot.querySelector('#en-GB');
    const nlBtn = el.shadowRoot.querySelector('#nl-NL');

    expect(enBtn).to.exist;
    expect(nlBtn).to.exist;
    expect(enBtn.textContent.trim()).to.equal('EN');
    expect(nlBtn.textContent.trim()).to.equal('NL');
  });

it('switches to NL when NL button is clicked', async () => {
  const nlBtn = el.shadowRoot.querySelector('#nl-NL');
  const enBtn = el.shadowRoot.querySelector('#en-GB');

  nlBtn.click();
  await el.updateComplete;

  expect(nlBtn.classList.contains('bg-btn-color')).to.be.true;
  expect(nlBtn.classList.contains('btn-cursor')).to.be.false;

  expect(enBtn.classList.contains('bg-btn-color')).to.be.false;
  expect(enBtn.classList.contains('btn-cursor')).to.be.true;
  expect(localize.locale).to.equal('nl-NL');
});

it('switches back to EN when EN button is clicked after NL', async () => {
  const nlBtn = el.shadowRoot.querySelector('#nl-NL');
  const enBtn = el.shadowRoot.querySelector('#en-GB');
  nlBtn.click();
  await el.updateComplete;
  enBtn.click();
  await el.updateComplete;
  expect(enBtn.classList.contains('bg-btn-color')).to.be.true;
  expect(enBtn.classList.contains('btn-cursor')).to.be.false;

  expect(nlBtn.classList.contains('bg-btn-color')).to.be.false;
  expect(nlBtn.classList.contains('btn-cursor')).to.be.true;
  expect(localize.locale).to.equal('en-GB');
});
});
