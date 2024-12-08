import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import styled from 'styled-components';

interface BreadcrumbProps {
  brand: string;
  model: string;
  type: string;
}

const Breadcrumb = ({ brand, model, type }: BreadcrumbProps) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/brand/${brand.toLowerCase()}`}>{brand}</BreadcrumbLink>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/brand/${brand.toLowerCase()}/${model.toLowerCase()}`}>
            {model}
          </BreadcrumbLink>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbText>{type}</BreadcrumbText>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

const BreadcrumbContainer = styled.nav`
  padding: 1rem 0;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:last-child svg {
    display: none;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-hover);
    text-decoration: underline;
  }
`;

const BreadcrumbText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

export default Breadcrumb;
