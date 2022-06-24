import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#blogSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Products
            </a>
            <ul className="collapse list-unstyled" id="blogSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>

              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/faq">
              <i className="fa fa-question-circle"></i> FAQ'S
            </Link>
          </li>
          <li>
            <Link to="/admin/blogs">
              <i className="fa fa-question-circle"></i> Blogs
            </Link>
          </li>
          <li>
            <Link to="/admin/subscriptions">
              <i className="fa fa-question-circle"></i> Subscriptions
            </Link>
          </li>
          <li>
            <Link to="/admin/services">
              <i className="fa fa-tasks"></i> Booked Services
            </Link>
            <Link to="/admin/notification">
              <i className="fa fa-tasks"></i> Send Notification
            </Link>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
