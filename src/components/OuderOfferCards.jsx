import React, { useState } from 'react';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import PaymentGateway from '../utils/payment/PaymentGateway';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllPharmacistOffer } from '../features/pharmacistOffersSlice';
const OuderOfferCards = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const cartvalue = item
        ? item.medicines
              .filter((medicine) => medicine?.isAvailable === true)
              .reduce(
                  (total, medicine) =>
                      (total +=
                          Number(medicine?.medicineId?.price) *
                          medicine?.quantity),
                  0
              )
        : 0;
    const discount = Math.round(cartvalue + 100 - item?.price);
    const discountPercent = Math.round((discount / cartvalue) * 100);

    const handleUserFinalOrder = () => {
        handleConfirmAlert(
            'question',
            '',
            'Are you sure you want to place your order',
            'Place Order',
            () => setIsOpen(true)
        );
    };
    const dispatch = useDispatch();

    const handleDecline = async () => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'put',
                url: `http://localhost:3003/quotation/user-decline?quotationId=${item._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getAllPharmacistOffer(window.location.search.slice(4)));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className=" border rounded-md max-w-[330px] py-3 mt-4">
                <div className=" flex gap-3 xl:justify-center justify-start pb-2 ps-2 pe-2">
                    <span className=" inline-block h-[50px] w-[50px] bg-[#e1e1e1] rounded-[50%]"></span>
                    <div className="xxl:px-5 px-1">
                        <span className=" sm:text-[1rem] text-[0.9rem]">
                            {item?.pharmacistId?.pharmacyId?.name?.toUpperCase()}
                        </span>
                        <div className=" flex sm:flex-row flex-col justify-start sm:justify-between sm:items-center sm:gap-5">
                            <span className=" font-semibold text-medium">
                                ₹{parseFloat(item?.price).toFixed(2)}
                            </span>
                            {item.status !== 'declined' && (
                                <span className=" text-[#1444ef] text-sm">
                                    Discount : {discountPercent}%
                                </span>
                            )}
                        </div>
                        {item.status !== 'declined' ? (
                            <div className="flex justify-between py-3">
                                <button
                                    className="w-[48%] bg-white border border-[#1444EF] text-button p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]"
                                    onClick={handleDecline}
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleUserFinalOrder}
                                    className="w-[48%] bg-button border border-[#1444EF] text-white p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                                >
                                    Accept
                                </button>
                            </div>
                        ) : (
                            <div className="text-red text-[0.8rem] items-center gap-1 flex font-default-font-family">
                                <IoMdInformationCircleOutline /> This offer is
                                not valid!
                            </div>
                        )}
                    </div>
                </div>

                <div className="xl:text-center text-start sm:px-3 px-2 text-[0.8rem] border-t-2 pt-3 ">
                    <span className=" text-[#737A83] ">Delivery by </span>{' '}
                    {item.deliveryDate.slice(0, 10)} , before{' '}
                    {item.deliverySlot === 1 ? (
                        <span>2:00pm</span>
                    ) : (
                        <span>7:00pm</span>
                    )}
                </div>
                {isOpen && (
                    <PaymentGateway
                        order={item}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </div>
        </>
    );
};

export default OuderOfferCards;
