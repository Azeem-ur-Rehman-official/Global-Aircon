import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const SubscriptionPayment = (props) => {
  let history = useHistory();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const [SubData, setSubData] = useState();
  const [amount, setAmount] = useState(0);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const id = props.match.params.id;

    postData(`/api/v1/single/subscription`, { id })
      .then((res) => {
        setSubData(res.data.subscription);
        setAmount(res.data.subscription[0].price);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  }, []);

  // console.log('jjjjjjjjjjjjjjjjjj');
  // console.log(SubData[0].price);

  const paymentData = {
    amount: amount,
  };
  const paymentInfo = {
    id: '',
    status: '',
  };
  const Data = {
    user: user._id,
    subscriptionId: props.match.params.id,
    paymentInfo,
    totalPrice: paymentData.amount,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      res = await axios.post('/api/v1/payment/process/v', paymentData, config);

      const clientSecret = res.data.client_secret;

      console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === 'succeeded') {
          Data.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          postData(`/api/v1/user/subscription/buy`, Data)
            .then((res) => {
              history.push('/success/subscription');
            })
            .catch((err) => {
              alert.show('somthing went wrong');
            });
          //   dispatch(createOrder(order));
          //   dispatch(emptyCart());
        } else {
          alert.error('There is some issue while payment processing');
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <MetaData title={'Subscription Payment'} />

        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-4">Card Info</h1>
              <div className="form-group">
                <label htmlFor="card_num_field">Card Number</label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control"
                  options={options}
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_exp_field">Card Expiry</label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control"
                  options={options}
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_cvc_field">Card CVC</label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control"
                  options={options}
                />
              </div>

              <button id="pay_btn" type="submit" className="btn btn-block py-3">
                Pay {amount}$
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(SubscriptionPayment);
