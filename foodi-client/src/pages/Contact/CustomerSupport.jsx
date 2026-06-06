import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const CustomerSupport = () => {
  return (
    <div className="section-container py-24 bg-gray-50 min-h-screen mt-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Customer <span className="text-green">Support</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Whether you have a question about our menu, an existing order, or just want to say hello, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Contact Cards */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:translate-y-[-5px] transition-transform">
          <div className="w-16 h-16 bg-green/10 text-green rounded-full flex items-center justify-center mx-auto mb-6">
            <FaPhoneAlt className="text-2xl" />
          </div>
          <h4 className="text-xl font-bold mb-2">Call Us</h4>
          <p className="text-gray-500">+1 234 567 890</p>
          <p className="text-gray-400 text-sm mt-1">Mon-Fri: 9am - 6pm</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:translate-y-[-5px] transition-transform border-t-4 border-green">
          <div className="w-16 h-16 bg-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEnvelope className="text-2xl" />
          </div>
          <h4 className="text-xl font-bold mb-2">Email Us</h4>
          <p className="text-gray-500">support@foodi.com</p>
          <p className="text-gray-400 text-sm mt-1">24/7 Response Time</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:translate-y-[-5px] transition-transform">
          <div className="w-16 h-16 bg-green/10 text-green rounded-full flex items-center justify-center mx-auto mb-6">
            <FaMapMarkerAlt className="text-2xl" />
          </div>
          <h4 className="text-xl font-bold mb-2">Visit Us</h4>
          <p className="text-gray-500">123 Food Street, NY</p>
          <p className="text-gray-400 text-sm mt-1">Main Headquarters</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="md:w-1/2 p-10 bg-white">
          <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Your Name</span></label>
              <input type="text" placeholder="Enter name" className="input input-bordered focus:border-green focus:outline-none" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email Address</span></label>
              <input type="email" placeholder="Enter email" className="input input-bordered focus:border-green focus:outline-none" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Message</span></label>
              <textarea rows="4" placeholder="How can we help you?" className="textarea textarea-bordered focus:border-green focus:outline-none" required></textarea>
            </div>
            <button className="btn bg-green text-white w-full rounded-full border-none flex items-center gap-2 hover:bg-green/90">
              Send Message <FaPaperPlane />
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div className="md:w-1/2 p-10 bg-green/5">
          <h3 className="text-2xl font-bold mb-6">Common Questions</h3>
          <div className="space-y-4">
            <div className="collapse collapse-plus bg-white rounded-xl shadow-sm">
              <input type="radio" name="my-accordion-3" defaultChecked /> 
              <div className="collapse-title text-sm font-bold">What is the estimated delivery time?</div>
              <div className="collapse-content text-xs text-gray-500">
                <p>Typically 30-45 minutes depending on your location and current traffic conditions.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-white rounded-xl shadow-sm">
              <input type="radio" name="my-accordion-3" /> 
              <div className="collapse-title text-sm font-bold">How can I track my order?</div>
              <div className="collapse-content text-xs text-gray-500">
                <p>Go to the "Order Tracking" page and use your transition ID to see real-time updates.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-white rounded-xl shadow-sm">
              <input type="radio" name="my-accordion-3" /> 
              <div className="collapse-title text-sm font-bold">Do you offer refunds for cancellations?</div>
              <div className="collapse-content text-xs text-gray-500">
                <p>Yes, if the order hasn't been started yet, you can get a full refund to your wallet or original payment method.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
