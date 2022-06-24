import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { postData } from '../../routes/FetchData';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const AddSubscription = () => {
  const alert = useAlert();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('heading', heading);
    formData.set('duration', duration);
    formData.set('price', price);
    formData.set('discount', discount);
    formData.set('description', description);
    postData('/api/v1/admin/subscription/new', formData)
      .then((res) => {
        setHeading('');
        setDuration('');
        setPrice('');
        setDiscount('');
        setDescription('');
        alert.show('Subscrition added successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
    // dispatch(updateProfile(formData));
  };
  return (
    <div>
      <MetaData title={'Add Subscription'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div>
            <form className="shadow-lg my-3 p-3" onSubmit={submitHandler}>
              <h1 className="m-3">Add New Subscription</h1>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Heading</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="heading"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Duration</label>
                <input
                  type="number"
                  id="name_field"
                  className="form-control"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Price</label>
                <input
                  type="number"
                  id="name_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group mx-3">
                <label htmlFor="name_field">Discount</label>
                <input
                  type="number"
                  id="name_field"
                  className="form-control"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="form-group mx-3">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className=" update-btn order-button mx-3 px-5"
              >
                ADD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;
