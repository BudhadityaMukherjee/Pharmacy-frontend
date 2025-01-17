import { useRef, useState } from 'react';
import Button from '../../../../components/Button';
import GlobalInput from '../../../../components/GlobalInput';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { notify } from '../../../../App';
import showAlert from '../../../../components/showAlert';

const MedicineModal = ({ onClose }) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    const medicineName = useRef();
    const priceRef = useRef();
    const packageRef = useRef();
    const manufacturerRef = useRef();
    const compositionRef = useRef();

    const [tags, setTags] = useState([]);
    const addTags = (e) => {
        if (tags.length > 1) {
            notify('Only 2 compositions allowed');
            e.target.value = '';
            return;
        }
        const tagValue = compositionRef.current.value;
        if (e.code === 'Enter' && tagValue) {
            e.preventDefault();
            e.target.value = '';
            setTags([...tags, tagValue]);
        }
    };

    const deleteTag = (val) => {
        let remainTag = tags.filter((item) => item !== val);
        setTags(remainTag);
    };
    const addMedicine = async (e) => {
        try {
            e.preventDefault();
            if (
                medicineName?.current?.value?.trim() === '' ||
                medicineName?.current?.value?.trim() === '' ||
                priceRef?.current?.value?.trim() === '' ||
                packageRef?.current?.value?.trim() === '' ||
                manufacturerRef?.current?.value?.trim() === '' ||
                tags[0] === undefined
            ) {
                notify('Fill all the fields');
                return;
            }
            const adminToken = localStorage.getItem('token');
            const rawData = await axios({
                method: 'post',
                url: `http://localhost:3003/medicines/add-medicine`,
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    name: medicineName.current.value.trim(),
                    price: priceRef.current.value.trim(),
                    pack_size_label: packageRef.current.value.trim(),
                    manufacturer_name: manufacturerRef.current.value.trim(),
                    short_composition1: tags[0].trim(),
                    short_composition2:
                        tags[1] !== undefined ? tags[1].trim() : ''
                }
            });
            onClose();
            showAlert('success', 'Succesfully added');
            return rawData;
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex z-20 "
            >
                <div className=" bg-white rounded-2xl m-auto p-7 flex-col gap-5 items-center w-[400px]">
                    <div className="flex justify-between">
                        <h2 className="text-[1.2rem] font-medium">
                            Add New Medicine
                        </h2>
                        <button
                            className="border border-gray-300 rounded-md px-1 "
                            onClick={onClose}
                        >
                            <RxCross2 />
                        </button>
                    </div>

                    <form className="mt-4">
                        <GlobalInput
                            inputLabel={'Medicine Name '}
                            placeholder={'Dolo 650mg Strip Of 15 Tablets'}
                            type={'text'}
                            refValue={medicineName}
                        />

                        <div className="flex flex-col gap-1 py-2">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Price
                            </p>
                            <div className="relative border-[0.1rem] border-[#C0CAD4] rounded-md">
                                <span className="absolute top-[11.6px] left-4">
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    placeholder="210"
                                    ref={priceRef}
                                    className=" outline-none ms-9 font-default-font-family w-[80%] placeholder-[#ABABB2] placeholder-font-[0.5rem] lg:py-[0.8rem] py-[0.4rem] text-[0.9rem] font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <GlobalInput
                                inputLabel={'Pack_size_label'}
                                placeholder={'Strip Of 10 Tablets'}
                                type={'text'}
                                refValue={packageRef}
                            />
                        </div>
                        <div>
                            <GlobalInput
                                inputLabel={'Manufacturer'}
                                placeholder={'Manufacturer Name'}
                                type={'text'}
                                refValue={manufacturerRef}
                            />
                        </div>
                        <div className="mt-2">
                            <h3 className="  text-xs text-gray-500">
                                Composition
                            </h3>
                            <div className="flex ">
                                <div className=" mt-1 text-sm p-1 gap-1 rounded-md w-[100%] border border-[#C0CAD4] flex ">
                                    {tags?.map((item, index) => {
                                        return (
                                            <div
                                                className=" 
                                             bg-[#DBE0F1] outline-none border-none rounded-sm px-2 m-1 flex items-center max-w-[130px]"
                                                key={index}
                                            >
                                                <div className="max-w-[100px] truncate text-xs  text-[#1444EF]">
                                                    {item}{' '}
                                                </div>
                                                <h3
                                                    onClick={() =>
                                                        deleteTag(item)
                                                    }
                                                    className="border border-[#DBE0F1]  px-1 cursor-pointer"
                                                >
                                                    {' '}
                                                    <RxCross2 />
                                                </h3>
                                            </div>
                                        );
                                    })}
                                    <input
                                        className=" outline-none ms-2 font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] lg:py-[0.7rem] py-[0.4rem] text-[0.9rem] w-[90%] font-medium"
                                        type="text"
                                        placeholder="Paracetamol"
                                        ref={compositionRef}
                                        onKeyDown={addTags}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-1 mt-5">
                            <Button handleClick={addMedicine} type={Button}>
                                Add Now!
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MedicineModal;
