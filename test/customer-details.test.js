import { html, fixture, expect, oneEvent  } from '@open-wc/testing';
import { stub } from 'sinon';
import { Router } from '@vaadin/router';
import '../src/Customer/Customer-details.js';

describe('customer details', () => {
// Write test cases inside this block
let el;

  beforeEach(async () => {
    el = await fixture(html`<customer-details></customer-details>`);
  });

  it('renders the component', () => {
    expect(el).to.exist;
    expect(el.shadowRoot.querySelector('h2').textContent).to.exist;
  });
it('navigates back to emi details when back button clicked', async () => {
    const routerStub = stub(Router, 'go');
    const backBtn = el.shadowRoot.querySelector('.backbg-btn-color');
    backBtn.click();
    expect(routerStub.calledOnceWith('/emidetails')).to.be.true;
    routerStub.restore();
  });
  it('calls fetch on form submit with valid data', async () => {
    const fetchStub = stub(window, 'fetch').resolves({ status: 200 });
    const routerStub = stub(Router, 'go');
    const form = el.shadowRoot.querySelector('lion-form');
    form.modelValue = {
      first_name: 'John',
      last_name: 'Doe',
      dateof_birth: '1990-01-01',
      email: 'john@example.com',
      mobile_number: '9876543210',
      monthly_salary: 50000,
      EMIs_amount: 2000,
      terms: ['on'],
    };
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await Promise.resolve(); // wait microtask

    expect(fetchStub.calledOnce).to.be.true;
    expect(fetchStub.firstCall.args[0]).to.equal(
      'https://loanfeapi.herokuapp.com/submit-form'
    );

    expect(routerStub.calledOnceWith('/success')).to.be.true;

    fetchStub.restore();
    routerStub.restore();
  });
  it('redirects to error page if fetch fails', async () => {
    const fetchStub = stub(window, 'fetch').resolves({ status: 400 });
    const routerStub = stub(Router, 'go');

    const form = el.shadowRoot.querySelector('lion-form');
    form.modelValue = {
      first_name: 'John',
      last_name: 'Doe',
      dateof_birth: '1990-01-01',
      email: 'john@example.com',
      mobile_number: '9876543210',
      monthly_salary: 50000,
      EMIs_amount: 2000,
      terms: ['on'],
    };

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await Promise.resolve();

    expect(routerStub.calledOnceWith('/error')).to.be.true;

    fetchStub.restore();
    routerStub.restore();
  });
});
