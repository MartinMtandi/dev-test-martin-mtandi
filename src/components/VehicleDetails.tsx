'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { PhoneIcon } from '@heroicons/react/24/solid';

interface VehicleImage {
  version: number;
  count: number;
  path: string;
  name: string;
  extension: string;
}

interface Seller {
  name: string;
  seller_type: string;
  locality: string;
  province: string;
  coord_0: number;
  coord_1: number;
}

interface Vehicle {
  id: string;
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
  seller: Seller | null;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ImageContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 400px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
`;

const ThumbnailButton = styled.button<{ isSelected: boolean }>`
  position: relative;
  width: 100px;
  height: 75px;
  border-radius: 0.375rem;
  overflow: hidden;
  border: 2px solid ${props => props.isSelected ? '#3b82f6' : 'transparent'};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${props => props.isSelected ? '#3b82f6' : '#e5e7eb'};
  }
`;

const DetailsContainer = styled.div`
  margin-top: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const PriceText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const SpecValue = styled.span`
  font-weight: 500;
`;

const Description = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  p {
    color: #4b5563;
    line-height: 1.625;
  }
`;

const ContactButton = styled.button`
  flex: 1;
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ContactDetails = styled.div`
  margin-top: 1rem;
`;

export function VehicleDetails({ vehicleData }: { vehicleData: Vehicle }) {
  const [showPhone, setShowPhone] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const imageCount = vehicleData.image.count;
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
    return `https://img-ik.cars.co.za/ik-seo/${vehicleData.image.path}/tr:n-stock_large/${vehicleId}/${vehicleData.make}-${vehicleData.model}`.toLowerCase().replace(/\s+/g, '-') + vehicleData.image.extension + `?v=${index}`;
  };

  return (
    <Container>
      <ImageContainer>
        <ImageWrapper>
          <Image
            src={getImageUrl(vehicleData.id, selectedImage)}
            alt={vehicleData.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </ImageWrapper>
        <ThumbnailContainer>
          {imageUrls.map((index) => (
            <ThumbnailButton
              key={index}
              onClick={() => setSelectedImage(index)}
              isSelected={selectedImage === index}
            >
              <Image
                src={getImageUrl(vehicleData.id, index)}
                alt={`${vehicleData.title} - View ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ThumbnailButton>
          ))}
        </ThumbnailContainer>
      </ImageContainer>

      <DetailsContainer>
        <Title>{vehicleData.title}</Title>
        <PriceText>{formatPrice(vehicleData.price)}</PriceText>

        <SpecsGrid>
          <SpecItem>
            <SpecLabel>Mileage</SpecLabel>
            <SpecValue>{formatMileage(vehicleData.mileage)}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Transmission</SpecLabel>
            <SpecValue>{vehicleData.transmission}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Fuel Type</SpecLabel>
            <SpecValue>{vehicleData.fuel_type}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Color</SpecLabel>
            <SpecValue>{vehicleData.colour}</SpecValue>
          </SpecItem>
        </SpecsGrid>

        <SpecsGrid>
          <SpecItem>
            <SpecLabel>Year</SpecLabel>
            <SpecValue>{vehicleData.year}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Variant</SpecLabel>
            <SpecValue>{vehicleData.variant}</SpecValue>
          </SpecItem>
        </SpecsGrid>

        <ContactButton onClick={handlePhoneClick}>
          <PhoneIcon className="w-5 h-5" />
          <span>Show Contact Details</span>
        </ContactButton>

        {showPhone && (
          <ContactDetails>
            <p className="font-bold">{vehicleData.agent_name}</p>
            <a
              href="tel:0827093821"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>082 709 3821</span>
            </a>
          </ContactDetails>
        )}

        <Description>
          <h2>Description</h2>
          <p>{vehicleData.description}</p>
        </Description>
      </DetailsContainer>
    </Container>
  );
}
