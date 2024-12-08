'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PhoneIcon } from '@heroicons/react/24/solid';

interface VehicleImage {
  version: number;
  count: number;
  path: string;
  name: string;
  extension: string;
}

interface VehicleAttributes {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  description: string;
  image: VehicleImage;
  title: string;
  variant: string;
  colour: string;
  transmission: string;
  fuel_type: string;
  agent_name: string;
}

interface Vehicle {
  type: string;
  id: string;
  attributes: VehicleAttributes;
}

export function VehicleDetails({ vehicleData }: { vehicleData: Vehicle }) {
  const [showPhone, setShowPhone] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const vehicle = vehicleData.attributes;
  const imageCount = vehicle.image.count;
  const imageUrls = Array.from({ length: imageCount }, (_, i) => i);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(price);
  };

  const formatMileage = (mileage: string) => {
    return mileage;
  };

  const handlePhoneClick = () => {
    setShowPhone(true);
  };

  const getImageUrl = (vehicleId: string, index: number) => {
    return `https://img-ik.cars.co.za/ik-seo/${vehicle.image.path}/tr:n-stock_large/${vehicleId}/${vehicle.make}-${vehicle.model}`.toLowerCase().replace(/\s+/g, '-') + vehicle.image.extension + `?v=${index}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[400px]">
          <Image
            src={getImageUrl(vehicleData.id, selectedImage)}
            alt={vehicle.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-4 gap-2 p-2">
          {imageUrls.map((index) => (
            <button
              key={index}
              className={`relative h-20 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={getImageUrl(vehicleData.id, index)}
                alt={`${vehicle.title} - View ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold">
          {vehicle.title}
        </h1>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">{formatPrice(vehicle.price)}</h2>
            <p className="text-gray-600">Mileage: {formatMileage(vehicle.mileage)}</p>
            <p className="text-gray-600">Transmission: {vehicle.transmission}</p>
            <p className="text-gray-600">Fuel Type: {vehicle.fuel_type}</p>
            <p className="text-gray-600">Color: {vehicle.colour}</p>
          </div>
          <div className="flex flex-col gap-2">
            {!showPhone ? (
              <button
                onClick={handlePhoneClick}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>Show Contact Details</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="font-bold">{vehicle.agent_name}</p>
                <a
                  href="tel:0827093821"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span>082 709 3821</span>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{vehicle.description}</p>
        </div>
      </div>
    </div>
  );
}
