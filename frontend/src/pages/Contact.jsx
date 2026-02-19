import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState(null)

	return (
		<div className="min-h-screen text-gray-800">
			<Navbar />

			<section className="bg-[#2f5b4f] text-white">
				<div className="max-w-6xl mx-auto px-6 py-16">
					<h1 className="text-4xl font-bold">Contact Us</h1>
					<p className="mt-4 text-gray-200 max-w-2xl">Have questions about our medical equipment or services? We're here to help. Reach out to our team for support.</p>
				</div>
			</section>

			<main className="bg-gray-50">
				<div className="max-w-6xl mx-auto px-6 py-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
						<div>
							<div className="bg-white rounded-lg p-6 border-gray-200 border shadow-sm">
								<h3 className="text-lg font-semibold">Get In Touch</h3>
								<p className="text-gray-600 mt-2">We're available to answer any questions you may have about our products and services.</p>

								<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="flex gap-4 items-start">
										<div className="w-10 h-10 rounded-md bg-green-50 text-green-600 flex items-center justify-center">📍</div>
										<div>
											<div className="font-semibold">Address</div>
											<div className="text-sm text-gray-500">saini chouraha, Bhopal, Arwaliya, Madhya Pradesh 462038</div>
										</div>
									</div>

									<div className="flex gap-4 items-start">
										<div className="w-10 h-10 rounded-md bg-green-50 text-green-600 flex items-center justify-center">📞</div>
										<div>
											<div className="font-semibold">Phone</div>
											<div className="text-sm text-gray-500">+91 7748905785</div>
										</div>
									</div>

									<div className="flex gap-4 items-start">
										<div className="w-10 h-10 rounded-md bg-green-50 text-green-600 flex items-center justify-center">✉️</div>
										<div>
											<div className="font-semibold">Email</div>
											<div className="text-sm text-gray-500">Poojaoxycare@gmail.com</div>
										</div>
									</div>

									<div className="flex gap-4 items-start">
										<div className="w-10 h-10 rounded-md bg-green-50 text-green-600 flex items-center justify-center">⏰</div>
										<div>
											<div className="font-semibold">Business Hours</div>
											<div className="text-sm text-gray-500">Mon - Fri: 8:00 AM - 8:00 PM<br/>Sat - Sun: 9:00 AM - 6:00 PM</div>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-6">
							<div className="bg-white border-gray-200 border rounded p-6">
									<h4 className="font-semibold">Emergency Support</h4>
									<p className="text-sm text-gray-600 mt-2">For urgent medical equipment needs or technical emergencies, our 24/7 hotline is always available.</p>
								<button onClick={() => window.location.href = 'tel:+917748905785'} className="mt-4 bg-[#0b3b2a] text-white px-4 py-2 rounded">Call Emergency Line</button>
								</div>
							</div>
						</div>

						<aside className="space-y-6">
							<div className="bg-white border-gray-200 border rounded p-6">
								<h4 className="font-semibold">Send Us a Message</h4>
									<form className="mt-4 space-y-3" onSubmit={async (e) => {
										e.preventDefault();
										setStatus('sending');
										const payload = {
											firstName,
											lastName,
											email,
											phone,
											subject,
											message
										};

										try {
											const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
											const res = await fetch(`${apiBaseUrl}/contact`, {
												method: 'POST',
												headers: { 'Content-Type': 'application/json' },
												body: JSON.stringify(payload)
											});
											if (res.ok) {
												setStatus('sent');
												setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
											} else {
												setStatus('error');
											}
										} catch (err) {
											setStatus('error');
										}
									}}>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											<input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border-gray-200 border rounded px-3 py-2" placeholder="First name" />
											<input value={lastName} onChange={(e) => setLastName(e.target.value)} className="border-gray-200 border rounded px-3 py-2" placeholder="Last name" />
										</div>
										<input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Email address" />
										<input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Phone number" />
										<input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Subject" />
										<textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border-gray-200 border rounded p-3 h-32" placeholder="Message" />
										<button type="submit" disabled={status === 'sending'} className="mt-2 w-full bg-[#0b3b2a] text-white py-2 rounded">
											{status === 'sending' ? 'Sending...' : 'Send Message'}
										</button>
										{status === 'sent' && <div className="text-green-600 text-sm mt-2">Message sent — we will contact you soon.</div>}
										{status === 'error' && <div className="text-red-600 text-sm mt-2">Failed to send. Please try again later.</div>}
									</form>
							</div>
						</aside>
					</div>

					{/* full-width map */}
					<div className="mt-8">
						<div className="bg-gray-100 rounded-lg overflow-hidden h-100">
							<iframe
								title="OxyCare location"
								src="https://www.google.com/maps?q=saini%20chouraha%20Bhopal%20Arwaliya%20462038&z=15&output=embed"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
							></iframe>
						</div>
					</div>

					{/* FAQ full-width */}
					<div className="mt-8">
						<div className="bg-white border-gray-200 border rounded p-6">
							<h4 className="font-semibold text-center">Frequently Asked Questions</h4>
							<div className="mt-6 space-y-6 text-sm text-gray-700 max-w-4xl mx-auto">
								<div>
									<div className="font-semibold">How quickly can equipment be delivered?</div>
									<div className="text-gray-500">We offer same-day and next-day delivery options for most equipment, depending on your location and availability.</div>
								</div>

								<div>
									<div className="font-semibold">Do you provide training on equipment use?</div>
									<div className="text-gray-500">Yes, our technicians provide comprehensive training and demonstrations for all medical devices during installation.</div>
								</div>

								<div>
									<div className="font-semibold">What if the equipment malfunctions?</div>
									<div className="text-gray-500">Contact our 24/7 support line immediately. We'll troubleshoot remotely or send a technician for repairs or replacement.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	)
}
