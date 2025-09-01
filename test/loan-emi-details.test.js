import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import { Router } from '@vaadin/router';

describe('Loan EMI details', () => {
  // Write test cases inside this block

  beforeEach(() => {
    localStorage.setItem(
      'emi',
      JSON.stringify({
        interestRate: 8.5,
        monthlyEMI: 5000,
        principal: 100000,
        interest: 20000,
        totalAmount: 120000,
      })
    );
  });

  it('is defined as a custom element', () => {
    const elClass = customElements.get('loanemi-details');
    expect(elClass).to.exist;
  });

  it('renders EMI details from localStorage', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    await el.updateComplete;

    const text = el.shadowRoot.textContent;
    expect(text).to.include('EMI Details');
    expect(text).to.include('8.5');
    expect(text).to.include('5000');
    expect(text).to.include('100000');
    expect(text).to.include('20000');
    expect(text).to.include('120000');
  });

  it('has cancel and continue buttons', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const cancelBtn = el.shadowRoot.querySelector('.cancel-btn');
    const continueBtn = el.shadowRoot.querySelector('.continue-btn');

    expect(cancelBtn).to.exist;
    expect(continueBtn).to.exist;
  });

  it('navigates to /details when cancel button is clicked', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const cancelBtn = el.shadowRoot.querySelector('.cancel-btn');

    const goStub = stub(Router, 'go');
    cancelBtn.click();

    expect(goStub.calledOnceWith('/details')).to.be.true;
    goStub.restore();
  });

  it('navigates to /customer when continue button is clicked', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const continueBtn = el.shadowRoot.querySelector('.continue-btn');

    const goStub = stub(Router, 'go');
    continueBtn.click();

    expect(goStub.calledOnceWith('/customer')).to.be.true;
    goStub.restore();
  });
});
