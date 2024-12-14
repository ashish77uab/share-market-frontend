import React, { useState } from 'react'
import { numberWithCommas } from '../../utils/helpers'
import DepositModal from '../../components/modals/DepositModal'
import WithdrawModal from '../../components/modals/WithdrawModal'

const Funds = ({ user }) => {
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
    return (
        <>
            <div className=''>
                <header className="py-4 border-b-dark">
                    <h4 className="heading-4 ">Your Wallet</h4>
                </header>
                <div className="py-6 ">
                    <div className="flex items-center gap-2 py-2">
                        <p className="text-base font-medium  ">Total Balance:</p>
                        <p className="text-base font-bold">Rs. {numberWithCommas(user?.wallet?.amount)}</p>

                    </div>
                    <div className="flex items-center gap-2 my-4">
                        <button onClick={() => setIsDepositOpen(true)} className="btn-green">Deposit</button>
                        <button onClick={() => setIsWithdrawOpen(true)} className="btn-red">Withdraw</button>
                    </div>
                    {/* <div>
                        <h5 className="heading-5 text-white py-2">Deposit via UPI ID</h5>
                        <div className='bg-primary-darkBlueSupport min-w-full lg:min-w-[600px] border-dark px-6 py-6  rounded-md inline-flex items-center justify-between gap-2'>
                            <span>9874563211@ybl</span>
                        </div>

                    </div> */}
                    <div>
                        <p className='text-muted py-2 flex items-start'>
                            <b className='mt-[-2px]'>Note:</b>
                            <p className='text-muted ml-2 leading-[1.6] text-sm max-w-3xl'>  Please verify all information carefully before initiating any deposit or withdrawal requests. Ensure the deposit amount is a minimum of ₹2,000 and use <b className='text-white opacity-75 mx-1'>NEFT OR RTGS</b> as the payment method. </p>
                        </p>
                    </div>
                </div>
            </div>
            <DepositModal
                isOpen={isDepositOpen}
                closeModal={() => {
                    setIsDepositOpen(false)
                }} />
            <WithdrawModal
                isOpen={isWithdrawOpen}
                closeModal={() => {
                    setIsWithdrawOpen(false)
                }} />

        </>
    )
}

export default Funds