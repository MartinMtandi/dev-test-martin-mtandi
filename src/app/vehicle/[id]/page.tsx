import { VehicleDetails } from '@/components/VehicleDetails';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

async function getVehicleData(id: string) {
  try {
    const response = await fetch(`https://nextjs-rho-red-22.vercel.app/api/vehicle/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicle data: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data?.cache?.data?.[0]) {
      throw new Error('No vehicle data found');
    }

    // Get the vehicle data and included seller data
    const vehicleData = data.cache.data[0];
    const sellerData = data.cache.included?.[0];

    // Combine vehicle and seller data
    return {
      ...vehicleData.attributes,
      id: vehicleData.id,
      seller: sellerData?.attributes || null
    };
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const vehicle = await getVehicleData(params.id);
    const attributes = vehicle;
    
    return {
      title: `${attributes.title} - Cars.co.za`,
      description: attributes.description,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error - Cars.co.za',
      description: 'Unable to load vehicle details.',
    };
  }
}

export default async function VehiclePage({ params }: PageProps) {
  try {
    const vehicleData = await getVehicleData(params.id);
    
    return (
      <main className="min-h-screen bg-gray-100">
        <VehicleDetails vehicleData={vehicleData} />
      </main>
    );
  } catch (error) {
    console.error('Error in VehiclePage:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-xl text-red-600">Error Loading Vehicle</h1>
            <p className="mt-2 text-gray-600">Sorry, we couldn&apos;t load the vehicle details. {errorMessage}</p>
          </div>
        </div>
      </main>
    );
  }
}
