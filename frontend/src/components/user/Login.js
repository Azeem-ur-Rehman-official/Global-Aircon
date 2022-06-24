import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, login } from '../../actions/userActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  let redirect = '';
  if (!isAuthenticated || user.role !== 'admin')
    redirect = location.search ? location.search.split('=')[1] : '/';
  else
    redirect = location.search ? location.search.split('=')[1] : '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    } else {
      setValidation(validation + 1);
      // console.log(validation);
      if (validation < 0) alert.show('User id or password is incorrect');
    }

    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert.show('please fill out all the fields');
      setValidation(true);
    } else dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Login'} />
          <div className="my-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                  <form className="shadow-lg border-radius-20 p-4" onSubmit={submitHandler}>
                    <h1 className="mb-3 text-center">Login</h1>
                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-right">
                      <Link to="/password/forgot" className="mb-4">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        id="login_button"
                        type="submit"
                        className=" order-button px-5"
                      >
                        LOGIN
                      </button>
                    </div>
                    <div className="text-center">
                      <Link to="/register" className="mt-3 btn">
                        Create a new account
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-lg-3"></div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
