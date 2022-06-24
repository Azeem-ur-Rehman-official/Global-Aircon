import React from 'react';
import '../css/services.css';
import WhychooseUS from '../Sections/WhychooseUS';
const Services = () => {
  return (
    <>
      <WhychooseUS />
      <div className="headerSection whyK2ptech py-5">
        <div className="staticBackground">
          <div className="backInnerSection py-5">
            <div className="overlay">
              <header className="section-header">
                <h3>
                  <br />
                  Services
                </h3>
                <p>
                  Global Aircond provides all types of Aircon Services. You can
                  choose any package related to your aircon service given below:
                </p>
              </header>
            </div>
            <section className="aboutSectionCard container py-4">
              <div className="myCard" data-aos="zoom-in" data-aos-delay="50">
                <div className="icon-wraper">
                  {' '}
                  <div
                    className="service-icon"
                    style={{ background: '#fceef3' }}
                  >
                    <i
                      className="fa fa-shower"
                      style={{ color: '#ff689b' }}
                    ></i>
                  </div>
                  <div className="heading">
                    <h4>BASIC CLEANING</h4>
                  </div>
                </div>
                <div className="content">
                  <p>
                    Wash & Clean Filters by Water, Indoor Unit Casing Cleaning
                    by Water, Gas Pressure Check, Refrigerant 20 PSI Top-Up If
                    Needed & Indoor Cooling Temperature Check
                  </p>
                </div>
              </div>

              <div className="myCard" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-wraper">
                  <div
                    className="service-icon"
                    style={{ background: '#fff0da' }}
                  >
                    <i className="fa fa-flask" style={{ color: '#e98e06' }}></i>
                  </div>

                  <div className="heading">
                    <h4>CHEMICAL CLEANING</h4>
                  </div>
                </div>
                <div className="content">
                  <p>
                    Indoor & Outdoor, Clean Drainage Pipe, Compressor Health
                    Check, Refrigerant 20 PSI Top-up if Needed & Indoor Cooling
                    Temperature Check
                  </p>
                </div>
              </div>

              <div className="myCard" data-aos="zoom-in" data-aos-delay="150">
                <div className="icon-wraper">
                  {' '}
                  <div
                    className="service-icon"
                    style={{ background: '#e6fdfc' }}
                  >
                    <i className="fa fa-tint" style={{ color: '#3fcdc7' }}></i>
                  </div>
                  <div className="heading">
                    <h4>
                      CHEMICAL CLEANING<br></br>(INDOOR UNIT ONLY)
                    </h4>
                  </div>
                </div>
                <div className="content">
                  <p>
                    Cleaning Filters, Cooling Coil, Blower, Casing & Clean
                    Drainage Pipe & Cooling Temperature Check
                  </p>
                </div>
              </div>
              <div className="myCard" data-aos="zoom-in" data-aos-delay="150">
                <div className="icon-wraper">
                  {' '}
                  <div
                    className="service-icon"
                    style={{ background: '#eafde7' }}
                  >
                    <i className="fa fa-tint" style={{ color: '#41cf2e' }}></i>
                  </div>
                  <div className="heading">
                    <h4>CHEMICAL CLEANING (OUTDOOR UNIT ONLY)</h4>
                  </div>
                </div>
                <div className="content">
                  <p>
                    Out Door Coil Chemical Cleaning, Compressor Health Check,
                    Refrigerant 20 PSI Top-up If Needed
                  </p>
                </div>
              </div>
              <div className="myCard" data-aos="zoom-in" data-aos-delay="150">
                <div className="icon-wraper">
                  {' '}
                  <div
                    className="service-icon"
                    style={{ background: '#e1eeff' }}
                  >
                    <i className="fa fa-globe" style={{ color: '#2282ff' }}></i>
                  </div>
                  <div className="heading">
                    <h4>CHEMICAL CLEANING OVERALL</h4>
                  </div>
                </div>
                <div className="content">
                  <p>
                    Removal of Indoor Unit, Clean Drainage Pipe, Compressor
                    Health Check, Refrigerant 20 PSI Top-up IF Needed & Indoor
                    Cooling Temperature Check
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
