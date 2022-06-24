
import { Link, withRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledBadge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import logo from '../../assets/img/logo.webp';

import Search from "./Search";

const MiddleHeader = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="middle-header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-3 d-none d-md-block">
            <div className="middle-header-logo">
              <Link to="/">
                <img src={logo} className="img-fluid" style={{maxHeight: "50px"}} />
              </Link>
            </div>
          </div>

          <div className="col-9 col-md-6">
            <div className="middle-header-search">
              <Route render={({ history }) => <Search history={history} />} />
            </div>
          </div>

          <div className="col-3">
            <ul className="middle-header-optional">
              <Link to="/cart" style={{ textDecoration: "none", width: "45px" }}>
                <Link to="/cart">
                  <IconButton aria-label="cart" className="cartItem" style={{ color: "#17204A"}}>
                    <StyledBadge
                      badgeContent={cartItems.length}
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MiddleHeader);
