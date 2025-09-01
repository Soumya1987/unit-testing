import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { stub, useFakeTimers } from 'sinon';
import { Router } from '@vaadin/router';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  let clock;
  let fetchStub, routerStub;

  beforeEach(() => {
    clock = useFakeTimers();
    fetchStub = sinon.stub(window, 'fetch');
    localStorage.clear();
  });

  afterEach(() => {
    clock.restore();
    fetchStub.restore();
  });

it('constructor initializes with default values', async () => {
    const el = new (customElements.get('basic-details'))();
    expect(el.amount).to.equal(10000);
    expect(el.range).to.equal(2);
    expect(el.emiCalc).to.equal(0);
    expect(el.type).to.equal('');
  });

  it('connectedCallback sets type from localStorage', async () => {
    localStorage.setItem('type', 'Personal Loan');
    const el = await fixture(html`<basic-details></basic-details>`);
    expect(el.type).to.equal('Personal Loan');
  });

  it('connectedCallback leaves type empty if not in localStorage', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    expect(el.type).to.equal(null)
  });

  it('renders form with default values and buttons', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const typeInput = el.shadowRoot.querySelector('.type');
    const amountInput = el.shadowRoot.querySelector('.amount');
    const rangeInput = el.shadowRoot.querySelector('.period');
    const prevBtn = el.shadowRoot.querySelector('.btn-previous');
    const nextBtn = el.shadowRoot.querySelector('.btn-next');

    expect(typeInput).to.exist;
    expect(typeInput.hasAttribute('disabled')).to.be.true;
    expect(Number(amountInput.modelValue)).to.equal(10000);
    expect(Number(rangeInput.modelValue)).to.equal(2);
    expect(prevBtn).to.exist;
    expect(nextBtn).to.exist;
  });

  it('_numToWord updates #word with valid number', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const amountInput = el.shadowRoot.querySelector('.amount');
    amountInput.value = '15000';
    el._numToWord();
    const wordDiv = el.shadowRoot.querySelector('#word');
    expect(wordDiv.textContent).to.not.equal('');
  });

  it('updates word when _numToWord is called', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    await el.updateComplete;
    const amountInput = el.shadowRoot.querySelector('.amount');
    amountInput.value = '15000';
    el._numToWord();

    const wordDiv = el.shadowRoot.querySelector('#word');
    expect(wordDiv.innerHTML).to.not.equal('');
  });
});
