import React, { useRef } from 'react';
import { useState } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import GlobalInput from '../../../components/GlobalInput';
import Button from '../../../components/Button';
import PasswordInput from '../../../components/PasswordInput';
import GenericModal from '../../../components/GenericModal';

const PharmaRegister = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passRef = useRef();
    const regNoRef = useRef();
    const confirmPassRef = useRef();
    const [page, setPage] = useState(1);

    return (
        <div>
            <AuthenticationTemplate SubHeading={'Registration Form'}>
                <form action="">
                    <div
                        className={`bg-[#1444ef] h-2 rounded-md ${page === 1 ? 'w-[25%]' : page === 2 ? 'w-[50%]' : page === 3 ? 'w-[75%]' : 'w-[100%]'}`}
                    ></div>
                    {page === 1 && (
                        <>
                            <GlobalInput
                                inputLabel="Name"
                                type="text"
                                placeholder="Jhon Doe"
                                refValue={nameRef}
                                required={true}
                            />
                            <GlobalInput
                                inputLabel="Email ID"
                                type="email"
                                placeholder="example@mail.com"
                                refValue={emailRef}
                                required={true}
                            />
                            <div className="mt-5 w-[50%] ms-auto">
                                <Button handleClick={() => setPage(2)}>
                                    {' '}
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                    {page === 2 && (
                        <>
                            <PasswordInput
                                inputLabel="Password"
                                placeholder="John@1234"
                                refValue={passRef}
                                required={true}
                            />
                            <PasswordInput
                                inputLabel="Confirm Password"
                                placeholder="John@1234"
                                refValue={confirmPassRef}
                                required={true}
                            />

                            <div className="mt-5 flex gap-3">
                                <Button handleClick={() => setPage(1)}>
                                    {' '}
                                    Previous
                                </Button>
                                <Button handleClick={() => setPage(3)}>
                                    {' '}
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                    {page === 3 && (
                        <>
                            <GlobalInput
                                inputLabel="Phone Number"
                                type="email"
                                placeholder="1234567890"
                                refValue={phoneRef}
                                required={true}
                            />
                            <GlobalInput
                                inputLabel="Licence No./Registraion np."
                                placeholder="1234567890"
                                refValue={regNoRef}
                                required={true}
                            />

                            <div className="mt-5 flex gap-3">
                                <Button handleClick={() => setPage(2)}>
                                    {' '}
                                    Previous
                                </Button>
                                <Button handleClick={() => setPage(4)}>
                                    {' '}
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                    {page === 4 && (
                        <>
                            <GlobalInput
                                inputLabel="Certificates"
                                type="file"
                                placeholder="1234567890"
                                refValue={phoneRef}
                                required={true}
                            />
                            <div className="flex flex-col gap-1 py-2">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Address
                                </p>
                                <input
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                    placeholder="address"
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>

                            <div className="mt-5 flex gap-3">
                                <Button handleClick={() => setPage(3)}>
                                    {' '}
                                    Previous
                                </Button>
                                <Button handleClick={() => {}}> Submit</Button>
                            </div>
                        </>
                    )}
                </form>
            </AuthenticationTemplate>
        </div>
    );
};

export default PharmaRegister;
