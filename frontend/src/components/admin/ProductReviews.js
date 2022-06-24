import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
import { MDBDataTable } from 'mdbreact';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteReview,
  getProductReviews,
} from '../../actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');
  const [value, setValue] = useState('');
  const [err, setErr] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (!error) {
      setErr(false);
      dispatch(clearErrors());
    } else {
      setErr(true);
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Review deleted successfully');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, productId, error, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setProductId(value);
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };
  function cancelHandle() {
    setErr(false);
    dispatch(clearErrors());
  }
  return (
    <Fragment>
      <MetaData title={'Product Reviews'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                {err ? (
                  <>
                    <Alert
                      variant="filled"
                      severity="error"
                      className="myAlert"
                    >
                      Invalid ID !
                    </Alert>
                    <CancelIcon
                      className="cancelErr"
                      onClick={cancelHandle}
                    ></CancelIcon>
                  </>
                ) : null}
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
