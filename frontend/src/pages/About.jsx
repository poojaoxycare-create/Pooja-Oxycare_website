import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroImg from '../assets/people waiting.avif'
import doctor from '../assets/doctor.jpeg'

export default function About() {
	return (
		<div className="min-h-screen text-gray-800">
			<Navbar />

			{/* HERO */}
			<section className="bg-[#2f5b4f] text-white">
				<div className="max-w-6xl mx-auto px-6 py-16 lg:flex lg:items-center lg:gap-12">
					<div className="lg:w-1/2">
						<h1 className="text-4xl font-bold">About Us</h1>
						<p className="mt-6 text-lg text-gray-200 max-w-xl">
							At OxyCare, we make essential medical devices affordable and available for everyone, ensuring comfort and care at home.
						</p>

						<div className="mt-6 flex gap-4">
							<button className="bg-yellow-400 text-[#0b3b2a] px-5 py-2 rounded-full font-semibold">Get Started</button>
							<NavLink to="/about" className="border border-white/20 px-5 py-2 rounded-full">Explore</NavLink>
						</div>
					</div>

					<div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
						<img src={doctor} alt="about" className="rounded-lg w-full max-w-md object-cover" />
					</div>
				</div>
			</section>

			{/* WHY CHOOSE US */}
			<section className="bg-white">
				<div className="max-w-6xl mx-auto px-6 py-12 lg:grid lg:grid-cols-2 gap-8 items-center">
					<div>
						<h2 className="text-xl font-semibold">Why Choose Us</h2>
						<p className="text-gray-600 mt-3">We provide comprehensive medical equipment solutions with unmatched service quality, reliability, and customer care.</p>

						<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex gap-3 items-start">
								<div className="p-3 rounded-md bg-green-50 text-green-600">🚚</div>
								<div>
									<div className="font-semibold">Fast & Free Shipping</div>
									<div className="text-sm text-gray-500">Quick delivery of medical equipment to your home.</div>
								</div>
							</div>

							<div className="flex gap-3 items-start">
								<div className="p-3 rounded-md bg-green-50 text-green-600">💵</div>
								<div>
									<div className="font-semibold">Easy to Rent</div>
									<div className="text-sm text-gray-500">Flexible rental options for all medical devices.</div>
								</div>
							</div>

							<div className="flex gap-3 items-start">
								<div className="p-3 rounded-md bg-green-50 text-green-600">🛠️</div>
								<div>
									<div className="font-semibold">24/7 Support</div>
									<div className="text-sm text-gray-500">Round-the-clock assistance and technical support.</div>
								</div>
							</div>

							<div className="flex gap-3 items-start">
								<div className="p-3 rounded-md bg-green-50 text-green-600">🔁</div>
								<div>
									<div className="font-semibold">Hassle Free Returns</div>
									<div className="text-sm text-gray-500">Easy returns and pickup for your peace of mind.</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-center">
						<img src={heroImg} alt="why" className="rounded-lg object-cover w-full max-w-md" />
					</div>
				</div>
			</section>

			{/* OUR SERVICES */}
			<section className="bg-gray-50">
				<div className="max-w-6xl mx-auto px-6 py-12">
					<h3 className="text-center text-lg font-semibold">Our Services</h3>
					<p className="text-center text-gray-500 mt-2">Comprehensive medical equipment solutions with professional support at every step.</p>

					<div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{[
							'Fast Delivery',
							'Installation & Setup',
							'24/7 Customer Support',
							'Quality Assurance',
							'Flexible Rental Plans',
							'Maintenance & Repair'
						].map((s) => (
							<div key={s} className="bg-white border-gray-200 border rounded p-4">
								<div className="font-semibold">{s}</div>
								<div className="text-sm text-gray-500 mt-2">Sample details about {s.toLowerCase()} and how we help customers.</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* HOW IT WORKS */}
			<section className="bg-white">
				<div className="max-w-6xl mx-auto px-6 py-12 lg:grid lg:grid-cols-2 gap-8 items-center">
					<div>
						<h4 className="text-xl font-semibold">How It Works</h4>
						<p className="text-gray-600 mt-3">Getting the medical equipment you need is simple and straightforward with our streamlined process.</p>

						<ol className="mt-6 list-decimal list-inside text-gray-700 space-y-3">
							<li><span className="font-semibold">Browse & Select</span> - Explore our catalog and choose the devices that meet your needs.</li>
							<li><span className="font-semibold">Schedule Delivery</span> - Choose a delivery time and our team will bring the equipment to your door.</li>
							<li><span className="font-semibold">Professional Setup</span> - Technicians install and demonstrate how to use the equipment.</li>
							<li><span className="font-semibold">Ongoing Support</span> - Access 24/7 support, maintenance, and easy returns when needed.</li>
						</ol>
					</div>

					<div className="flex justify-center">
						<img src={doctor} alt="how it works" className="rounded-lg w-full max-w-md object-cover" />
					</div>
				</div>
			</section>

			{/* TESTIMONIALS */}
			<section className="bg-gray-50">
				<div className="max-w-4xl mx-auto px-6 py-12 text-center">
					<h4 className="text-lg font-semibold">Testimonials</h4>
					<p className="text-gray-500 text-sm mt-2">Hear from our satisfied customers who have experienced quality care and reliable service with OxyCare medical equipment.</p>

					<div className="mt-6 bg-white border-gray-200 border rounded-lg p-6">
						<p className="italic text-gray-700">"OxyCare made it incredibly easy to get the oxygen concentrator my father needed. The delivery was prompt, the equipment was in perfect condition, and their support team walked us through everything. Highly recommend their services!"</p>

						<div className="mt-4 flex items-center justify-center gap-4">
							<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold">MJ</div>
							<div className="text-left">
								<div className="font-semibold">Maria Johnson</div>
								<div className="text-sm text-gray-500">OxyCare Customer</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
