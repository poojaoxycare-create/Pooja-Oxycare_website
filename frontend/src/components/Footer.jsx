import React from 'react'

export default function Footer() {
	return (
		<footer className="bg-white border-t">
			<div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
				<div>
					<h6 className="font-semibold">OxyCare.</h6>
					<p className="text-gray-600 text-sm mt-2">Providing essential medical devices with reliable service. We ensure comfort and care for patients at home with quality equipment and timely support.</p>
				</div>
				<div>
					<h6 className="font-semibold">About us</h6>
					<ul className="text-sm text-gray-600 mt-2 space-y-1">
						<li>About us</li>
						<li>Shop</li>
						<li>Contact us</li>
					</ul>
				</div>
				<div>
					<h6 className="font-semibold">Support</h6>
					<ul className="text-sm text-gray-600 mt-2 space-y-1">
						<li>Knowledge base</li>
						<li>Live chat</li>
					</ul>
				</div>
				<div>
					<h6 className="font-semibold">Info</h6>
					<ul className="text-sm text-gray-600 mt-2 space-y-1">
						<li>Our Team</li>
						<li>Leadership</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
			</div>
			<div className="bg-white border-t py-4">
				<div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">Copyright ©2025. All Rights Reserved.</div>
			</div>
		</footer>
	)
}

