import React, { Fragment, useEffect, useState } from 'react';
import faker from 'faker';
import { postData } from '../../routes/FetchData';
import { ObjectId } from 'mongodb';
import axios from 'axios';

const SampleData = () => {

    const [users, setUsers] = useState([]);

    const SelectNumber = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        axios.get('/api/v1/admin/users').then((res) => {
            setUsers(res.data.users);
            users.forEach(user => {
                if (user.role === "user") {
                    // console.log(user);
                    usersID.push(user._id)
                }
            });
        }).catch((err) => {
            console.log("Error in Hook" + err);
        });
    }, []);

    let usersID = [];

    const submitUsers = (e) => {
        e.preventDefault();

        for (var i = 50; i > 0; i--) {
            const formData = new FormData();
            var randName = faker.name.findName();
            var randEmail = faker.internet.email();
            var randPassword = faker.internet.password();
            formData.set('name', randName);
            formData.set('email', randEmail);
            formData.set('password', randPassword);
            // console.log("Name: " + randName);
            postData('/api/v1/register/sample', formData).then((response) => {
                // console.log("Response => " + response);
            }).catch((error) => {
                console.log("Error => " + error);
            });
        }
    };

    const submitOrders = (e) => {
        e.preventDefault();


        for (var j = 250; j > 0; j--) {
            let orderItems = [];

            for (let i = 0; i < SelectNumber(1, 5); i++) {
                orderItems.push({
                    product: ObjectId().toString(),
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    image: "https://res.cloudinary.com/dtjf4ftmq/image/upload/v1639046339/products/gwu1jaiugok9fjmnl9et.webp",
                    quantity: SelectNumber(1, 10)
                });
            }

            let shippingInfo = {
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                phoneNo: faker.phone.phoneNumber(),
                postalCode: faker.address.zipCode(),
                country: faker.address.country()
            };

            // console.log(shippingInfo.country);

            let paymentInfo = {
                id: ObjectId().toString(),
                status: "succeeded"
            };

            const itemsPrice = orderItems.reduce((sum, product) => sum + product.price * product.quantity, 0);
            const totalQuantity = orderItems.reduce((sum, product) => sum + product.quantity, 0);
            const taxPrice = itemsPrice * 0.05;
            const shippingPrice = totalQuantity * (Math.round(SelectNumber(20, 40) / 5) * 5);

            const dateBetween = (from, to) => {
                return new Date(from + faker.datatype.number(to - from));
            }

            var from = new Date("July 21, 2019 01:15:00").getTime();
            var to = new Date("July 21, 2021 01:15:00").getTime();
            var paidAt = dateBetween(from, to).toISOString();

            from = new Date(paidAt).getTime();
            to = new Date().getTime();
            var deliveredAt = dateBetween(from, to).toISOString();

            let order = {
                itemsPrice: itemsPrice,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice,
                totalPrice: itemsPrice + taxPrice + shippingPrice,
                orderStatus: "Delivered",
                orderItems: orderItems,
                shippingInfo: shippingInfo,
                paymentInfo: paymentInfo,
                paidAt: paidAt,
                user: usersID[SelectNumber(0, usersID.length)],
                createdAt: paidAt,
                deliveredAt: deliveredAt
            };

            // dispatch(createOrder(order));

            const postOrder = async (order) => {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                await axios.post('/api/v1/order/new', order, config).then((res) => {
                    // console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }

            postOrder(order);

        }

    };

    return (
        <Fragment>
            <div className="container my-5">

                <form
                    className="shadow-lg p-4 border-radius-20"
                // encType="multipart/form-data"
                >
                    <h1 className="mb-3 text-center">Add sample data</h1>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center mt-5 mb-4">
                                <button
                                    id="register_button"
                                    type="button"
                                    onClick={submitUsers}
                                    className="order-button px-5"
                                //disabled={loading ? true : false}
                                >
                                    Generate Sample Users
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center mt-5 mb-4">
                                <button
                                    id="register_button"
                                    type="button"
                                    onClick={submitOrders}
                                    className="order-button px-5"
                                //disabled={loading ? true : false}
                                >
                                    Generate Sample Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default SampleData;
