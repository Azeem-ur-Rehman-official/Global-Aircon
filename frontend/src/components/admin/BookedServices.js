import { MDBDataTable } from 'mdbreact';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteData, getData } from '../../routes/FetchData';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
const BookedServices = ({ history }) => {
  const alert = useAlert();
  const [BLOG, setBLOG] = useState([]);
  const { loading } = useSelector((state) => state.allUsers);

  const getAllData = () => {
    getData(`/api/v1/admin/services`)
      .then((res) => {
        // console.log(`data is ${res}`);
        // console.log(res.data.service);
        setBLOG((r) => (r = res.data.service));
      })
      .catch((err) => console.log(err.response.data.msg));
  };
  useEffect(() => {
    getAllData();
  }, []);
  const deleteServiceHandler = (id) => {
    deleteData(`/api/v1/admin/services/${id}`)
      .then((res) => {
        getAllData();
        alert.show('service deleted successfully');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert.show('somthing went wrong');
      });
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Address',
          field: 'address',
          sort: 'asc',
        },
        {
          label: 'Estimated Time',
          field: 'estimatedTime',
          sort: 'asc',
        },
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    BLOG.forEach((order) => {
      data.rows.push({
        name: order.name,
        address: order.address,
        estimatedTime: order.estimatedTime,
        date: order.date,
        actions: (
          <Fragment>
            <Link
              to={`/admin/view/service/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteServiceHandler(order._id)}
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
      <MetaData title={'Bookings'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Booked Services</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
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

export default BookedServices;
