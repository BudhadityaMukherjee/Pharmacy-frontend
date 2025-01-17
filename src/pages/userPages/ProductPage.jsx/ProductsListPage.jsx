import { useDispatch, useSelector } from 'react-redux';
import ProductCards from '../../../components/ProductCards';
import { useEffect, useRef } from 'react';
import {
    fetchProductLists,
    searchProductList
} from '../../../features/productSlice';
import ReactPaginate from 'react-paginate';
import { BiSolidRightArrow } from 'react-icons/bi';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Products = () => {
    const productList = useSelector((state) => state.product.data);
    const total = useSelector((state) => state?.product?.total);

    console.log(productList)
    console.log(total)
    const dispatch = useDispatch();
    const searchRef = useRef();
    useEffect(() => {
        dispatch(fetchProductLists(0));
    }, []);

    const handleaPageClick = (data) => {
        dispatch(fetchProductLists(data.selected + 1));
    };
    const handleSearchInput = (e) => {
        if (searchRef.current.value === '') {
            dispatch(fetchProductLists(0));
        }
        dispatch(searchProductList(searchRef.current.value));
    };

    return (
        <>
            <div className=" md:px-[5rem] lg:px-44 bg-[#EBF6F9] flex flex-col justify-start items-center min-h-[90vh] ">
                <div className="flex bg-white rounded-md items-center px-3 w-[90%] my-5   mx-auto  sm:hidden">
                    <FaMagnifyingGlass className="text-[1.3rem] " />
                    <input
                        type={'text'}
                        className=" w-[90%]  p-2 rounded-md font-default-font-family outline-none "
                        placeholder="search medicines"
                        ref={searchRef}
                        onChange={handleSearchInput}
                    />
                </div>
                <div className=" grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 justify-items-center content-center max-w-[1400px] mx-auto sm:pb-10 sm:pt-5 p-3 gap-10">
                    {productList?.map((item) => (
                        <ProductCards itemProduct={item} key={item._id} />
                    ))}
                </div>
                {productList?.length >= 12 ? (
                    <div className="w-[100%] pb-20 mt-5 text-center">
                        <ReactPaginate
                            previousLabel={<BiSolidLeftArrow />}
                            nextLabel={<BiSolidRightArrow />}
                            breakLabel={'...'}
                            pageCount={total}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={2}
                            onPageChange={handleaPageClick}
                            containerClassName={
                                'flex items-center justify-center mt-7'
                            }
                            pageLinkClassName={
                                ' flex mr-2 items-center justify-center px-3 h-8 leading-tight  border border-gray-300 rounded-md hover:bg-blue-700 hover:text-white'
                            }
                            previousLinkClassName={
                                ' flex mr-2 items-center justify-center px-3 h-8 ms-0 leading-tight text-black  rounded-md hover:bg-blue-700 hover:text-white '
                            }
                            nextLinkClassName={
                                ' flex mr-2 items-center justify-center px-3 h-8 leading-tight text-black  rounded-md hover:bg-blue-700 hover:text-white '
                            }
                            breakLinkClassName={
                                ' flex mr-2 items-center justify-center px-3 h-8 leading-tight text-black  border border-gray-300 rounded-md hover:bg-blue-700 hover:text-white '
                            }
                            activeLinkClassName=" flex mr-2 items-center justify-center px-3 bg-[#1444ef] text-white border border-gray-300 hover:bg-[#!444ef] rounded-md hover:text-white"
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default Products;
