"use client";
import { useEffect, useActionState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/addMessage";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(addMessage, {});

  // 1. Handle both Success and Error toasts here
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.submitted) {
      toast.success("Message sent successfully!");
    }
  }, [state.error, state.submitted]);

  if (state.submitted) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <p className="mb-2">Your message has been sent successfully!</p>
      </div>
    );
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          <input
            type="hidden"
            name="property"
            id="property"
            defaultValue={property._id}
          />
          <input
            type="hidden"
            name="recipient"
            id="recipient"
            defaultValue={property.owner?._id || property.owner}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center disabled:bg-blue-300"
              type="submit"
              disabled={isPending}
            >
              <FaPaperPlane className="mr-2" />
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
