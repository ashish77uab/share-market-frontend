import React, { useState } from 'react'
import { numberWithCommas } from '../../utils/helpers'
import DepositModal from '../../components/modals/DepositModal'
import WithdrawModal from '../../components/modals/WithdrawModal'

const Funds = ({ user }) => {
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
    return (
        <>
            <div>
                <header className="py-4 border-b border-b-zinc-300 px-4 lg:px-10">
                    <h4 className="heading-4 text-primary-pink">Your Wallet</h4>
                </header>
                <div className="py-6 px-4 lg:px-10">
                    <div className="flex items-center gap-2 py-2">
                        <p className="text-base font-medium  text-gray-900">Total Balance:</p>
                        <p className="text-base font-bold">Rs. {numberWithCommas(user?.wallet?.amount)}</p>

                    </div>
                    <div className="flex items-center gap-2 my-4">
                        <button onClick={()=>setIsDepositOpen(true)} className="btn-green">Deposit</button>
                        <button onClick={()=>setIsWithdrawOpen(true)} className="btn-red">Withdraw</button>
                    </div>
                    <div>
                        <h5 className="heading-5 text-primary-pink py-2">Deposit via UPI ID</h5>
                        <div className='bg-zinc-100 border-c px-6 py-4 rounded-md flex items-center justify-between gap-2'>
                            <span>9874563211@ybl</span>
                        </div>
                       
                    </div>
                    <div>
                        <p className='text-muted py-2 '>
                            <b>Note:</b>
                            <span className='text-muted ml-2 text-sm'>Please verify information sending request for Deposit / Withdraw</span>
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