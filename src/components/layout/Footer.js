import React from 'react'
import { reactIcons } from '../../utils/icons'
import { Link } from 'react-router-dom'

const footerLinks = [
    {
        title: 'About',
        link: '/about'
    },
    {
        title: 'Privacy Policy',
        link: '/privacy-policy'
    },
    {
        title: 'Terms and Conditions',
        link: '/terms-and-conditions'
    },

]
const Footer = () => {
    return (
        <footer >
            <div className='py-16 bg-primary-pink text-white'>
                <div className="container">
                    <div className="flex lg:flex-row flex-col justify-between gap-4">
                        <div className='max-w-lg'>
                            <img className='invert' src="/images/logo.png" alt="logo" />
                            <p className='max-w-[600px]  text-muted text-white mt-4'>We Provide an affordable trading platform to help everyone to switch into an effortless trading system which offers Autologin features with Best & Pre-tested Profitable Strategies with Real Time Execution and Zero Latency.</p>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div>
                                <h4 className='heading-4 mb-4'>Other Links</h4>
                                <ul>
                                    {
                                        footerLinks?.map((link) => {
                                            return <li className='py-2' key={link.title}><Link  to={link.link} className='text-white font-medium hover:text-primary-blue hover:underline'>{link.title}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h4 className='heading-4 mb-4'>React us</h4>
                                <ul className='space-y-6'>
                                    <li className='flex items-center gap-4 '>
                                        <span className='text-2xl'>{reactIcons.mobile}</span>
                                        <span>044 2450 0009</span>
                                    </li>
                                    <li className='flex items-center gap-4'>
                                        <span className='text-2xl' >{reactIcons.email}</span>
                                        <span>info@staralgosecurities.com</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <p className='text-muted text-center'>
                    &copy; 2023 StarAlgoSecurities. All rights reserved. 
                </p>
            </div>
        </footer>
    )
}

export default Footer