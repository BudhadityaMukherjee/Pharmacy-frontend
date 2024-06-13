import DemoImage from '../assets/images/demoMedicine.jpeg';
import notFound from '../assets/images/not_found.jpg'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity } from '../features/userCartSlice';
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from '@material-tailwind/react';
import AddToCartBtn from './AddToCartBtn';
import { Link, useNavigate } from 'react-router-dom';
import GenericModal from './GenericModal';
import Button from './Button';
import ButtonOutlined from './ButtonOutlined';
import Logo from './Logo';
import { baseUrl } from '../utils/constants';
import randomcolor from 'randomcolor'
const ProductCards = ({ itemProduct }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModel, setShowModal] = useState(false);
    const user = useSelector((state) => state.user);

    const color = randomcolor({
        hue:'#00d2ff'
    })
    const handleNewCartItem = () => {
        if (user.data === null) {
            setShowModal(true);
            return;
        }
        dispatch(addToCart(itemProduct));
    };

    const handleIncreaseItem = () => {
        dispatch(addToCart(itemProduct));
    };

    const handleDecreaseItem = () => {
        dispatch(decreaseQuantity(itemProduct));
    };

    return (
        <>
            {showModel && (
                <GenericModal
                    onClose={() => setShowModal(false)}
                    heading={<Logo />}
                >
                    <div className=" mt-8 mb-4 flex gap-5">
                        <Button
                            handleClick={() => {
                                navigate('/login');
                            }}
                        >
                            {' '}
                            Login
                        </Button>
                        <ButtonOutlined>No, Thanks</ButtonOutlined>
                    </div>
                </GenericModal>
            )}

            <Card className="mt-10 w-72  shadow-md ">
                <Link to={`/item?itemId=${itemProduct._id}`}>
                    <CardHeader
                        color="blue-gray"
                        className="relative h-56 mx-0 shadow-none rounded-none rounded-t-lg "
                    >
                        <div style={{backgroundColor:color}} className="flex justify-center items-center p-5  ">
                            <img
                                src={itemProduct?.images[0]?`${baseUrl}/images/${itemProduct?.images[0]}`:DemoImage}
                                onError={(e)=>{e.target.src=notFound}}
                                className=" h-100 w-100"
                            />
                        </div>
                    </CardHeader>
                    <CardBody className="p-4 h-[80px]">
                        <Typography className="mb-2 font-default-font-family flex flex-col justify-center items-start">
                            <p className=" text-[1rem] font-medium  truncate w-100 ">
                                {itemProduct.name}
                            </p>
                            <p className="text-[0.8rem] text-[#697275] flex gap-1">
                                <span>By</span>
                                <span className=" underline">
                                    {itemProduct.manufacturerName}
                                </span>
                            </p>
                        </Typography>
                    </CardBody>
                </Link>
                <hr />
                <div>
                    <AddToCartBtn
                        id={itemProduct._id}
                        handleNewCartItem={handleNewCartItem}
                        handleDecreaseItem={handleDecreaseItem}
                        handleIncreaseItem={handleIncreaseItem}
                    />
                </div>
            </Card>
        </>
    );
};

export default ProductCards;
