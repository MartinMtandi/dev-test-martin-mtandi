import React, { useState } from 'react';
import styled from 'styled-components';

interface ContactFormProps {
  dealerName: string;
  vehicleTitle: string;
}

const ContactForm = ({ dealerName, vehicleTitle }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in the ${vehicleTitle}. Please contact me with more information.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      <FormTitle>
        <span>Contact {dealerName}</span>
      </FormTitle>
      
      <ContactDetails>
        <ContactItem>
          <ContactLabel>Phone:</ContactLabel>
          <Value>082 *** ****</Value>
        </ContactItem>
        <ContactItem>
          <ContactLabel>Email:</ContactLabel>
          <Value>****@cars.co.za</Value>
        </ContactItem>
      </ContactDetails>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputLabel htmlFor="name">Name*</InputLabel>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            placeholder="Enter your name"
          />
        </FormGroup>

        <FormGroup>
          <InputLabel htmlFor="email">Email*</InputLabel>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            placeholder="Enter your email"
          />
        </FormGroup>

        <FormGroup>
          <InputLabel htmlFor="phone">Phone Number*</InputLabel>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            placeholder="Enter your phone number"
          />
        </FormGroup>

        <FormGroup>
          <InputLabel htmlFor="message">Message*</InputLabel>
          <TextArea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">
          Message the Dealer
        </SubmitButton>

        <Disclaimer>
          By clicking "Send Message", you agree to Cars.co.za Terms of Use and Privacy Policy.
          Your information will be shared with the dealer.
        </Disclaimer>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  top: 1rem;
  height: fit-content;
`;

const FormTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1f2937;
`;

const ContactDetails = styled.div`
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const ContactLabel = styled.span`
  font-weight: 500;
`;

const Value = styled.span`
  color: #334155;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  outline: none;
  border:none;
  background-color: var(--primary);
  color: white;
  padding: 0.875rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-hover);
  }
`;

const Disclaimer = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.4;
`;

export default ContactForm;
