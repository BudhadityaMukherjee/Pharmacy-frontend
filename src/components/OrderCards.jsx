import { GoTriangleRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllPharmacistOffer } from '../features/pharmacistOffersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const OrderCards = ({ item }) => {
    let total = 0;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    item?.medicines?.map((meds) => {
        total = total + Number(meds?.medicineId?.price);
        total = parseFloat(total.toFixed(2));
    });
    const handleOrderPreview = (id, status) => {
        if (status === 'pending') {
            navigate(`/user-profile/current-order?id=${id}`);
        } else if (status === 'confirmed') {
            navigate(`/user-profile/view-order?id=${id}`);
        } else {
            navigate(`/user-profile/view-order?id=${id}`);
        }
    };

    useEffect(() => {
        dispatch(getAllPharmacistOffer(item._id));
    }, []);

    return (
        <>
            <div
                className=" cursor-pointer flex flex-col rounded-lg border-[0.1rem] bg-[#f5f5f5] w-[100%] mx-auto"
                onClick={() => {
                    handleOrderPreview(item._id, item.status);
                }}
            >
                <div className="flex flex-col  justify-between p-5 font-default-font-family">
                    <div className="flex items-center justify-between">
                        {item?.status === 'pending' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#E47917] text-white rounded-md text-[0.9rem]">
                                {item?.status}
                            </div>
                        )}
                        {item?.status === 'confirmed' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#C6791F] text-white rounded-md text-[0.9rem]">
                                {item?.status}
                            </div>
                        )}
                        {item?.status === 'delivered' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#1DAD23] text-white rounded-md text-[0.9rem]">
                                {item?.status}
                            </div>
                        )}
                        <div>{item.createdAt.slice(0, 10)}</div>
                    </div>
                </div>

                <div>
                    <div className=" max-h-[100px] overflow-y-scroll">
                        <ul className="p-5 py-2 ">
                            {item?.medicines?.map((meds) => (
                                <li
                                    key={meds._id}
                                    className=" flex items-center gap-2"
                                >
                                    <GoTriangleRight />
                                    <li className=" text-[#737A83]">
                                        {meds?.medicineId?.name}
                                    </li>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2 p-5 py-2">
                        {item?.prescriptions?.map((prescription) => (
                            <img
                                key={item._id}
                                className="bg-[#f5f5f5] w-[100px] h-[100px] rounded-sm border  "
                                src={`http://localhost:3003/images/${prescription}`}
                                alt="userImage"
                            />
                        ))}
                    </div>
                </div>

                <div className=" bg-[#E5EAF1] flex justify-between mt-auto p-5 lg:text-[1.2rem] text-[1rem]  font-medium rounded-b-md">
                    {item.medicines.length > 0 ? <span>₹{total}</span> : ''}
                    {/* {item.status === 'pending' ? (
                        <span className="italic text-[#8e8888] font-thin text-[1rem] ">
                            {userOrderOffers?.length} Offers
                        </span>
                    ) : (
                        ''
                    )} */}
                </div>
            </div>
        </>
    );
};

export default OrderCards;
