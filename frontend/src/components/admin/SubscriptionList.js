import { MDBDataTable } from 'mdbreact';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteData, getData } from '../../routes/FetchData';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const SubscriptionList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState([]);
  const { loading } = useSelector((state) => state.allUsers);

  const getAllData = () => {
    getData(`/api/v1/subscription`)
      .then((res) => {
        // console.log(`data is ${res}`);
        // console.log(res.data.subscription);
        setSubscription((r) => (r = res.data.subscription));
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  useEffect(() => {
    getAllData();
  }, []);

  const deleteUserHandler = (id) => {
    deleteData(`/api/v1/admin/subscription/${id}`)
      .then((res) => {
        getAllData();
        alert.show('subscription deleted successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'Heading',
          field: 'heading',
          sort: 'asc',
        },
        {
          label: 'Duration',
          field: 'duration',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Discount',
          field: 'discount',
          sort: 'asc',
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    subscription.forEach((user) => {
      data.rows.push({
        heading: user.heading,
        duration: user.duration,
        price: user.price,

        discount: user.discount,
        description: user.description.substring(0, 120) + '...',

        actions: (
          <Fragment>
            <Link
              to={`/subscription-update/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Subscriptions'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex  mx-3">
              <h1 className="my-5">Subscription Packages</h1>
              <Link
                to="/admin/add/subscriptions"
                className="btn order-button ml-auto my-auto px-4"
              >
                <i className="fa fa-plus"></i> ADD
              </Link>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default SubscriptionList;
